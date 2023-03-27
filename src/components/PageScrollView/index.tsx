import React, { useRef, useMemo, useState, useImperativeHandle, forwardRef, useEffect } from 'react';
import { View, ScrollView, Image } from '@tarojs/components';
import type { ScrollViewProps } from '@tarojs/components';
import { useUpdateEffect } from 'ahooks';
import Taro, { getSystemInfoSync, createSelectorQuery } from '@tarojs/taro';
import './index.scss';

export interface IPageScrollView {
  extraBottomDisTance?: number; // 滚动区域取掉的底部高度
  scrollViewStyle?: any; // 滚动盒子样式
  containerStyle?: any; // 最外层组件样式
  refresherEnabled?: boolean; // 开启自定义下拉刷新
  scrollViewProps?: ScrollViewProps; // 原生 ScrollView props
  renderHeader?: React.ReactNode; // 头部常用在吸顶业务场景中 跟随滚动
  renderStickyHeader?: React.ReactNode; // 需要吸顶的dom
  renderEmpty?: React.ReactNode; // 空数据时显示内容
  emptyImage?: string; // 空数据时的图片
  emptyText?: string; // 空数据时的文案
  renderFooter?: React.ReactNode; // 底部dom
  openVirtualList?: boolean; // 是否开启虚拟列表
  children: (list: any[], index?: number) => React.ReactNode;
  renderLoadedStyle?: React.ReactNode; // 加载完成时样式
  bottomLoadedText?: string; // 加载完成时文案
  renderLoadingStyle?: React.ReactNode; // 加载中样式
  bottomLoadingText?: string; // 加载中文案
  initialLoad?: boolean; // 是否初始化请求
  extraAsyncRequestParams?: any; // 请求参数(自动响应参数变化，如需关闭 autoReload = false)
  autoReload?: boolean; // 是否开启自动刷新
  asyncRequest: (param: any) => Promise<any>; // 请求方法
  size?: number; // 每页条数
  onScroll?: (param: any) => void; // 滚动事件
  onScrollToLower?: (param: boolean) => void; // 触底事件
  onSticky?: (param: boolean) => void; // 是否吸顶事件
  segmentSize?: number; // 虚拟列表分组项的个数
}

export interface IHandleRequestOptions {
  isReset?: boolean;
  stayStricky?: boolean;
}

let countId = 0;

const formatList = (list: any[], size?: number) => {
  const segmentSize = size || 3;
  // 可自定义二维数组每一个维度的数据量 - 按时间分片的原则对list进行划分

  let arr: any[] = [];
  const _list: any[] = []; // 二维数组副本
  list?.forEach((item, index) => {
    arr.push(item);
    if ((index + 1) % segmentSize === 0) {
      // 够一个维度的量就装进_list
      _list.push(arr);
      arr = [];
    }
  });
  // 将分段不足segmentSize的剩余数据装入_list
  const restList = list.slice(_list.length * segmentSize);
  if (restList.length) {
    _list.push(restList);
  }
  return _list;
};

