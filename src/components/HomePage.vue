<template>
  <div id="ty-loading">
    <div id="ty-loading-center"></div>
  </div>
  <div class="ty-filter"></div>
  <div class="ty-main">
    <div class="ty-left">
      <div class="logo" :style="{ backgroundImage: `url(${weixinImageUrl})` }">
        <img style="position: absolute;top:-15%;left:-10%;width: 120%; aspect-ratio: 1/1;" :src="logokuangUrl">
      </div>
      <div class="left-div left-des">
        <div class="left-des-item" style="display: flex; justify-content: center; text-align: center;">
          <svg style="margin-right: 6px;" t="1705773709627" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1478"><path d="M512 249.976471c-99.388235 0-180.705882 81.317647-180.705882 180.705882s81.317647 180.705882 180.705882 180.705882 180.705882-81.317647 180.705882-180.705882-81.317647-180.705882-180.705882-180.705882z m0 301.17647c-66.258824 0-120.470588-54.211765-120.470588-120.470588s54.211765-120.470588 120.470588-120.470588 120.470588 54.211765 120.470588 120.470588-54.211765 120.470588-120.470588 120.470588z" p-id="1479"></path><path d="M512 39.152941c-216.847059 0-391.529412 174.682353-391.529412 391.529412 0 349.364706 391.529412 572.235294 391.529412 572.235294s391.529412-222.870588 391.529412-572.235294c0-216.847059-174.682353-391.529412-391.529412-391.529412z m0 891.482353C424.658824 873.411765 180.705882 686.682353 180.705882 430.682353c0-183.717647 147.576471-331.294118 331.294118-331.294118s331.294118 147.576471 331.294118 331.294118c0 256-243.952941 442.729412-331.294118 499.952941z" p-id="1480"></path></svg>中国-北京
        </div>
        <div class="left-des-item" style="display: flex; justify-content: center; text-align: center;">
          <svg style="margin-right: 6px;" t="1704870588438" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3174" width="16" height="16">
            <path d="M926.47619 355.644952V780.190476a73.142857 73.142857 0 0 1-73.142857 73.142857H170.666667a73.142857 73.142857 0 0 1-73.142857-73.142857V355.644952l304.103619 257.828572a170.666667 170.666667 0 0 0 220.745142 0L926.47619 355.644952zM853.333333 170.666667a74.044952 74.044952 0 0 1 26.087619 4.778666 72.704 72.704 0 0 1 30.622477 22.186667 73.508571 73.508571 0 0 1 10.678857 17.67619c3.169524 7.509333 5.12 15.652571 5.607619 24.210286L926.47619 243.809524v24.380952L559.469714 581.241905a73.142857 73.142857 0 0 1-91.306666 2.901333l-3.632762-2.925714L97.52381 268.190476v-24.380952a72.899048 72.899048 0 0 1 40.155428-65.292191A72.97219 72.97219 0 0 1 170.666667 170.666667h682.666666z"  p-id="3175"></path>
          </svg>1581708631@qq.com
        </div>
      </div>
      <div class="left-div left-tag">
        <div class="left-tag-item">网瘾</div>
        <div class="left-tag-item">小学生</div>
        <div class="left-tag-item">研三</div>
        <div class="left-tag-item">Linux</div>
        <div class="left-tag-item">跑者</div>
        <div class="left-tag-item">后端</div>
        <div class="left-tag-item">鼓手</div>
        <div class="left-tag-item">国服亚瑟</div>
      </div>
      <div class="left-div left-time">
        <ul id="line">
          <li>
            <div class="focus"></div>
            <div class="timeline-content">
              <img class="timeline-image" :src="zijiieUrl" alt="字节跳动">
              <div>
                <div>字节跳动</div>
                <div>2025.07</div>
              </div>
            </div>
          </li>
          <li>
            <div class="focus"></div>
            <div class="timeline-content">
              <img class="timeline-image" :src="beiyouUrl" alt="北京邮电大学">
              <div>
                <div>北京邮电大学</div>
                <div>2022.09</div>
              </div>
            </div>
          </li>
          <li>
            <div class="focus"></div>
            <div class="timeline-content">
              <img class="timeline-image" :src="xiyouUrl" alt="西安邮电大学">
              <div>
                <div>西安邮电大学</div>
                <div>2018.09</div>
              </div>
            </div>
          </li>
          <li>
            <div class="focus"></div>
            <div class="timeline-content">
              <img class="timeline-image" :src="shizhongUrl" alt="山西省实验中学">
              <div>
                <div>山西省实验中学</div>
                <div>2015.09</div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="ty-right">
      <header>
        <div class="index-logo" :style="{ backgroundImage: `url(${weixinImageUrl})` }">
          <img style="position: absolute;top:-15%;left:-10%;width: 120%; aspect-ratio: 1/1;" :src="logokuangUrl">
        </div>
        <div class="welcome">
          你好！我是<span class="gradientText">张庭毓</span>
        </div>
        <div class="description">👦 <span class="purpleText">后端开发</span> 工程师</div>
        <div class="description">📝 Tnink <span class="purpleText textBackground">twice</span>, code
          <span class="purpleText textBackground">once</span>.</div>

        <div class="iconContainer">
          <a class="iconItem" href="https://github.com/Spammier" target="_blank">
            <svg t="1704870335945" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2487">
              <path d="M511.6 76.3C264.3 76.2 64 276.4 64 523.5 64 718.9 189.3 885 363.8 946c23.5 5.9 19.9-10.8 19.9-22.2v-77.5c-135.7 15.9-141.2-73.9-150.3-88.9C215 726 171.5 718 184.5 703c30.9-15.9 62.4 4 98.9 57.9 26.4 39.1 77.9 32.5 104 26 5.7-23.5 17.9-44.5 34.7-60.8-140.6-25.2-199.2-111-199.2-213 0-49.5 16.3-95 48.3-131.7-20.4-60.5 1.9-112.3 4.9-120 58.1-5.2 118.5 41.6 123.2 45.3 33-8.9 70.7-13.6 112.9-13.6 42.4 0 80.2 4.9 113.5 13.9 11.3-8.6 67.3-48.8 121.3-43.9 2.9 7.7 24.7 58.3 5.5 118 32.4 36.8 48.9 82.7 48.9 132.3 0 102.2-59 188.1-200 212.9 23.5 23.2 38.1 55.4 38.1 91v112.5c0.8 9 0 17.9 15 17.9 177.1-59.7 304.6-227 304.6-424.1 0-247.2-200.4-447.3-447.5-447.3z"  p-id="2488"></path>
            </svg>
            <div class="iconTip">Github</div>
          </a>
          <a class="iconItem wechat-icon" href="javascript:void(0)">
            <svg t="1712319361023" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1861" >
              <path d="M692.677 347.793c11.294 0 22.473 0.84 33.56 2.116-30.199-140.707-180.509-245.082-352.306-245.082-191.896 0-349.138 130.89-349.138 297.643 0 96.142 52.429 175.113 139.96 236.317l-34.988 105.153 122.304-61.265c43.73 8.625 78.718 17.549 122.448 17.549 10.96 0 21.835-0.539 32.636-1.383-6.831-23.37-10.809-47.882-10.809-73.242-0.001-152.865 131.22-277.805 296.332-277.805zM497.818 249.44c26.326 0 43.732 17.25 43.732 43.538 0 26.114-17.406 43.653-43.732 43.653-26.229 0-52.531-17.54-52.531-43.653 0-26.288 26.302-43.538 52.531-43.538zM244.441 336.632c-26.229 0-52.633-17.54-52.633-43.653 0-26.289 26.403-43.538 52.633-43.538 26.232 0 43.727 17.25 43.727 43.538 0 26.114-17.493 43.653-43.727 43.653z" p-id="1862"></path>
              <path d="M997.135 626.423c0-139.429-139.779-253.115-296.534-253.115-166.083 0-296.84 113.686-296.84 253.115 0 139.837 130.757 253.121 296.84 253.121 34.78 0 69.885-8.759 104.666-17.55l95.637 52.524-26.218-87.377c70.026-52.525 122.448-122.454 122.448-200.718zM617.068 583.189c-17.387 0-34.892-17.25-34.892-34.894 0-17.39 17.505-34.799 34.892-34.799 26.312 0 43.764 17.41 43.764 34.799 0 17.644-17.452 34.894-43.764 34.894zM809.002 583.189c-17.431 0-34.799-17.25-34.799-34.894 0-17.39 17.368-34.799 34.799-34.799 26.196 0 43.735 17.41 43.735 34.799 0 17.644-17.538 34.894-43.735 34.894z" p-id="1863"></path>
            </svg>
            <div class="iconTip">微信</div>
          </a>
          <a class="switch" href="javascript:void(0)">
            <div class="onoffswitch">
              <input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="myonoffswitch" checked>
              <label class="onoffswitch-label" for="myonoffswitch">
                <span class="onoffswitch-inner"></span>
                <span class="onoffswitch-switch"></span>
              </label>
            </div>
          </a>
        </div>

        <div class="tanChiShe">
          <img id="tanChiShe" :src="snakeLightUrl" alt="">
        </div>
      </header>

      <content>
        <div class="title">
          <svg t="1705257422086" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1891" >
            <path d="M629.333333 202.666667v213.333333h277.333334v448h-512v-213.333333h-277.333334v-448h512z m213.333334 277.333333h-213.333334v170.666667h-170.666666v149.333333h384v-320z m-277.333334-213.333333h-384v320h213.333334v-170.666667h170.666666v-149.333333z m0 213.333333h-106.666666v106.666667h106.666666v-106.666667z"  p-id="1892"></path>
          </svg>Project
        </div>
        <div class="projectList">
          <a class="projectItem b" target="_blank" href="https://jsxh.doitapp.top/login">
            <div class="projectItemLeft">
              <h1>精神小伙管理器</h1>
              <p>我的第一个后端项目</p>
            </div>
            <div class="projectItemRight">
              <img :src="i6Url" alt="">
            </div>
          </a>
          <a class="projectItem b" target="_blank" href="http://www.opticsjournal.net/Articles/z240976/EarlyPosting">
            <div class="projectItemLeft">
              <h1>视点密度渐变的大视角三维光场显示</h1>
              <p>我的第一篇小论文</p>
            </div>
            <div class="projectItemRight">
              <img :src="i2Url" alt="">
            </div>
          </a>
          <a class="projectItem b" target="_blank" href="https://www.doitapp.top">
            <div class="projectItemLeft">
              <h1>DoIt</h1>
              <p>我的第一个分布式项目</p>
            </div>
            <div class="projectItemRight">
              <img :src="doitImageUrl" alt="DoIt Project">
            </div>
          </a>
        </div>
      
        <div class="title">
          <svg t="1705257823317" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7833" >
            <path d="M395.765333 586.570667h-171.733333c-22.421333 0-37.888-22.442667-29.909333-43.381334L364.768 95.274667A32 32 0 0 1 394.666667 74.666667h287.957333c22.72 0 38.208 23.018667 29.632 44.064l-99.36 243.882666h187.050667c27.509333 0 42.186667 32.426667 24.042666 53.098667l-458.602666 522.56c-22.293333 25.408-63.626667 3.392-54.976-29.28l85.354666-322.421333zM416.714667 138.666667L270.453333 522.581333h166.869334a32 32 0 0 1 30.933333 40.181334l-61.130667 230.954666 322.176-367.114666H565.312c-22.72 0-38.208-23.018667-29.632-44.064l99.36-243.882667H416.714667z"  p-id="7834"></path>
          </svg>
          Skills
        </div>
        <div class="skill">
          <img id="skillPc" :src="skillPcUrl" alt="">
          <img id="skillWap" :src="skillWapUrl" alt="">
        </div>
      </content>
    </div>
  </div>
  <footer>
    Spammie © 2025 |
    <a href="https://beian.miit.gov.cn/">
      豫ICP备2023015852号-1
    </a>
  </footer>
  <div class="tc">
    <div class="tc-main">
      <div class="tc-img-container">
        <img class="tc-img" src="" alt="微信二维码">
        <div class="tc-hint">点击背景任意位置关闭</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { getCookie, changeTheme, initAllFeatures, showPopup } from '../utils/index.js';

