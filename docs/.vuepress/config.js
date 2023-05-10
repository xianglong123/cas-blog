module.exports = {
  title: '个人主页',
  description: 'Personal Website',
  head: [ // 注入到当前页面的 HTML <head> 中的标签
    ['link', { rel: 'icon', href: '/images/photo.jpg' }],
    ['link', { rel: 'manifest', href: '/images/photo.jpg' }],
    ['link', { rel: 'apple-touch-icon', href: '/images/photo.jpg' }],
    ['meta', { 'http-quiv': 'pragma', cotent: 'no-cache'}],
    ['meta', { 'http-quiv': 'pragma', cotent: 'no-cache,must-revalidate'}],
    ['meta', { 'http-quiv': 'expires', cotent: '0'}]
  ],
  serviceWorker: true, // 是否开启 PWA
  base: '/', // 部署到github相关的配置
  markdown: {
    lineNumbers: true, // 代码块是否显示行号
    extendMarkdown: md => {
      md.use(require("markdown-it-disable-url-encode"));
    }
  },
  themeConfig: {
    nav:[ // 导航栏配置
      {
        text: 'Java',
        items: [
          { text: 'Java面向对象和基础', items: [
              { text: 'Java基础-面向对象', link: '/md/java/basic/java-basic-oop' },
              { text: 'Java基础-知识点', link: '/md/java/basic/java-basic-lan-basic' },
              { text: 'Java 基础 - 图谱 & Q/A', link: '/md/java/basic/java-basic-lan-sum' }
            ] },
          { text: 'Java集合框架', items: [
              { text: 'Collection类关系图', link: '/md/java/collection/java-collection-all' }
            ] },
          { text: 'Java多线程与并发', items: [
              { text: 'Java并发知识体系', link: '/md/java/thread/java-thread-x-overview' }
            ] }
        ]
      },
      {text: '数据库', link: '/md/algorithm/alg-basic-overview'},
      {text: 'github', link: 'https://github.com/xianglong123/cas-blog'}
    ],
    //sidebar: 'auto', // 侧边栏配置
    sidebarDepth: 2, // 侧边栏显示2级
    sidebar: {
      '/md/java/':[
        {
          title: 'Java 基础',
          collapsable: false,
          children: [
            '/md/java/basic/java-basic-oop',
            '/md/java/basic/java-basic-lan-basic',
            '/md/java/basic/java-basic-lan-sum'
          ]
        },
        {
          title: 'Java 集合框架',
          collapsable: false,
          children: [
            '/md/java/collection/java-collection-all'
          ]
        },
        {
          title: 'Java 多线程与并发',
          collapsable: false,
          children: [
            '/md/java/thread/java-thread-x-overview'
          ]
        }
      ],
      '/md/algorithm/':[
          {
            title: '数据库基础和原理',
            collapsable: false,
            children: [
              '/md/algorithm/alg-basic-overview'
            ]
          }
      ]
    }

  },
  plugins: [
    [
      '@vuepress-reco/vuepress-plugin-kan-ban-niang',{
      theme: [
        'miku', 'whiteCat', 'haru1', 'haru2', 'haruto', 'koharu', 'izumi', 'shizuku', 'wanko', 'blackCat', 'z16'
      ],
      clean: false,
      messages: {
        welcome: '欢迎来到我的博客', home: '心里的花，我想要带你回家。', theme: '好吧，希望你能喜欢我的其他小伙伴。', close: '你不喜欢我了吗？痴痴地望着你。'
      },
      messageStyle: { right: '68px', bottom: '290px' },
      width: 250,
      height: 320
    }
    ],
    [
        "vuepress-plugin-cursor-effects",
      {
        size: 2,                    // size of the particle, default: 2
        shape: 'circle',  // shape of the particle, default: 'star'
        zIndex: 999999999           // z-index property of the canvas, default: 999999999
      }],
      [
      "ribbon-animation", {
      size: 90,   // 默认数据
      opacity: 0.3,  //  透明度
      zIndex: -1,   //  层级
      opt: {
        // 色带HSL饱和度
        colorSaturation: "80%",
        // 色带HSL亮度量
        colorBrightness: "60%",
        // 带状颜色不透明度
        colorAlpha: 0.65,
        // 在HSL颜色空间中循环显示颜色的速度有多快
        colorCycleSpeed: 6,
        // 从哪一侧开始Y轴 (top|min, middle|center, bottom|max, random)
        verticalPosition: "center",
        // 到达屏幕另一侧的速度有多快
        horizontalSpeed: 200,
        // 在任何给定时间，屏幕上会保留多少条带
        ribbonCount: 2,
        // 添加笔划以及色带填充颜色
        strokeSize: 0,
        // 通过页面滚动上的因子垂直移动色带
        parallaxAmount: -0.5,
        // 随着时间的推移，为每个功能区添加动画效果
        animateSections: true
      },
      ribbonShow: false, //  点击彩带  true显示  false为不显示
      ribbonAnimationShow: true  // 滑动彩带
    }],
    ['@vuepress-reco/vuepress-plugin-bulletin-popover', {
      title: '公告',
      body: [
        {
          type: 'title',
          content: '欢迎加我的QQ/vx 🎉🎉🎉',
          style: 'text-aligin: center;',
        },
        {
          type: 'text',
          content: 'QQ/VX：1391086179',
          style: 'text-align: center;'
        },
        {
          type: 'text',
          content: '喜欢的主题特效可以去个人信息',
          style: 'text-align: center;'
        },
        {
          type: 'text',
          content: '友链或疑问均可在留言板给我留言',
          style: 'text-align: center;'
        }
      ],
      footer: [
        {
          type: 'button',
          text: '打赏',
          link: '/md/reward/reward-me'
        },
      ]
    }],
      ['vuepress-plugin-anchor-right'],
]
};
