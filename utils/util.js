const formatTime = date => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  return (
    [year, month, day].map(formatNumber).join("/") +
    " " +
    [hour, minute, second].map(formatNumber).join(":")
  );
};

const formatNumber = n => {
  n = n.toString();
  return n[1] ? n : "0" + n;
};

const getLeftTime = date_end => {
  let t = date_end - Date.now();
  if (t > 0) {
    let day = Math.floor(t / (24 * 3600 * 1000));
    let leave1 = t % (24 * 3600 * 1000);
    let hours = Math.floor(leave1 / (3600 * 1000));
    let leave2 = leave1 % (3600 * 1000);
    let minutes = Math.floor(leave2 / (60 * 1000));
    let leave3 = leave2 % (60 * 1000);
    let seconds = Math.round(leave3 / 1000);
    console.log(`${day}天 ${hours}:${minutes}:${seconds}`);
    return `${day}天 ${hours}:${minutes}:${seconds}`;
  } else {
    // clearInterval(this.timer);
    return "已延期";
  }
};
module.exports = {
  formatTime: formatTime,
  getLeftTime: getLeftTime
};
