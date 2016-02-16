export const urlMap = {
  cityUrl: 'http://int.dpool.sina.com.cn/iplookup/iplookup.php',
  weatherUrl: 'http://wthrcdn.etouch.cn/weather_mini',
};

export const addUrlParams = (url, params = {}) => {
  const validKeys = Object.keys(params).filter(key => params[key] !== null);
  const paramsStr = validKeys.map(key => `${key}=${params[key]}`).join('&');
  return `${url}?${paramsStr}`;
};
