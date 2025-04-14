/**
 * 主题管理工具函数
 */

/**
 * 设置Cookie
 * @param {string} name Cookie名称
 * @param {string} value Cookie值
 * @param {number} days 过期天数
 */
export function setCookie(name, value, days) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + value + expires + "; path=/";
}

/**
 * 获取Cookie
 * @param {string} name Cookie名称
 * @returns {string|null} Cookie值
 */
export function getCookie(name) {
  const nameEQ = name + "=";
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i];
    while (cookie.charAt(0) == ' ') {
      cookie = cookie.substring(1, cookie.length);
    }
    if (cookie.indexOf(nameEQ) == 0) {
      return cookie.substring(nameEQ.length, cookie.length);
    }
  }
  return null;
}

/**
 * 切换主题
 * @param {string} theme 主题名称 ('Light'|'Dark')
 */
export function changeTheme(theme) {
  const html = document.documentElement;
  const tanChiShe = document.getElementById("tanChiShe");
  
  // 更新蛇图标
  if (tanChiShe) {
    tanChiShe.src = "/static/svg/snake-" + theme + ".svg";
  }
  
  // 应用主题
  html.setAttribute('theme', theme);
  setCookie("themeState", theme, 365);
  
  return theme;
} 