// 导入图片资源
import logokuangUrl from '@/assets/img/logokuang.png';
import weixinImageUrl from '@/assets/img/微信图片_20240923165542.jpg';
import zijiieUrl from '@/assets/img/字节跳动.png';
import beiyouUrl from '@/assets/img/北邮校徽.png';
import xiyouUrl from '@/assets/img/西邮校徽.png';
import shizhongUrl from '@/assets/img/实中校徽.png';
import i6Url from '@/assets/img/i6.png';
import i2Url from '@/assets/img/i2.png';
import qrcodeUrl from '@/assets/img/二维码.png';
import doitImageUrl from '@/assets/img/doit.png';

// 导入SVG资源
import snakeLightUrl from '@/assets/svg/snake-Light.svg';
import snakeDarkUrl from '@/assets/svg/snake-Dark.svg';
import skillPcUrl from '@/assets/svg/skillPc.svg';
import skillWapUrl from '@/assets/svg/skillWap.svg';

// 初始化页面加载逻辑
let themeState = ref(getCookie("themeState") || "Light");

// 提前应用主题，防止闪烁
if (typeof document !== 'undefined') {
  document.documentElement.setAttribute('theme', themeState.value);
}

onMounted(() => {
  // 初始化所有功能
  initAllFeatures();
  
  // 为微信图标单独添加点击事件
  const wxIcon = document.querySelector('.wechat-icon');
  if (wxIcon) {
    wxIcon.addEventListener('click', function(event) {
      event.preventDefault();
      event.stopPropagation();
      showPopup(qrcodeUrl);
    });
  }
  
  // 主题切换功能 - 更新蛇图标逻辑
  const onoffswitch = document.getElementById('myonoffswitch');
  const tanChiSheImg = document.getElementById('tanChiShe');

  // 初始设置蛇图标
  if (tanChiSheImg) {
      tanChiSheImg.src = themeState.value === 'Light' ? snakeLightUrl : snakeDarkUrl;
  }

  if (onoffswitch) {
    onoffswitch.addEventListener('change', function() {
      const newTheme = this.checked ? "Light" : "Dark";
      themeState.value = newTheme;
      changeTheme(newTheme);

      // 更新蛇图标
      if (tanChiSheImg) {
         tanChiSheImg.src = newTheme === 'Light' ? snakeLightUrl : snakeDarkUrl;
      }
    });
    
    // 设置初始复选框状态
    onoffswitch.checked = themeState.value === "Light";
  }
});
</script>

<style scoped>
/* 组件特有的样式 */
</style> 