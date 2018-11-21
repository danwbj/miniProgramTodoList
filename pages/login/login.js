//index.js
//获取应用实例
const app = getApp();

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse("button.open-type.getUserInfo")
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: "../logs/logs"
    });
  },
  onLoad: function() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      });
      wx.navigateTo({
        url: "../todo/todo"
      });
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        console.log("userInfoReadyCallback");
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        });
        wx.navigateTo({
          url: "../todo/todo"
        });
      };
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo;
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          });
          wx.navigateTo({
            url: "../todo/todo"
          });
        }
      });
    }
  },
  getUserInfo: function(e) {
    console.log(e, "getUserInfo");
    app.globalData.userInfo = e.detail.userInfo;
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    });
    wx.navigateTo({
      url: "../todo/todo"
    });
  }
});

// var app = getApp();
// Page({
//   onLoad: function(options) {
//     var that = this;
//     //调用微信登录接口
//     wx.login({
//       success: function() {
//         wx.getUserInfo({
//           success: function(res) {
//             console.log(res, "----");
//             app.globalData.userInfo = res.userInfo;
//             that.setData({
//               canIUse: false
//             });
//             wx.switchTab({
//               url: "../index/index"
//             });
//           },
//           fail: function(res) {
//             that.setData({
//               canIUse: true
//             });
//           }
//         });
//       }
//     });
//   },

//   bindGetUserInfo: function(e) {
//     console.log(e);
//     app.globalData.userInfo = e.detail.userInfo;
//     this.setData({
//       canIUse: false
//     });
//     wx.switchTab({
//       url: "../index/index"
//     });
//   }
// });
