import { jscode2session } from "../../api/index";
//获取应用实例
const app = getApp();
const globalData = app.globalData;
Page({
  data: {
    userInfo: null,
    auth: -1, //是否认证
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse("button.open-type.getUserInfo")
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: "../logs/logs"
    });
  },

  /**
   * 调用微信getUserInfo获取用户信息
   * @param {*} cb
   */
  _getUserInfo(cb = () => {}) {
    wx.getUserInfo({
      success: res => {
        cb(res.userInfo);
      }
    });
  },

  /**
   * 获取Openid
   * @param {*} success
   * @param {*} fail
   */
  getUserOpenId(success, fail) {
    wx.login({
      success: res => {
        jscode2session(res.code).then(res => {
          let { openid = "", session_key = "" } = res.result || {};
          if (openid && session_key) {
            wx.setStorage({
              key: "openid",
              data: openid
            });
            typeof success === "function" && success(res);
          } else {
            //授权失败，显示登录按钮
            typeof fail === "function" && fail();
          }
        });
      }
    });
  },
  getUserInfo() {
    // 如果不存在全局的数据，就获取

    if (!globalData.userInfo) {
      this._getUserInfo(rs => {
        console.log("rs", rs);
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
        // res.authSetting[name] = null;
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
      },
      fail: res => {
        console.log(res, "---");
      }
    });
  },

  onShow: function() {
    this.getScope(this.getUserInfo, () => {
      this.setData({ auth: 0 });
    });
  }
});
