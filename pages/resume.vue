<script setup lang="ts">
definePageMeta({
  layout: 'resume',
})
</script>

<template>
  <div class="resume relative mxa flex <lg:w-90% lg:w-80% lg:flex-row <lg:flex-col">
    <div class="absolute right-0 top-0 p-2rem">
      <ThemeSwitch />
    </div>
    <div class="py-3rem text-center <lg:w-full lg:w-20rem">
      <h3>GJSSSS</h3>
      <div class="mt-.2rem c-$dark-8">
        Web前端
      </div>
      <div class="mt-.5rem text-.8rem">
        <NuxtLink to="mailto:gaojinsong2010@gmail.com">
          gaojinsong2010@gmail.com
        </NuxtLink>
      </div>
      <div class="mt-1rem flex items-center justify-center gap-.5rem">
        <NuxtLink class="icon" to="https://github.com/gjssss" target="_blank">
          <div class="i-carbon-logo-github" />
        </NuxtLink>
        <NuxtLink class="icon" to="https://hellogjs.top" target="_blank">
          <div class="i-carbon-user-avatar-filled" />
        </NuxtLink>
      </div>
    </div>
    <div class="flex-1 lg:p-2rem">
      <h4>个人总结</h4>
      <ul>
        <li>
          掌握HTML、CSS，熟练使用JavaScript、TypeScript、Vue、Nuxt、Uniapp，了解Sass、Less、UnoCSS，有丰富的小
          程序和Web端开发经验。
        </li>
        <li>
          熟练使用ChatGPT工具和Git版本控制以及GitHub。
        </li>
        <li>
          了解 Linux 的基本使用以及基本应用的搭建和运维，熟悉 Docker 应用的部署。
        </li>
        <li>
          有Java、Python、Go、NodeJS等后端语言使用经验。
        </li>
        <li>
          通过英语CET6考试，阅读能力和口语能力良好。
        </li>
        <li>
          数据结构、计算机组成原理、操作系统、计算机网络基础良好。
        </li>
      </ul>
      <h4>教育背景</h4>
      <div><strong>郑州大学</strong><code>211</code><code>双一流</code></div>
      <div>计算机科学与技术 <small>2019年09月 - 2023年06月</small></div>
      <h4>项目经历</h4>
      <div><strong>EggCampus</strong></div>
      <ul>
        <li>技术栈：Uniapp+Vue3+JavaScript+Vite+Pinia</li>
        <li>项目地址：微信小程序搜索EggCampus</li>
        <li>
          简介：以在校生信息孤岛为需求点，以校园BBS社区论坛为导向，面向复旦大学校园的创业项目，已在微信小程序上线。 目前平台有3k学生用户，七月份日活500左右。
        </li>
        <li>
          负责工作：使用预加载技术提高页面性能；使用Pinia重构项目；负责商家卡券模块、帖子列表模块、消息模块；封装实现多主题功能；负责项目后台搭建与实现。
        </li>
      </ul>
      <hr>
      <div><strong>低代码平台</strong></div>
      <ul>
        <li>技术栈：Vue3+JavaScript+Pinia+NaiveUI+UnoCSS</li>
        <li>
          项目地址：<NuxtLink target="_blank" to="https://gjssss.github.io/openai-low-code/">
            预览地址
          </NuxtLink> <NuxtLink target="_blank" to="https://github.com/gjssss/openai-low-code">
            Github
          </NuxtLink>
        </li>
        <li>
          简介：使用拖拽点击等操作快速生成网站。
        </li>
        <li>
          项目介绍：实现了低代码组件的拖拽、预览、设置样式；实现事件模块、多页面模块、持久化存储和加载模块；调用ChatGPT接口实现自然语言控制页面；实现页面的预览。
        </li>
      </ul>
      <hr>
      <div><strong>搭搭</strong></div>
      <ul>
        <li>技术栈：Uniapp+Vue3+TypeScrip+UnoCSS+Vite+Pinia</li>
        <li>
          项目地址：<NuxtLink target="_blank" to="https://github.com/FDU-Family/dada-element">
            组件库
          </NuxtLink> <NuxtLink target="_blank" to="https://dada-element.pages.dev/">
            组件库文档
          </NuxtLink>
        </li>
        <li>
          简介：使用拖拽点击等操作快速生成网站。
        </li>
        <li>
          项目介绍：实现了低代码组件的拖拽、预览、设置样式；实现事件模块、多页面模块、持久化存储和加载模块；调用ChatGPT接口实现自然语言控制页面；实现页面的预览。
        </li>
      </ul>
      <h4>开源经历</h4>
      <ul>
        <li>对vue.js社区有文档贡献。</li>
        <li>
          对nuxt.js社区有文档贡献，了解nuxt源码，为核心功能提出过想法。
        </li>
        <li>
          修复HelloGitHub网站的bug，优化样式。
        </li>
      </ul>
      <h4>荣誉奖项</h4>
      <ul>
        <li>郑州大学三等奖学金</li>
        <li>全国大学生物联网设计竞赛（华为杯）西北赛区二等奖</li>
        <li>中国高校计算机大赛—网络技术挑战赛华中赛区三等奖</li>
        <li>蓝桥杯河南省级赛 C/C++组三等奖</li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss">
.resume {
  color: var(--dark-2);

  h3 {
    font-size: 2rem;
    font-weight: bolder;
    color: var(--dark);
  }

  h4 {
    font-size: 1.2rem;
    font-weight: bolder;
    margin-bottom: 0.8rem;
    margin-top: 1.5rem;
    color: var(--dark);

    &::before {
      content: '# ';
    }
  }

  a:not(:where(a.icon)) {
    border-bottom: 1px dashed var(--dark-6);
  }

  ul > li {
    position: relative;
    margin-bottom: 0.4rem;
    margin-left: 1rem;
    &::before {
      content: '';
      position: absolute;
      width: 0.3rem;
      height: 0.3rem;
      border-radius: 50%;
      background-color: var(--dark-8);
      left: -1em;
      top: 0.5em;
      transform: translateX(50%);
    }
  }

  strong {
    color: var(--dark);
    font-weight: bolder;
  }

  code:not(:where(pre > code)) {
    color: var(--dark-6);
    &::before {
      content: ' `';
    }
    &::after {
      content: '` ';
    }
  }

  small {
    font-size: 0.8rem;
    color: var(--dark-6);
  }

  hr {
    border-color: var(--dark-8);
    margin: 0.8rem 0;
  }
}
</style>
