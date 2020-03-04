function formatNumber(n) {
  n = n.toString();
  return n[1] ? n : '0' + n;
}

export function formatTime(date) {
  let dates = new Date(date);
  const year = dates.getFullYear();
  const month = dates.getMonth() + 1;
  const day = dates.getDate();

  const hour = dates.getHours();
  const minute = dates.getMinutes();
  const second = dates.getSeconds();

  return `${month}月${day}日  ${hour}:${minute}`
  // return [year, month, day]
  //   .map(formatNumber)
  //   .join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':');
}

