/**
 * 工具函数集中导出文件
 */

// 导入所有工具函数
import { setCookie, getCookie, changeTheme } from './theme.js';
import { showPopup, closePopup, initPopupEvents } from './popup.js';
import { initFpsCounter, initButtonEffects, disableContextMenu, initLoadingAnimation } from './common.js';

// 导出所有工具函数
export {
  // 主题相关
  setCookie, 
  getCookie,
  changeTheme,
  
  // 弹窗相关
  showPopup,
  closePopup,
  initPopupEvents,
  
  // 通用功能相关
  initFpsCounter,
  initButtonEffects,
  disableContextMenu,
  initLoadingAnimation
};

/**
 * 初始化所有功能
 */
export function initAllFeatures() {
  if (typeof window === 'undefined') return;
  
  // 初始化加载动画
  initLoadingAnimation();
  
  // 初始化各种交互功能
  disableContextMenu();
  initButtonEffects();
  initPopupEvents();
  initFpsCounter();
  
  console.log('所有功能已初始化');
} 