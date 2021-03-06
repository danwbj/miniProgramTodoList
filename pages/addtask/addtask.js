import { saveTodos } from "../../api/index";
var date = new Date();
const year = date.getFullYear();
const month = date.getMonth() + 1;
const day = date.getDate();
const hour = date.getHours();
const minute = date.getMinutes();
Page({
  data: {
    newTask: "",
    date: year + "-" + month + "-" + day,
    time: hour + ":" + minute,
    levels: ["紧急", "重要", "一般"],
    levelIndex: 0
  },
  typeNewTask: function(e) {
    this.setData({
      newTask: e.detail.value.trim()
    });
  },
  bindLevelCodeChange: function(e) {
    this.setData({
      levelIndex: e.detail.value
    });
  },
  bindDateChange: function(e) {
    this.setData({
      date: e.detail.value
    });
  },
  bindTimeChange: function(e) {
    this.setData({
      time: e.detail.value
    });
  },
  onShow: function() {
    // let date_end = new Date("2018-11-24 14:00").getTime();
    // this.timer = setInterval(() => {
    //   this.getLeftTime(date_end);
    //   //   this.setState({ time: this.getLeftTime(date_end) });
    // }, 1000);
  },

  addTask: function(e) {
    let self = this;
    // let tasks = this.data.tasks;
    let newTaskObj = {
      content: this.data.newTask,
      deadline: new Date(this.data.date + " " + this.data.time).getTime(),
      levelIndex: this.data.levelIndex,
      status: false,
      created: Date.now()
    };
    // wx.setStorageSync("tasks", tasks);
    saveTodos(newTaskObj)
      .then(res => {
        self.setData({
          newTask: ""
        });
        wx.showToast({
          title: "已添加",
          icon: "success",
          duration: 2000,
          mask: true //是否显示透明蒙层，防止触摸穿透，默认：false
        });
        setTimeout(
          function callback() {
            wx.navigateTo({
              url: "../todo/todo"
            });
          }.bind(this),
          2000
        );
      })
      .catch(err => {});
  }
});
