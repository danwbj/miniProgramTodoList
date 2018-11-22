//调用云函数之前需要初始化
wx.cloud.init({
  env: "wudd-785ff4"
});

const db = wx.cloud.database();

/**
 * 调用微信接口获取openid
 * @param {*} code
 */
export const jscode2session = code => {
  return wx.cloud.callFunction({
    name: "jscode2session",
    data: {
      code
    }
  });
};

/**
 * 添加todo
 * @param {*} data
 */
export const saveTodos = data => {
  return db.collection("todos").add({
    data
  });
};

/**
 * 根据openid获取todos
 * @param {*} openid
 */
export const getTodos = openid => {
  return db
    .collection("todos")
    .where({
      _openid: openid
    })
    .orderBy("created", "desc")
    .get();
};
/**
 * 更新某一条todo的状态
 * @param {*} _id
 */
export const updateTodo = (_id, data) => {
  return db
    .collection("todos")
    .doc(_id)
    .update({
      data: {
        status: data.status
      }
    });
};
/**
 * 删除某一条todo
 * @param {*} _id
 */
export const removeTodo = _id => {
  return db
    .collection("todos")
    .doc(_id)
    .remove();
};
