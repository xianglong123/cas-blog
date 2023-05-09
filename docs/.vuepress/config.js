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
    lineNumbers: true // 代码块是否显示行号
  },
  themeConfig: {
    nav:[ // 导航栏配置
      {
        text: 'Java',
        items: [
          { text: 'Java面向对象和基础', items: [
              { text: 'java基础-面向对象', link: '/md/java/basic/java-basic-oop' },
              { text: 'java基础-知识点', link: '/md/java/basic/java-basic-lan-basic' },
              { text: 'Japanese', link: '/language/japanese/' }
            ] },
          { text: 'Java集合框架', items: [
              { text: 'Collection类关系图', link: '/md/java/collection/java-collection-all.md' },
              { text: 'Japanese', link: '/language/japanese/' }
            ] }
        ]
      },
      {text: 'java', link: '/md/java/basic/java-basic-oop.md' },
      {text: '数据库', link: '/db/'},
      {text: '微博', link: 'https://baidu.com'},
      {
        text: 'Languages',
        ariaLabel: 'Language Menu',
        items: [
          { text: 'Chinese', link: '/language/chinese/' },
          { text: 'Japanese', link: '/language/japanese/' }
        ]
      },
      {
        text: 'Languages',
        items: [
          { text: 'Group1', items: [
              { text: 'Chinese', link: '/language/chinese/' },
              { text: 'Japanese', link: '/language/japanese/' }
            ] },
          { text: 'Group2', items: [
              { text: 'Chinese', link: '/language/chinese/' },
              { text: 'Japanese', link: '/language/japanese/' }
            ] }
        ]
      }
    ],
    //sidebar: 'auto', // 侧边栏配置
    sidebarDepth: 2, // 侧边栏显示2级
    // sidebar: {
    //   '/md/java/basic/': [
    //     '',     /* /foo/ */
    //     'java-basic-oop',   /* /foo/two.html */
    //     'java-basic-lan-basic'  /* /foo/one.html */
    //   ],
    //
    //   '/md/java/collection/': [
    //     ['java-collection-all','测试test1']
    //   ],
    //
    // }
    sidebar: [
      {
        title: 'Java 基础',
        collapsable: false,
        children: [
            '/md/java/basic/java-basic-oop',
            '/md/java/basic/java-basic-lan-basic'
        ]
      },
      {
        title: 'Java 集合框架',
        collapsable: false,
        children: [
            '/md/java/collection/java-collection-all'
        ]
      }
    ]
  }
};
