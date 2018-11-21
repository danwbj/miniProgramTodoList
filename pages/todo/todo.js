var app = getApp();
var userInfo = app.globalData.userInfo;
console.log(userInfo);

Page({
  data: {
    tabs: ["全部任务", "未完成", "已完成"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,

    tasks: wx.getStorageSync("tasks") || [],
    newTask: ""
  },
  tabClick: function(e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },
  //   checkboxChange: function(e) {
  //     console.log("checkbox发生change事件，携带value值为：", e.detail.value);
  //     var tasks = this.data.tasks,
  //       values = e.detail.value;
  //     for (var i = 0, lenI = tasks.length; i < lenI; ++i) {
  //       if (values.indexOf(tasks[i].value + "") != -1) {
  //         console.log(i);
  //         console.log(tasks[i].status);
  //         tasks[i].status = !tasks[i].status;
  //       }
  //     }
  //     this.setData({
  //       tasks: tasks
  //     });
  //   },
  checkboxChange: function(e) {
    console.log("----checkboxChange");
    let value = e.currentTarget.dataset.value;
    let tasks = this.data.tasks;

    let index = tasks.findIndex(task => task.value == value);

    if (index < 0) {
      return;
    }

    tasks[index].status = !tasks[index].status;
    this.setData({
      tasks: tasks
    });
    wx.setStorageSync("tasks", tasks);
  },
  typeNewTask: function(e) {
    this.setData({
      newTask: e.detail.value.trim()
    });
  },
  addTask: function(e) {
    let tasks = this.data.tasks;
    let newTaskObj = {
      content: this.data.newTask,
      value: Date.parse(new Date()),
      status: false
    };
    tasks.push(newTaskObj);
    this.setData({
      tasks: tasks,
      newTask: ""
    });
    wx.setStorageSync("tasks", tasks);
  },
  removeTask: function(e) {
    let self = this;
    wx.showModal({
      title: "警告",
      content: "确定要删除该事项？",
      confirmText: "确定",
      cancelText: "取消",
      success: function(res) {
        if (res.confirm) {
          console.log("用户点击主操作");
          let value = e.currentTarget.dataset.value;
          let tasks = self.data.tasks;
          let newTasks = tasks.filter(task => task.value != value);
          self.setData({
            tasks: newTasks
          });
          wx.setStorageSync("tasks", newTasks);
        } else {
          console.log("用户点击辅助操作");
        }
      }
    });
  }
});
