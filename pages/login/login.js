//index.js
//获取应用实例
const app = getApp();
const globalData = app.globalData;
Page({
  data: {
    userInfo: null,
    hasUserInfo: false,
    canIUse: wx.canIUse("button.open-type.getUserInfo"),
    auth: -1
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: "../logs/logs"
    });
  },

  _getUserInfo(cb = () => {}) {
    wx.getUserInfo({
      success: res => {
        cb(res.userInfo);
      }
    });
  },

  getUserOpenId(success, fail) {
    wx.login({
      success: res => {
        console.log("getUserOpenId", res.code);
        // jscode2session(res.code).then(res => {
        //   let { openid = "", session_key = "" } = res.result || {};
        //   if (openid && session_key) {
        //     wx.setStorage({
        //       key: "openid",
        //       data: openid
        //     });
        //     typeof success === "function" && success(res);
        //   } else {
        //     //授权失败，显示登录按钮
        //     typeof fail === "function" && fail();
        //   }
        // });
      }
    });
  },
  getUserInfo() {
    // 如果不存在全局的数据，就获取
    console.log(globalData.userInfo);
    if (!globalData.userInfo) {
      this._getUserInfo(rs => {
        this.setData({
          userInfo: rs
        });
        globalData.userInfo = rs;
        wx.navigateTo({
          url: "../todo/todo"
        });
      });
    }

    const that = this;
    let openid = wx.getStorageSync("openid");

    function callback() {
      that.setData({
        auth: 1,
        openid
      });
    }
    if (openid) {
      callback();
    } else {
      this.getUserOpenId(
        res => {
          // console.log(res.result)
          openid = res.result.openid;
          callback();
        },
        () => {
          this.setData({ auth: 0 });
        }
      );
    }
  },
  getScope(success, fail, name = "scope.userInfo") {
    wx.getSetting({
      success: res => {
        //test
        res.authSetting[name] = null;
        if (res.authSetting[name]) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          typeof success === "function" && success();
          wx.navigateTo({
            url: "../todo/todo"
          });
        } else {
          typeof fail === "function" && fail();
          // console.log('显示登录授权', this.data.auth)
          // 显示登录授权
        }
      }
    });
  },

  onLoad: function() {
    this.getScope(this.getUserInfo, () => {
      this.setData({ auth: 0 });
    });
    // if (app.globalData.userInfo) {
    //   this.setData({
    //     userInfo: app.globalData.userInfo,
    //     hasUserInfo: true
    //   });
    //   wx.navigateTo({
    //     url: "../todo/todo"
    //   });
    // } else if (this.data.canIUse) {
    //   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //   // 所以此处加入 callback 以防止这种情况
    //   app.userInfoReadyCallback = res => {
    //     this.setData({
    //       userInfo: res.userInfo,
    //       hasUserInfo: true
    //     });
    //     wx.navigateTo({
    //       url: "../todo/todo"
    //     });
    //   };
    // } else {
    //   // 在没有 open-type=getUserInfo 版本的兼容处理
    //   wx.getUserInfo({
    //     success: res => {
    //       app.globalData.userInfo = res.userInfo;
    //       this.setData({
    //         userInfo: res.userInfo,
    //         hasUserInfo: true
    //       });
    //       wx.navigateTo({
    //         url: "../todo/todo"
    //       });
    //     }
    //   });
    // }
  }
  //   bindGetUserInfo: function(e) {
  //     app.globalData.userInfo = e.detail.userInfo;
  //     this.setData({
  //       userInfo: e.detail.userInfo,
  //       hasUserInfo: true
  //     });
  //     wx.navigateTo({
  //       url: "../todo/todo"
  //     });
  //   }
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
