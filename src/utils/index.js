export const getFormatedDate = (date = Date.now()) => {
  const d = new Date(date);
  let month = '' + (d.getMonth() + 1);
  let day = '' + d.getDate();
  const year = '' + d.getFullYear();

  month = month.length < 2 ? '0' + month : month;
  day = day.length < 2 ? '0' + day : day;

  return [year, month, day].join('');
};