const PageSrcollView: React.FC<IPageScrollView> = (props, ref) => {
  const {
    size = 10,
    extraBottomDisTance = 0,
    scrollViewStyle = {},
    containerStyle = {},
    refresherEnabled = false,
    scrollViewProps = {},
    renderHeader,
    renderStickyHeader,
    renderEmpty,
    emptyImage = '',
    emptyText = '暂无数据',
    renderFooter,
    openVirtualList = false,
    children,
    renderLoadedStyle,
    bottomLoadedText = '暂无更多数据',
    renderLoadingStyle,
    bottomLoadingText = '加载中...',
    initialLoad = true,
    extraAsyncRequestParams = {},
    autoReload = true,
    asyncRequest,
    onScroll,
    onScrollToLower,
    onSticky,
    segmentSize = 3,
  } = props;

  const [scrollTopValue, setScrollTopValue] = useState(-1);
  const [refreshTrigger, setRefreshTrigger] = useState(false);
  const [firstInitialLoaded, setFirstInitialLoaded] = useState(false);
  const [noVisibleList, setNoVisibleList] = useState<number[]>([]);
  const [list, setList] = useState<any[]>([]);
  const [scrollViewFooterHeight, setScrollViewFooterHeight] = useState(0);
  const [scrollViewDistanceToTop, setScrollViewDistanceToTop] = useState(0);
  const [isCeiled, setIsCeiled] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const _instance = useRef({
    idCount: (countId += 1),
    windowHeight: getSystemInfoSync().windowHeight,
    isScrolling: false,
    pageParams: {
      current: 1,
      size: size || 10,
    },
    scrollTop: 0,
    // 吸顶头部距离顶部的距离
    stickyHeaderDistanceToTop: 0,
    listWrapperHeights: [],
    observers: [],
    stickyHeaderHeight: -1,
    headerHeight: 0,
    total: 0,
  });

  const scrollViewId = `athena-page-scroll-view-${_instance.current.idCount}`;

  const headerId = `athena-page-scroll-view-header-${_instance.current.idCount}`;

  const stickyHeaderId = `athena-page-scroll-view-stickyHeader-${_instance.current.idCount}`;

  const footerId = `athena-page-scroll-view-footer-${_instance.current.idCount}`;

  const wrapperIdPreFix = `athena-list-wrapper-${_instance.current.idCount}-`;

  const getScrollHeight = useMemo(() => {
    const { windowHeight } = _instance.current;
    return windowHeight - scrollViewDistanceToTop - scrollViewFooterHeight - extraBottomDisTance;
  }, [scrollViewDistanceToTop, scrollViewFooterHeight, extraBottomDisTance]);

  /**
   * 外部通过 ref 直接调用该方法
   * @param {Boolean} config.isReset 是否重置分页数据
   * @param {Boolean} config.stayStricky 是否停留在吸顶的原位置 否则滚动到顶部
   */
  const handleRequest = (options?: IHandleRequestOptions) => {
    const { isReset = false, stayStricky = false } = options || {};

    if (isReset) {
      setIsLoaded(false);
      _instance.current.pageParams.current = 1;
      _instance.current.listWrapperHeights = [];
      // 不存在吸顶或调用方不需要保持吸顶位置 需要清空list并设置滚动位置
      if (!renderStickyHeader || !stayStricky) {
        setList([]);
        setScrollTopValue((scrollTopValue > 0 ? 0 : scrollTopValue) - 0.01);
      }
      setNoVisibleList([]);
      setTimeout(() => {
        fetchDataAndDeal(options);
      }, 10);
    } else {
      fetchDataAndDeal(options);
    }
  };

  // 是否开启了虚拟列表
  const isOpenVirtualList = () => {
    return openVirtualList && typeof children === 'function';
  };

  const fetchDataAndDeal = async (options) => {
    const { stayStricky = false } = options || {};

    const { data = [] } = (await requestWrapper()) || {};

    const _data = _instance.current.pageParams.current === 1 ? data : list.concat(data);

    const _list = formatList(_data.flat(1), segmentSize);

    setList(_list);

    // 为虚拟列表开启监听
    isOpenVirtualList() && getDomInfo(addObserveForList.bind(null, _list));

    if (stayStricky && renderStickyHeader && isCeiled) {
      const topValue = _instance.current.stickyHeaderDistanceToTop + 50;
      setScrollTopValue(scrollTopValue !== topValue ? topValue : scrollTopValue + 0.01);
    }
  };

  const addObserveForList = (_list) => {
    for (let index = 0; index < _list.length; index += 1) {
      // 为listWrapper添加监控
      observe(index);
    }
  };

  const observe = (index) => {
    // 设定监听的范围，默认监听上下两个屏幕的高度
    if (!_instance.current.observers[index]) {
      // @ts-ignore
      _instance.current.observers[index] = Taro.createIntersectionObserver(Taro.getCurrentInstance().page)
        .relativeToViewport({
          top: 2 * getScrollHeight,
          bottom: 2 * getScrollHeight,
        })
        .observe(`#${wrapperIdPreFix}${index}`, (res) => {
          // @ts-ignore
          _instance.current.listWrapperHeights[index] = res?.boundingClientRect?.height;

          if (res?.intersectionRatio <= 0) {
            // 删除dom结构
            setNoVisibleList((prevNoVisibleList) => Array.from(new Set([...prevNoVisibleList, index])));
          } else if (res?.intersectionRatio > 0) {
            // 还原
            setNoVisibleList((prevNoVisibleList) => prevNoVisibleList.filter((i) => i !== index));
          }
        });
    }
  };

  // 包装 request 主要处理请求前、错误、请求完成 通用逻辑
  const requestWrapper = async (params = {}) => {
    if (_instance.current.isScrolling) return Promise.reject();

    _instance.current.isScrolling = true;

    const requestParams = {
      ..._instance.current.pageParams,
      ...extraAsyncRequestParams,
      ...params,
    };

    try {
      const response: any = (await asyncRequest(requestParams)) ?? {};
      const { page = {} } = response;

      setIsLoaded(_instance.current.pageParams.current >= (page.pages || Math.ceil(page.total / page.pageSize)));

      _instance.current.total = page.total;
      return response;
    } finally {
      setFirstInitialLoaded(true);
      setRefreshTrigger(false);
      _instance.current.isScrolling = false;
    }
  };

  const handleScrollToLower = () => {
    const { isScrolling } = _instance.current;

    // 调用外部触底函数
    if (isScrolling || isLoaded) {
      return;
    }

    _instance.current.pageParams.current += 1;
    handleRequest();
    onScrollToLower?.(isLoaded);
  };

  const scroll = (e) => {
    // 调用外部滚动函数
    onScroll?.(e);
    const scrollTop = parseInt(e.detail.scrollTop, 10);
    _instance.current.scrollTop = scrollTop;
    const isFixed = scrollTop >= _instance.current.stickyHeaderDistanceToTop;
    if (isFixed === isCeiled || !props.renderStickyHeader) {
      return false;
    }
    setIsCeiled(isFixed);
    onSticky?.(isFixed);
  };

  const onRefresh = () => {
    if (refreshTrigger) {
      return;
    }
    setRefreshTrigger(true);

    setTimeout(() => {
      handleRequest({ isReset: true });
    }, 50);
  };

  const renderEmptyContent = useMemo(() => {
    return (
      renderEmpty || (
        <View className="athena-empty">
          <Image className="athena-empty-image" src={emptyImage} />
          <View className="athena-empty-text">{emptyText}</View>
        </View>
      )
    );
  }, [renderEmpty, emptyImage, emptyText]);

  const renderContent = (item, index) => {
    const noVisibleCondition = noVisibleList.includes(index) && !!_instance.current.listWrapperHeights[index];

    return !noVisibleCondition ? (
      children(item, index)
    ) : (
      <View
        style={{
          height: `${_instance.current.listWrapperHeights[index]}px`,
        }}
      />
    );
  };

  const renderListContent = useMemo(() => {
    if (typeof children !== 'function') {
      console.error('children 必须为一个函数');
      return;
    }
    return openVirtualList
      ? list?.map((item, index) => (
          <View key={index} id={`${wrapperIdPreFix}${index}`}>
            {renderContent(item, index)}
          </View>
        ))
      : children(list.flat(1));
  }, [list, openVirtualList, noVisibleList]);

  // 底部文案
  const renderBottomTxt = useMemo(() => {
    if (firstInitialLoaded) {
      if (isLoaded) {
        return renderLoadedStyle || bottomLoadedText;
      }
      return renderLoadingStyle || bottomLoadingText;
    }

    return '';
  }, [firstInitialLoaded, renderLoadedStyle, bottomLoadedText, renderLoadingStyle, bottomLoadingText, isLoaded]);

  // 获取dom信息
  const getDomInfo = (callback) => {
    setTimeout(callback, 50);
  };

  const calcLayout = () => {
    getDomInfo(() => {
      const query = createSelectorQuery();
      query.select(`#${stickyHeaderId}`).boundingClientRect();
      query.select(`#${scrollViewId}`).boundingClientRect();
      query.select(`#${footerId}`).boundingClientRect();
      query.select(`#${headerId}`).boundingClientRect();
      query.exec(([stickyInfo, scrollViewInfo, footerInfo, headerInfo]) => {
        _instance.current.stickyHeaderDistanceToTop = stickyInfo?.top || 0;
        _instance.current.stickyHeaderHeight = stickyInfo?.height || 0;
        _instance.current.headerHeight = headerInfo?.height || 0;
        setIsCeiled((stickyInfo?.top || 0) === 0);
        setScrollViewDistanceToTop(scrollViewInfo?.top || 0);
        setScrollViewFooterHeight(footerInfo?.height || 0);
      });
    });
  };

  // 刷新任一页码数据 可作为ref调用
  const refreshPageData = async (wrapperIndex, index?) => {
    const { size: pageSize } = _instance.current.pageParams;

    let currentPage = 1;

    if (isOpenVirtualList()) {
      // 开启虚拟列表
      const currentCount = wrapperIndex * segmentSize + Number(index) + 1;
      currentPage = Math.ceil(currentCount / pageSize);
    } else {
      currentPage = Math.ceil((wrapperIndex + 1) / pageSize);
    }

    const res = await requestWrapper({
      current: currentPage,
    });

    const flatList = list?.flat?.(1);

    flatList.splice((currentPage - 1) * pageSize, pageSize, ...(res.data ?? []));

    setList(formatList(flatList, segmentSize));
  };

  useImperativeHandle(ref, () => ({
    handleRequest,
    refreshPageData,
  }));

  useEffect(() => {
    initialLoad && handleRequest();
    calcLayout();

    return () => {
      if (_instance.current.observers.length > 0) {
        _instance.current.observers.forEach((observer: any) => {
          observer?.disconnect?.();
        });
      }
    };
  }, []);

  useUpdateEffect(() => {
    if (autoReload) {
      handleRequest({ isReset: true });
    }
  }, [extraAsyncRequestParams, autoReload]);

  return (
    <View
      className={`athena-page-scroll-view-container ${firstInitialLoaded ? 'athena-calcLayout' : ''}`}
      style={containerStyle}
    >
      <ScrollView
        className="athena-scroll-container"
        id={scrollViewId}
        scrollY
        style={{
          height: `${getScrollHeight}px`,
          ...scrollViewStyle,
        }}
        onScrollToLower={handleScrollToLower}
        onScroll={scroll}
        scrollTop={scrollTopValue}
        refresherEnabled={refresherEnabled}
        refresherTriggered={refreshTrigger}
        onRefresherRefresh={onRefresh}
        lowerThreshold={80}
        {...scrollViewProps}
      >
        <View>
          {/* 头部 跟随滚动 */}
          <View className="athena-scroll-header" id={headerId}>
            {renderHeader}
          </View>

          {/* 吸顶区域 */}
          <View className={`athena-sticky-header ${isCeiled ? 'athena-ceiled' : ''}`} id={stickyHeaderId}>
            {renderStickyHeader}
          </View>

          {/* 列表部分 */}
          {firstInitialLoaded && _instance.current.total <= 0 ? (
            renderEmptyContent
          ) : (
            <View
              style={{
                height: !!isCeiled ? '100%' : 'auto',
              }}
              className="athena-scroll-list-content"
            >
              {renderListContent}
              <View className="athena-scroll-list-bottom">{renderBottomTxt}</View>
            </View>
          )}
        </View>
      </ScrollView>
      <View id={footerId}>{renderFooter}</View>
    </View>
  );
};
// @ts-ignore
export default forwardRef(PageSrcollView);
