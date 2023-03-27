Component({
  properties: {
    // Close | qita-fanbai | qita | preview | haiyunpinxiang-dianji | haiyunminganhuo-dianji | haiyunpinxiang | kongyun-dianji | haiyunminganhuo | kongyun | cangchu-dianji | cangchu | download | add | publish | edit | view | filter | share | favorite_stroke | favorite_filled | mail | phone | weChat | baoguan | baoguan-dianji | haiyun | haiyun-dianji | xiangjiaoyi-dianji | tieyun | zuxiang-dianji | tuoche-dianji | xiangjiaoyi | tuoche | tielu-dianji | zuxiang
    name: {
      type: String,
    },
    // string | string[]
    color: {
      type: null,
      observer: function(color) {
        this.setData({
          colors: this.fixColor(),
          isStr: typeof color === 'string',
        });
      }
    },
    size: {
      type: Number,
      value: 18,
      observer: function(size) {
        this.setData({
          svgSize: size / 750 * wx.getSystemInfoSync().windowWidth,
        });
      },
    },
  },
  data: {
    colors: '',
    svgSize: 18 / 750 * wx.getSystemInfoSync().windowWidth,
    quot: '"',
    isStr: true,
  },
  methods: {
    fixColor: function() {
      var color = this.data.color;
      var hex2rgb = this.hex2rgb;

      if (typeof color === 'string') {
        return color.indexOf('#') === 0 ? hex2rgb(color) : color;
      }

      return color.map(function (item) {
        return item.indexOf('#') === 0 ? hex2rgb(item) : item;
      });
    },
    hex2rgb: function(hex) {
      var rgb = [];

      hex = hex.substr(1);

      if (hex.length === 3) {
        hex = hex.replace(/(.)/g, '$1$1');
      }

      hex.replace(/../g, function(color) {
        rgb.push(parseInt(color, 0x10));
        return color;
      });

      return 'rgb(' + rgb.join(',') + ')';
    }
  }
});
