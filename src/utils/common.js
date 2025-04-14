/**
 * 通用工具函数
 */

/**
 * 初始化FPS计数器
 */
export function initFpsCounter() {
  const fpsElement = document.createElement('div');
  fpsElement.id = 'fps';
  fpsElement.style.zIndex = '10000';
  fpsElement.style.position = 'fixed';
  fpsElement.style.left = '0';
  document.body.insertBefore(fpsElement, document.body.firstChild);

  let fps = 0;
  let last = Date.now();
  
  function updateFPS() {
    fps++;
    const now = Date.now();
    if (now - last >= 1000) {
      fpsElement.textContent = 'FPS: ' + fps;
      fps = 0;
      last = now;
    }
    requestAnimationFrame(updateFPS);
  }
  
  requestAnimationFrame(updateFPS);
}

/**
 * 初始化按钮交互效果
 */
export function initButtonEffects() {
  function handlePress(event) {
    this.classList.add('pressed');
  }

  function handleRelease(event) {
    this.classList.remove('pressed');
  }

  function handleCancel(event) {
    this.classList.remove('pressed');
  }

  const buttons = document.querySelectorAll('.projectItem');
  buttons.forEach(function (button) {
    button.addEventListener('mousedown', handlePress);
    button.addEventListener('mouseup', handleRelease);
    button.addEventListener('mouseleave', handleCancel);
    button.addEventListener('touchstart', handlePress);
    button.addEventListener('touchend', handleRelease);
    button.addEventListener('touchcancel', handleCancel);
  });
}

/**
 * 禁用右键菜单
 */
export function disableContextMenu() {
  document.addEventListener('contextmenu', function (event) {
    event.preventDefault();
  });
}

/**
 * 初始化页面加载动画
 */
export function initLoadingAnimation() {
  const loading = document.getElementById('ty-loading');
  if (loading) {
    // 让页面内容先渲染
    setTimeout(() => {
      loading.style.opacity = '0';
      loading.style.transition = 'opacity 0.5s ease';
      
      // 等动画结束后移除
      setTimeout(() => {
        loading.style.display = 'none';
      }, 500);
    }, 200);
  }
} 