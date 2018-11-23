import { saveTodos, getTodos, updateTodo, removeTodo } from "../../api/index";
var app = getApp();

Page({
  data: {
    userInfo: null,
    tabs: ["全部任务", "未完成", "已完成"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,

    tasks: []
    // newTask: ""
  },
  onShow: function() {
    let openid = wx.getStorageSync("openid");
    this.setData({ userInfo: app.globalData.userInfo });
    getTodos(openid)
      .then(res => {
        this.setData({ tasks: res.data });
      })
      .catch(err => {
        console.log("err", err);
      });
  },

  tabClick: function(e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },
  checkboxChange: function(e) {
    wx.showLoading({
      title: "加载中"
    });
    let _id = e.currentTarget.dataset.value;
    let tasks = this.data.tasks;
    let index = tasks.findIndex(task => task._id == _id);
    if (index < 0) {
      return;
    }
    updateTodo(_id, { status: !tasks[index].status })
      .then(res => {
        wx.hideLoading();
        if (res.stats.updated === 1) {
          tasks[index].status = !tasks[index].status;
          this.setData({
            tasks: tasks
          });
        } else {
          console.log("操作失败");
        }
      })
      .catch(err => {
        wx.hideLoading();
      });

    // wx.setStorageSync("tasks", tasks);
  },
  removeTask: function(e) {
    console.log("removeTask");
    let self = this;
    wx.showModal({
      title: "警告",
      content: "确定要删除该事项？",
      confirmText: "确定",
      cancelText: "取消",
      success: function(res) {
        if (res.confirm) {
          let _id = e.currentTarget.dataset.value;
          let tasks = self.data.tasks;
          wx.showLoading({
            title: "加载中"
          });
          removeTodo(_id)
            .then(res => {
              wx.hideLoading();
              if (res.stats.removed === 1) {
                let newTasks = tasks.filter(task => task._id != _id);
                self.setData({
                  tasks: newTasks
                });
              } else {
                console.log("操作失败");
              }
            })
            .catch(err => {
              wx.hideLoading();
            });

          //   wx.setStorageSync("tasks", newTasks);
        } else {
          console.log("用户点击辅助操作");
        }
      }
    });
  },
  goAddTask: function(e) {
    console.log("------------");
    wx.navigateTo({
      url: "../addtask/addtask"
    });
  }
});
