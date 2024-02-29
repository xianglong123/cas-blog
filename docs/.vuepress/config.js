module.exports = {
    title: '个人主页',
    description: 'Personal Website',
    head: [ // 注入到当前页面的 HTML <head> 中的标签
        ['link', {rel: 'icon', href: '/images/photo.jpg'}],
        ['link', {rel: 'manifest', href: '/images/photo.jpg'}],
        ['link', {rel: 'apple-touch-icon', href: '/images/photo.jpg'}],
        ['meta', {'http-quiv': 'pragma', cotent: 'no-cache'}],
        ['meta', {'http-quiv': 'pragma', cotent: 'no-cache,must-revalidate'}],
        ['meta', {'http-quiv': 'expires', cotent: '0'}]
    ],
    serviceWorker: true, // 是否开启 PWA
    base: '/', // 部署到github相关的配置
    markdown: {
        lineNumbers: true, // 代码块是否显示行号
        extendMarkdown: md => {
            md.use(require("markdown-it-disable-url-encode"));
        },
        toc: { includeLevel: [3, 4] }
    },
    themeConfig: {
        darkMode: true,
        nav: [ // 导航栏配置
            {
                text: 'Java',
                items: [
                    {
                        text: 'Java面向对象和基础', items: [
                            {text: 'Java基础-面向对象', link: '/md/java/basic/java-basic-oop'},
                            {text: 'Java基础-知识点', link: '/md/java/basic/java-basic-lan-basic'},
                            {text: 'Java 基础 - 图谱 & Q/A', link: '/md/java/basic/java-basic-lan-sum'}
                        ]
                    },
                    {
                        text: 'Java集合框架', items: [
                            {text: 'Java 集合框架详解', link: '/md/java/collection/java-collection-all'}
                        ]
                    },
                    {
                        text: 'Java进阶 - 并发框架', items: [
                            {text: 'Java 并发知识体系', link: '/md/java/thread/java-thread-x-overview'},
                            {text: 'Java 并发理论基础', link: '/md/java/thread/java-thread-x-theorty'},
                            {text: 'Java 并发线程基础', link: '/md/java/thread/java-thread-x-thread-basic'},
                            {text: 'J.U.C 知识体系与详解', link: '/md/java/thread/java-thread-x-juc-overview'}
                        ]
                    },
                    {
                        text: 'Java进阶 - IO框架', items: [
                            {text: 'Java IO/NIO/AIO详解', link: '/md/java/io/java-io-overview'}
                        ]
                    },
                    {
                        text: 'Java进阶 - 新版本特性', items: [
                            {text: 'Java 8 特性详解', link: '/md/java/java8/java8'},
                            {text: 'Java 8 以上版本特性体系', link: '/md/java/java8up/java-8-up-overview'},
                            {text: 'Java 8 升Java 11特性必读', link: '/md/java/java8up/java9-11'},
                            // {text: 'Java 11 升Java 17特性必读', link: ''}
                        ]
                    },
                    {
                        text: 'Java进阶 - JVM相关', items: [
                            {text: 'Java 类加载机制', link: '/md/java/jvm/java-jvm-classload'},
                            {text: 'Java 字节码和增强技术', link: '/md/java/jvm/java-jvm-class'},
                            {text: 'JVM 内存结构详解', link: '/md/java/jvm/java-jvm-struct'},
                            {text: 'JVM 垃圾回收机制', link: '/md/java/jvm/java-jvm-gc'},
                            {text: 'Java 调试排错相关', link: '/md/java/jvm/java-jvm-debug-tools-linux'}
                        ]
                    }
                ]
            },
            {text: '数据库', items: [
                    {
                        text: '数据库相关介绍', items: [
                            {text: 'mysql', link: '/md/db/info/mysql'},
                            {text: 'oracle', link: '/md/db/info/oracle'},
                            {text: 'H2', link: '/md/db/info/h2'}
                        ]
                    },
                    {
                        text: '框架介绍', items: [
                            {text: 'mybatis', link: '/md/java/basic/java-basic-oop'},
                            {text: 'mybatis-plus', link: '/md/db/mp/mp-base-overview'},
                            {text: 'jpa', link: '/md/java/basic/java-basic-lan-sum'}
                        ]
                    },
                    {
                        text: 'mybatis-plus', link: '/md/db/mp/mp-base-overview'
                    }
                ]},
            {text: '个人记录', link: '/md/owner/owner-base-overview'},
            {text: 'github', link: 'https://github.com/xianglong123/cas-blog'}
        ],
        //sidebar: 'auto', // 侧边栏配置
        sidebarDepth: 2, // 侧边栏显示2级
        sidebar: {
            '/md/java/': [
                {
                    title: 'Java 基础',
                    collapsable: false,
                    children: [
                        '/md/java/basic/java-basic-oop',
                        '/md/java/basic/java-basic-lan-basic',
                        '/md/java/basic/java-basic-lan-sum',
                        '/md/java/basic/java-basic-x-generic',
                        '/md/java/basic/java-basic-x-exception',
                        '/md/java/basic/java-basic-x-reflection',
                        '/md/java/advanced/java-advanced-spi',
                    ]
                },
                {
                    title: 'Java 集合框架',
                    collapsable: false,
                    children: [
                        '/md/java/collection/java-collection-all',
                        '/md/java/collection/java-collection-ArrayList',
                        '/md/java/collection/java-collection-LinkedList',
                        '/md/java/collection/java-collection-Queue&Stack',
                        '/md/java/collection/java-collection-PriorityQueue',
                        '/md/java/collection/java-map-HashMap&HashSet',
                        '/md/java/collection/java-map-LinkedHashMap&LinkedHashSet',
                        '/md/java/collection/java-map-TreeMap&TreeSet',
                        '/md/java/collection/java-map-WeakHashMap',
                    ]
                },
                {
                    title: 'Java 多线程与并发',
                    collapsable: false,
                    children: [
                        '/md/java/thread/java-thread-x-overview',
                        '/md/java/thread/java-thread-x-theorty',
                        '/md/java/thread/java-thread-x-thread-basic',
                        '/md/java/thread/java-thread-x-lock-all',
                        '/md/java/thread/java-thread-x-key-synchronized',
                        '/md/java/thread/java-thread-x-key-volatile',
                        '/md/java/thread/java-thread-x-key-final',
                        '/md/java/thread/java-thread-x-juc-overview',
                        '/md/java/thread/java-thread-x-juc-AtomicInteger',
                        '/md/java/thread/java-thread-x-lock-LockSupport',
                        '/md/java/thread/java-thread-x-lock-AbstractQueuedSynchronizer',
                        '/md/java/thread/java-thread-x-lock-ReentrantLock',
                        '/md/java/thread/java-thread-x-lock-ReentrantReadWriteLock',
                        '/md/java/thread/java-thread-x-juc-collection-ConcurrentHashMap',
                        '/md/java/thread/java-thread-x-juc-collection-CopyOnWriteArrayList',
                        '/md/java/thread/java-thread-x-juc-collection-ConcurrentLinkedQueue',
                        '/md/java/thread/java-thread-x-juc-collection-BlockingQueue',
                        '/md/java/thread/java-thread-x-juc-executor-FutureTask',
                        '/md/java/thread/java-thread-x-juc-executor-ThreadPoolExecutor',
                        '/md/java/thread/java-thread-x-juc-executor-ScheduledThreadPoolExecutor',
                        '/md/java/thread/java-thread-x-juc-executor-ForkJoinPool',
                        '/md/java/thread/java-thread-x-juc-tool-countdownlatch',
                        '/md/java/thread/java-thread-x-juc-tool-cyclicbarrier',
                        '/md/java/thread/java-thread-x-juc-tool-semaphore',
                        '/md/java/thread/java-thread-x-juc-tool-phaser',
                        '/md/java/thread/java-thread-x-juc-tool-exchanger',
                        '/md/java/thread/java-thread-x-threadlocal',
                    ]
                },
                {
                    title: 'Java IO/NIO/AIO',
                    collapsable: false,
                    children: [
                        '/md/java/io/java-io-overview',
                        '/md/java/io/java-io-basic-category',
                        '/md/java/io/java-io-basic-design-pattern',
                        '/md/java/io/java-io-basic-code-inputstream',
                        '/md/java/io/java-io-basic-code-outputstream',
                        '/md/java/io/java-io-basic-usage',
                        '/md/java/io/java-io-model',
                        '/md/java/io/java-io-bio',
                        '/md/java/io/java-io-nio',
                        '/md/java/io/java-io-nio-select-epoll',
                        '/md/java/io/java-io-aio',
                        '/md/java/io/java-io-nio-netty',
                        '/md/java/io/java-io-nio-zerocopy',
                    ]
                },
                {
                    title: 'Java8 特性详解',
                    collapsable: false,
                    children: [
                        '/md/java/java8/java8',
                        '/md/java/java8/java8-stream',
                        '/md/java/java8/java8-optional',
                        '/md/java/java8/java8-default',
                        '/md/java/java8/java8-type-anno',
                        '/md/java/java8/java8-anno-repeat',
                        '/md/java/java8/java8-type',
                        '/md/java/java8/java8-jre',
                        '/md/java/java8/java8-permgen',
                        '/md/java/java8/java8-stampedlock',
                        '/md/java/java8/java8-localdatetime',
                        '/md/java/java8/java8-javafx',
                        '/md/java/java8/java8-others',
                    ]
                },
                {
                    title: 'Java8 以上特性概述',
                    collapsable: false,
                    children: [
                        '/md/java/java8up/java-8-up-overview',
                    ]
                },
                {
                    title: 'JVM相关',
                    collapsable: false,
                    children: [
                        '/md/java/jvm/java-jvm-x-overview',
                        '/md/java/jvm/java-jvm-class',
                        '/md/java/jvm/java-jvm-class-enhancer',
                        '/md/java/jvm/java-jvm-classload',
                        '/md/java/jvm/java-jvm-struct',
                        '/md/java/jvm/java-jvm-x-introduce',
                        '/md/java/jvm/java-jvm-jmm',
                        '/md/java/jvm/java-jvm-gc',
                        '/md/java/jvm/java-jvm-gc-g1',
                        '/md/java/jvm/java-jvm-gc-zgc',
                        '/md/java/jvm/java-jvm-cms-gc',
                        '/md/java/jvm/java-jvm-param',
                        '/md/java/jvm/java-jvm-oom',
                        '/md/java/jvm/java-jvm-oom-offheap',
                        '/md/java/jvm/java-jvm-thread-dump',
                        '/md/java/jvm/java-jvm-debug-tools-linux',
                        '/md/java/jvm/java-jvm-debug-tools-list',
                        '/md/java/jvm/java-jvm-oom-tool',
                        '/md/java/jvm/java-jvm-agent-arthas',
                        '/md/java/jvm/java-jvm-debug-idea',
                        '/md/java/jvm/java-jvm-agent-usage',
                    ]
                },
            ],
            '/md/db/': [
                {
                    title: '数据库基础和原理',
                    collapsable: false,
                    children: [
                        '/md/db/alg-basic-overview'
                    ]
                }
            ],
            '/md/db/mp/':[
                {
                    title: 'mybatis-plus入门',
                    collapsable: false,
                    children: [
                        '/md/db/mp/mp-base-overview',
                        '/md/db/mp/mp-generator-new'
                    ]
                }
            ]
        }

    },
    plugins: [
        [
            '@vuepress-reco/vuepress-plugin-kan-ban-niang', {
            theme: [
                'miku', 'whiteCat', 'haru1', 'haru2', 'haruto', 'koharu', 'izumi', 'shizuku', 'wanko', 'blackCat', 'z16'
            ],
            clean: false,
            messages: {
                welcome: '欢迎来到我的博客',
                home: '心里的花，我想要带你回家。',
                theme: '好吧，希望你能喜欢我的其他小伙伴。',
                close: '你不喜欢我了吗？痴痴地望着你。'
            },
            messageStyle: {right: '68px', bottom: '290px'},
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
        ['@vuepress/medium-zoom'], // 图片放大
        ['@vuepress/last-updated'],
        ["sakura", {//页面樱花插件
            num: 30, // 默认数量
            show: true,
            zIndex: 2,
            img: {
                replace: false, // false 默认图 true 换图 需要填写httpUrl地址
                httpUrl: [
                    'http://www.zpzpup.com/assets/image/sakura.png'
                ] // 绝对路径
            }
        }],
        ['@vssue/vuepress-plugin-vssue', {
            platform: 'github',
            owner: 'xianglong123',
            repo: 'cas-blog-comment',
            clientId: '66f3d4d16971e6f68e8a',
            clientSecret: '139f86b03693f2a6fd0569058b620b6d2d32e25e',
        }],
    ]
};
