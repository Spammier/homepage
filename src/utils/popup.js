/**
 * 弹窗管理工具函数
 */

/**
 * 显示弹窗
 * @param {string} src 图片路径
 */
export function showPopup(src) {
  const tc = document.querySelector('.tc');
  const tcImg = document.querySelector('.tc-img');
  
  if (!tc || !tcImg) return;
  
  // 设置图片源
  tcImg.src = src;
  
  // 准备弹窗
  tc.style.visibility = 'visible';
  tc.style.display = 'flex';
  tc.style.opacity = '0';
  
  // 强制重排，然后淡入显示
  void tc.offsetWidth;
  tc.style.opacity = '1';
  tc.style.transition = 'opacity 0.3s ease';
}

/**
 * 关闭弹窗
 */
export function closePopup() {
  const tc = document.querySelector('.tc');
  if (tc) {
    tc.style.opacity = '0';
    
    // 延迟后隐藏弹窗
    setTimeout(() => {
      tc.style.visibility = 'hidden';
      tc.style.display = 'none';
    }, 300);
  }
}

/**
 * 初始化弹窗事件
 */
export function initPopupEvents() {
  // 微信二维码弹窗功能
  const wxIcon = document.querySelector('.wechat-icon');
  if (wxIcon) {
    wxIcon.addEventListener('click', function(event) {
      event.preventDefault();
      event.stopPropagation();
      showPopup('/static/img/二维码.png');
    });
  }
  
  // 弹窗关闭功能
  const tcElement = document.querySelector('.tc');
  const tcMainElement = document.querySelector('.tc-main');
  
  if (tcElement && tcMainElement) {
    // 点击背景关闭弹窗
    tcElement.addEventListener('click', function(event) {
      if (event.target === tcElement) {
        closePopup();
      }
    });
    
    // 阻止点击内容区域时关闭弹窗
    tcMainElement.addEventListener('click', function(event) {
      event.stopPropagation();
    });
  }
} 