Page({
  data: {
    tabs: ["全部", "未完成", "已完成"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,

    tasks: [],
    newTask: "",
    key: 0
  },
  tabClick: function(e) {
    console.log(e.currentTarget.id);
    console.log(e.currentTarget.offsetLeft);
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
    console.log(value);
    let tasks = this.data.tasks;

    let index = tasks.findIndex(task => task.value == value);

    if (index < 0) {
      return;
    }

    tasks[index].status = !tasks[index].status;

    this.setData({
      tasks: tasks
    });
  },
  typeNewTask: function(e) {
    this.setData({
      newTask: e.detail.value.trim()
    });
  },
  addTask: function(e) {
    let tasks = this.data.tasks;
    let key = this.data.key;
    let newTaskObj = {
      content: this.data.newTask,
      value: key++,
      status: false
    };
    tasks.push(newTaskObj);
    console.log(tasks);
    this.setData({
      tasks: tasks,
      key: key,
      newTask: ""
    });
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
        } else {
          console.log("用户点击辅助操作");
        }
      }
    });
  }

  //   removeTask: function(e) {
  //     let value = e.currentTarget.dataset.value;
  //     console.log("removeTask", value);
  //     let tasks = this.data.tasks;
  //     let newTasks = tasks.filter(task => task.value != value);
  //     console.log(newTasks);
  //     this.setData({
  //       tasks: newTasks
  //     });
  //   }
});
