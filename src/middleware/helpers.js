export const toHuman = (timestamp) => {
  const d = new Date(timestamp * 1000);
  const date = `${d.getDate().toString().padStart(2, '0')}-${(d.getMonth() + 1).toString().padStart(2, '0')}`;
  const time = `${d.getHours()}:${d.getMinutes().toString().padStart(2, '0')}`;
  return date + ' ' + time;
};
