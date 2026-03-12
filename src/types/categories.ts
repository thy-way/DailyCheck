import { Category, Task } from './index';

export const DEFAULT_CATEGORIES: Category[] = [
  {
    id: 'fitness',
    name: '健身',
    icon: 'Dumbbell',
    color: '#ef4444',
    gradient: 'from-red-500 to-rose-600',
    enabled: true,
  },
  {
    id: 'coding',
    name: '编程学习',
    icon: 'Code',
    color: '#3b82f6',
    gradient: 'from-blue-500 to-indigo-600',
    enabled: true,
  },
  {
    id: 'english',
    name: '英语',
    icon: 'Globe',
    color: '#22c55e',
    gradient: 'from-green-500 to-emerald-600',
    enabled: true,
  },
  {
    id: 'side',
    name: '副业',
    icon: 'Briefcase',
    color: '#f59e0b',
    gradient: 'from-amber-500 to-orange-600',
    enabled: true,
  },
];

export const DEFAULT_TASKS: Task[] = [
  // ========== 健身模块 ==========
  {
    id: 'fitness-strength',
    categoryId: 'fitness',
    name: '力量训练',
    icon: 'Dumbbell',
    unit: '分钟',
    defaultDuration: 60,
    enabled: true,
    order: 1,
    description: '胸、背、腿、肩、手臂等大肌群训练',
    learningRoute: [
      '周一：胸部 - 卧推、哑铃飞鸟、俯卧撑',
      '周二：背部 - 引体向上、划船、硬拉',
      '周三：腿部 - 深蹲、硬拉、腿举',
      '周四：休息',
      '周五：肩部 - 推举、侧平举、俯身侧平举',
      '周六：手臂 - 二头弯举、三头下压',
      '周日：休息'
    ],
    resources: [
      { name: '胸部动作演示', url: 'https://www.musclewiki.com/male/chest' },
      { name: '背部动作演示', url: 'https://www.musclewiki.com/male/back' },
      { name: '腿部动作演示', url: 'https://www.musclewiki.com/male/legs' },
      { name: '肩部动作演示', url: 'https://www.musclewiki.com/male/shoulders' },
      { name: 'Jeff Nippard', url: 'https://www.youtube.com/@JeffNippard' },
      { name: '5x5 训练计划', url: 'https://stronglifts.com/5x5/' }
    ]
  },
  {
    id: 'fitness-cardio',
    categoryId: 'fitness',
    name: '有氧运动',
    icon: 'Heart',
    unit: '分钟',
    defaultDuration: 30,
    enabled: true,
    order: 2,
    description: '跑步、骑行、游泳、跳绳、HIIT',
    learningRoute: [
      '周一：晨间跑步 5KM',
      '周二：HIIT 20分钟',
      '周三：骑行 30分钟',
      '周四：休息',
      '周五：跳绳 15分钟',
      '周六：游泳/椭圆机 40分钟',
      '周日：LISS 慢跑 30分钟'
    ],
    resources: [
      { name: 'HIIT 训练演示', url: 'https://www.youtube.com/watch?v=ml6cT4AZdqI' },
      { name: '跑步教程', url: 'https://www.youtube.com/watch?v=2L2lnxIcN3E' },
      { name: 'Nike Training', url: 'https://www.nike.com/nt/training' },
      { name: 'Keep 跑步', url: 'https://www.gotokeep.com' }
    ]
  },
  {
    id: 'fitness-core',
    categoryId: 'fitness',
    name: '核心训练',
    icon: 'Activity',
    unit: '分钟',
    defaultDuration: 20,
    enabled: true,
    order: 3,
    description: '腹肌、腹斜肌、下背部、髋部肌群',
    learningRoute: [
      '平板支撑 3组×60秒',
      '卷腹 4组×15次',
      '俄罗斯转体 4组×20次',
      '登山者 3组×30秒',
      '死虫式 3组×12次/侧',
      '悬垂举腿 3组×10次'
    ],
    resources: [
      { name: '核心训练演示', url: 'https://www.musclewiki.com/male/abs' },
      { name: 'Athlean-X 核心', url: 'https://www.youtube.com/@ATHLEANX' },
      { name: '腹肌训练指南', url: 'https://www.verywellfit.com/core-exercises' }
    ]
  },
  {
    id: 'fitness-stretch',
    categoryId: 'fitness',
    name: '拉伸/瑜伽',
    icon: 'Sparkles',
    unit: '分钟',
    defaultDuration: 15,
    enabled: true,
    order: 4,
    description: '训练后拉伸、柔韧性练习、瑜伽',
    learningRoute: [
      '训练后静态拉伸 10-15分钟',
      '周一：胸肩拉伸 - 胸部、肩部',
      '周三：背髋拉伸 - 背部、髋屈肌',
      '周五：腿部拉伸 - 股四头肌、腘绳肌',
      '周六：全身瑜伽 30分钟',
      '周日：放松冥想 15分钟'
    ],
    resources: [
      { name: '全身拉伸演示', url: 'https://www.youtube.com/watch?v=x1iS5qkQ4jI' },
      { name: '瑜伽教程', url: 'https://www.youtube.com/user/yogawithadriene' },
      { name: 'Keep 瑜伽', url: 'https://www.gotokeep.com/exercises/yoga' }
    ]
  },

  // ========== 编程学习模块 - 学习 ==========
  {
    id: 'coding-learning',
    categoryId: 'coding',
    name: '📚 学习路线',
    icon: 'BookOpen',
    unit: '分钟',
    defaultDuration: 120,
    enabled: true,
    order: 1,
    group: '学习',
    groupOrder: 1,
    description: '系统学习路线，点击查看各语言详细计划',
    learningRoute: [
      '🟣 Java 后端 - Spring Boot 微服务',
      '🟢 Go 后端 - 云原生开发',
      '🔵 Python 全栈 - AI/数据科学',
      '🔴 C++ 开发 - 底层系统',
      '🟡 前端/全栈 - React + Node.js',
      '⚫ 算法刷题 - LeetCode',
      '📖 技术书籍 - 源码阅读'
    ],
    resources: [
      { name: 'Java Guide', url: 'https://javaguide.cn' },
      { name: 'Go 语言圣经', url: 'https://book.go-zh.org/' },
      { name: 'Python 官方文档', url: 'https://docs.python.org/3/' },
      { name: '代码随想录', url: 'https://programmercarl.com' }
    ]
  },

  // ========== 编程学习 - Java ==========
  {
    id: 'coding-java',
    categoryId: 'coding',
    name: 'Java 后端',
    icon: 'Coffee',
    unit: '分钟',
    defaultDuration: 60,
    enabled: true,
    order: 10,
    group: '学习',
    groupOrder: 10,
    description: 'Java、Spring Boot、微服务架构',
    learningRoute: [
      'Week 1-2: Java 核心基础强化',
      '  • 集合源码：ArrayList/HashMap/LinkedList',
      '  • 并发编程：Thread/Executor/CompletableFuture',
      '  • JVM 原理：内存模型、GC、类加载',
      '',
      'Week 3-4: Spring Boot 入门',
      '  • IoC/AOP 原理与源码',
      '  • Spring MVC 请求处理流程',
      '  • MyBatis Plus 数据库操作',
      '',
      'Week 5-6: Spring Cloud 微服务',
      '  • Nacos 服务注册与配置中心',
      '  • Feign/Ribbon 负载均衡',
      '  • Sentinel 熔断限流',
      '',
      'Week 7-8: 项目实战 - 博客系统',
      '  • MySQL/Redis 数据库设计',
      '  • ElasticSearch 全文检索',
      '  • Docker Compose 部署'
    ],
    resources: [
      { name: 'Spring Boot 官方文档', url: 'https://spring.io/projects/spring-boot' },
      { name: 'Java Guide', url: 'https://javaguide.cn' },
      { name: '尚硅谷 Java 教程', url: 'https://www.bilibili.com/video/BV1Kb411W7MN' },
      { name: 'MySQL 教程', url: 'https://www.bilibili.com/video/BV1Kr4y1i7ru' }
    ]
  },

  // ========== 编程学习 - Go ==========
  {
    id: 'coding-go',
    categoryId: 'coding',
    name: 'Go 后端',
    icon: 'Box',
    unit: '分钟',
    defaultDuration: 45,
    enabled: true,
    order: 20,
    group: '学习',
    groupOrder: 20,
    description: 'Go、Gin、gRPC、云原生开发',
    learningRoute: [
      'Week 1-2: Go 基础语法',
      '  • 基础数据类型与结构体',
      '  • 接口与反射机制',
      '  • 并发编程：Goroutine/Channel',
      '',
      'Week 3-4: Gin 框架入门',
      '  • RESTful API 设计',
      '  • 中间件与拦截器',
      '  • GORM 数据库操作',
      '',
      'Week 5-6: gRPC 与微服务',
      '  • Protobuf 协议',
      '  • gRPC 服务编写',
      '  • 微服务通信与治理',
      '',
      'Week 7-8: Docker/K8s 基础',
      '  • Docker 镜像构建',
      '  • Kubernetes 部署',
      '  • CI/CD 流水线'
    ],
    resources: [
      { name: 'Go 官方文档', url: 'https://go.dev/doc' },
      { name: 'Gin 框架', url: 'https://gin-gonic.com' },
      { name: 'Go 语言圣经', url: 'https://book.go-zh.org/' },
      { name: 'Docker 教程', url: 'https://www.docker.com/get-started' }
    ]
  },

  // ========== 编程学习 - Python ==========
  {
    id: 'coding-python',
    categoryId: 'coding',
    name: 'Python 全栈',
    icon: 'Terminal',
    unit: '分钟',
    defaultDuration: 45,
    enabled: true,
    order: 30,
    group: '学习',
    groupOrder: 30,
    description: 'Python、Web开发、数据分析、AI/ML',
    learningRoute: [
      'Week 1-2: Python 基础与语法',
      '  • 基础语法与数据结构',
      '  • 装饰器/生成器/迭代器',
      '  • 面向对象与模块化',
      '',
      'Week 3-4: Django/Flask Web 开发',
      '  • Flask 入门：路由/模板/蓝图',
      '  • Django 进阶：ORM/Admin/中间件',
      '  • RESTful API：FastAPI/DRF',
      '',
      'Week 5-6: 数据分析 Pandas/NumPy',
      '  • 数据清洗与预处理',
      '  • 数据可视化 Matplotlib/Seaborn',
      '  • 统计分析与特征工程',
      '',
      'Week 7-8: 机器学习入门 Scikit-learn',
      '  • 监督学习：分类/回归',
      '  • 无监督学习：聚类/降维',
      '  • 模型评估与调参'
    ],
    resources: [
      { name: 'Python 官方文档', url: 'https://docs.python.org/3/' },
      { name: 'Django 文档', url: 'https://www.djangoproject.com' },
      { name: 'Kaggle 入门', url: 'https://www.kaggle.com/learn' },
      { name: 'Python Cookbook', url: 'https://book.douban.com/subject/4824710' }
    ]
  },

  // ========== 编程学习 - C++ ==========
  {
    id: 'coding-cpp',
    categoryId: 'coding',
    name: 'C++ 开发',
    icon: 'FileCode',
    unit: '分钟',
    defaultDuration: 60,
    enabled: true,
    order: 40,
    group: '学习',
    groupOrder: 40,
    description: 'C++、STL、算法竞赛、底层开发',
    learningRoute: [
      'Week 1-2: C++ 基础与面向对象',
      '  • 语法基础与内存管理',
      '  • 类与继承、多态',
      '  • 模板与泛型编程',
      '',
      'Week 3-4: STL 容器与算法源码',
      '  • vector/list/deque 源码分析',
      '  • unordered_map/set 哈希表',
      '  • 算法实现原理',
      '',
      'Week 5-6: 内存管理、智能指针',
      '  • new/delete 底层实现',
      '  • shared_ptr/unique_ptr/weak_ptr',
      '  • 内存池与 allocator',
      '',
      'Week 7-8: 并发编程、多线程',
      '  • std::thread 线程管理',
      '  • mutex/condition_variable',
      '  • 线程池实现'
    ],
    resources: [
      { name: 'C++ Primer', url: 'https://book.douban.com/subject/25708312' },
      { name: 'STL 源码剖析', url: 'https://book.douban.com/subject/1112141' },
      { name: '侯捷 C++ 视频', url: 'https://www.bilibili.com/video/BV1Kb411W7MN' },
      { name: 'C++ LeetCode', url: 'https://leetcode.cn/tag/cpp/' }
    ]
  },

  // ========== 编程学习 - 前端 ==========
  {
    id: 'coding-frontend',
    categoryId: 'coding',
    name: '前端/全栈',
    icon: 'Layout',
    unit: '分钟',
    defaultDuration: 60,
    enabled: true,
    order: 50,
    group: '学习',
    groupOrder: 50,
    description: 'React、Vue、TypeScript、Node.js 全栈',
    learningRoute: [
      'Week 1-2: TypeScript 进阶',
      '  • 类型系统与泛型',
      '  • 高级类型：交叉/联合/映射',
      '  • 类型守卫与条件类型',
      '',
      'Week 3-4: React 深入',
      '  • Hooks 源码：useState/useEffect',
      '  • 虚拟 DOM 与 Diff 算法',
      '  • 状态管理：Zustand/Redux',
      '',
      'Week 5-6: 全栈技能',
      '  • Node.js/Express/Koa',
      '  • MongoDB/Redis 数据库',
      '  • RESTful API 设计',
      '',
      'Week 7-8: 性能优化专题',
      '  • React 渲染优化',
      '  • 代码分割与懒加载',
      '  • Webpack/Vite 原理'
    ],
    resources: [
      { name: 'React 官方文档', url: 'https://react.dev' },
      { name: 'TypeScript Handbook', url: 'https://www.typescriptlang.org/docs/' },
      { name: 'MDN Web Docs', url: 'https://developer.mozilla.org' },
      { name: 'Vue 3 文档', url: 'https://vuejs.org' }
    ]
  },

  // ========== 编程学习 - 算法 ==========
  {
    id: 'coding-algorithm',
    categoryId: 'coding',
    name: '算法刷题',
    icon: 'Binary',
    unit: '题',
    defaultDuration: 45,
    enabled: true,
    order: 60,
    group: '学习',
    groupOrder: 60,
    description: 'LeetCode、牛客网算法题',
    learningRoute: [
      '第1周：数组、链表、哈希表',
      '第2周：字符串、双指针',
      '第3周：栈、队列、递归',
      '第4周：树、排序',
      '第5周：回溯、贪心',
      '第6周：动态规划',
      '每日 2-3 题，周末复盘'
    ],
    resources: [
      { name: 'LeetCode 中国站', url: 'https://leetcode.cn' },
      { name: '代码随想录', url: 'https://programmercarl.com' },
      { name: 'labuladong 算法', url: 'https://labuladong.github.io/algo' },
      { name: '剑指Offer', url: 'https://leetcode.cn/problem-library' }
    ]
  },

  // ========== 编程学习 - 书籍 ==========
  {
    id: 'coding-reading',
    categoryId: 'coding',
    name: '技术书籍',
    icon: 'BookMarked',
    unit: '页',
    defaultDuration: 30,
    enabled: true,
    order: 70,
    group: '学习',
    groupOrder: 70,
    description: '技术经典书籍、源码阅读',
    learningRoute: [
      '《JavaScript高级程序设计》',
      '《你不知道的JavaScript》',
      '《深入理解计算机系统》',
      '《代码整洁之道》',
      '《架构整洁之道》',
      '每月 1 本书，精读 + 笔记'
    ],
    resources: [
      { name: 'GitHub 电子书', url: 'https://github.com/EbookFoundation/free-programming-books' },
      { name: '极客时间', url: 'https://time.geekbang.org' },
      { name: '掘金小册', url: 'https://juejin.cn/books' }
    ]
  },

  // ========== 编程学习模块 - 项目实战 ==========
  {
    id: 'coding-projects',
    categoryId: 'coding',
    name: '🚀 项目实战',
    icon: 'Folder',
    unit: '周',
    defaultDuration: 28,
    enabled: true,
    order: 80,
    group: '项目实战',
    groupOrder: 1,
    description: '完整项目开发，按语言分类，点击查看详情',
    learningRoute: [
      '🟣 Java 项目 - 电商后台管理系统',
      '🟢 Go 项目 - 微服务电商平台',
      '🔵 Python 项目 - 数据可视化 Dashboard',
      '🟡 前端项目 - 博客系统 + AI 聊天'
    ],
    resources: [
      { name: 'GitHub Trending', url: 'https://github.com/trending' },
      { name: 'Vercel 部署', url: 'https://vercel.com' },
      { name: 'Docker Docs', url: 'https://docs.docker.com' }
    ]
  },

  // ========== 项目实战 - Java 电商后台 ==========
  {
    id: 'coding-project-java',
    categoryId: 'coding',
    name: 'Java 电商后台',
    icon: 'ShoppingCart',
    unit: '周',
    defaultDuration: 28,
    enabled: true,
    order: 90,
    group: '项目实战',
    groupOrder: 10,
    description: 'Vue3 + Spring Boot 电商后台管理系统',
    learningRoute: [
      '📋 Week1：项目初始化',
      '• 技术选型：Vue3 + Element Plus + Spring Boot',
      '• 搭建前端项目：Vite + Vue Router + Pinia',
      '• 搭建后端项目：Spring Boot + MyBatis Plus',
      '• 设计数据库：用户/商品/订单/库存表结构',
      '• 搭建开发环境：Docker MySQL + Redis',
      '',
      '📦 Week2：核心模块',
      '• 用户模块：登录注册、权限管理（RBAC）',
      '• 商品模块：SPU/SKU管理、图片上传OSS',
      '• 分类模块：树形结构、无限级分类',
      '• 库存模块：库存预警、进出库记录',
      '',
      '🛒 Week3：业务模块',
      '• 订单模块：下单流程、状态流转、支付集成',
      '• 统计模块：销售报表、趋势图、导出Excel',
      '• 通知模块：邮件/短信通知、模板消息',
      '• 搜索模块：ElasticSearch全文检索',
      '',
      '🔒 Week4：安全与部署',
      '• 接口鉴权：Spring Security + JWT',
      '• 数据脱敏：敏感信息加密存储',
      '• 日志审计：记录操作日志',
      '• 性能优化：数据库索引、懒加载',
      '• 部署：Docker Compose一键部署'
    ],
    resources: [
      { name: 'Vue 3 文档', url: 'https://vuejs.org' },
      { name: 'Spring Boot', url: 'https://spring.io/projects/spring-boot' },
      { name: 'Element Plus', url: 'https://element-plus.org' }
    ]
  },

  // ========== 项目实战 - Go 微服务 ==========
  {
    id: 'coding-project-go',
    categoryId: 'coding',
    name: 'Go 微服务',
    icon: 'Server',
    unit: '周',
    defaultDuration: 28,
    enabled: true,
    order: 100,
    group: '项目实战',
    groupOrder: 20,
    description: 'Go + gRPC 微服务电商平台',
    learningRoute: [
      '📋 Week1：架构设计',
      '• 微服务架构理论：康威定律、拆分原则',
      '• 技术选型：Go + gRPC + Protobuf',
      '• 服务注册与发现：Nacos/Consul',
      '• 链路追踪：Jaeger',
      '',
      '📦 Week2：用户服务',
      '• 用户注册/登录/鉴权',
      '• JWT/OAuth2 认证',
      '• 分布式 Session',
      '• 权限控制：RBAC',
      '',
      '🛒 Week3：商品服务',
      '• 商品 CRUD 接口',
      '• 分类管理：树形结构',
      '• 库存管理：分布式锁',
      '• 搜索服务：ES 集成',
      '',
      '📦 Week4：订单服务',
      '• 分布式事务：Seata',
      '• 订单创建/取消/支付',
      '• 消息队列：RabbitMQ/Kafka',
      '• 定时任务：优惠券/库存',
      '',
      '🚀 Week5-6：部署运维',
      '• Docker Compose 编排',
      '• Kubernetes 部署',
      '• CI/CD 流水线',
      '• 监控告警：Prometheus + Grafana'
    ],
    resources: [
      { name: 'Go 官方文档', url: 'https://go.dev/doc' },
      { name: 'gRPC 文档', url: 'https://grpc.io/docs' },
      { name: 'Docker', url: 'https://www.docker.com' }
    ]
  },

  // ========== 项目实战 - Python 数据可视化 ==========
  {
    id: 'coding-project-python',
    categoryId: 'coding',
    name: 'Python 数据可视化',
    icon: 'BarChart',
    unit: '周',
    defaultDuration: 28,
    enabled: true,
    order: 110,
    group: '项目实战',
    groupOrder: 30,
    description: 'ECharts + Flask 数据可视化 Dashboard',
    learningRoute: [
      '📊 Week1：数据采集',
      '• 明确数据源：数据库/API/爬虫',
      '• 设计数据仓库：维度表、事实表',
      '• 搭建ETL流程：数据抽取→清洗→加载',
      '• 定时任务：使用Cron或Airflow',
      '• 数据校验：异常值检测与告警',
      '',
      '📈 Week2：可视化开发',
      '• 选择可视化库：ECharts/AntV/G2',
      '• 核心图表：折线图、柱状图、饼图、地图',
      '• 仪表盘布局：Grid布局、自适应尺寸',
      '• 主题配置：暗色模式、数据钻取',
      '• 交互功能：筛选、排序、导出',
      '',
      '🎛️ Week3：交互开发',
      '• 时间筛选：快捷选项、自定义范围',
      '• 多维度切换：省市区、年龄段、时间维度',
      '• 下钻分析：点击图表查看明细',
      '• 权限控制：不同角色看到不同数据',
      '• 定时刷新：实时数据看板',
      '',
      '☁️ Week4：部署运维',
      '• 后端服务：Python Flask/FastAPI',
      '• 数据库：PostgreSQL + TimescaleDB',
      '• 缓存层：Redis缓存热点数据',
      '• 部署：Docker + Nginx',
      '• 监控：Grafana + Prometheus'
    ],
    resources: [
      { name: 'ECharts 示例', url: 'https://echarts.apache.org/examples' },
      { name: 'Python Flask', url: 'https://flask.palletsprojects.com' },
      { name: 'Docker Docs', url: 'https://docs.docker.com' }
    ]
  },

  // ========== 项目实战 - 前端博客系统 ==========
  {
    id: 'coding-project-blog',
    categoryId: 'coding',
    name: '前端博客系统',
    icon: 'FileText',
    unit: '周',
    defaultDuration: 21,
    enabled: true,
    order: 120,
    group: '项目实战',
    groupOrder: 40,
    description: 'Next.js + Tailwind 全栈博客项目',
    learningRoute: [
      '📋 Day1-2：需求分析与设计',
      '• 确定博客核心功能：文章列表、详情页、分类标签',
      '• 设计数据库：users表、posts表、tags表、comments表',
      '• 绘制ER图，设计API接口RESTful规范',
      '• 编写README.md技术文档',
      '',
      '🎨 Day3-4：前端开发',
      '• 初始化Next.js项目，配置Tailwind CSS',
      '• 搭建页面路由：/、/post/:id、/about',
      '• 开发组件：Header、PostCard、Article、TagList',
      '• 状态管理：使用Zustand管理文章数据',
      '• 样式美化：响应式布局，暗色模式支持',
      '',
      '⚙️ Day5-6：后端开发',
      '• 搭建Node.js/Express或Go/Gin服务',
      '• 连接MySQL/PostgreSQL数据库',
      '• 实现CRUD接口：GET/POST/PUT/DELETE',
      '• 集成JWT实现用户认证',
      '• 添加Redis缓存优化查询性能',
      '',
      '🚀 Day7：部署上线',
      '• 前端部署：Vercel或Netlify',
      '• 后端部署：Railway、Render或阿里云服务器',
      '• 域名配置与HTTPS证书',
      '• SEO优化：meta标签、结构化数据'
    ],
    resources: [
      { name: 'Next.js 文档', url: 'https://nextjs.org/docs' },
      { name: 'Tailwind CSS', url: 'https://tailwindcss.com' },
      { name: 'Vercel 部署', url: 'https://vercel.com' }
    ]
  },

  // ========== 项目实战 - AI 聊天 ==========
  {
    id: 'coding-project-ai',
    categoryId: 'coding',
    name: 'AI 聊天应用',
    icon: 'MessageCircle',
    unit: '周',
    defaultDuration: 28,
    enabled: true,
    order: 130,
    group: '项目实战',
    groupOrder: 50,
    description: 'React + OpenAI API 聊天应用',
    learningRoute: [
      '🎯 Week1：前端界面',
      '• 初始化React + TypeScript项目',
      '• 设计聊天界面：消息气泡、输入框、对话列表',
      '• 实现打字机效果，流式输出动画',
      '• 添加主题切换（浅色/深色/渐变）',
      '• 移动端适配：响应式布局',
      '',
      '🤖 Week2：API集成',
      '• 注册OpenAI账号，获取API Key',
      '• 设计后端代理：解决跨域与API安全',
      '• 流式响应：使用Server-Sent Events',
      '• 添加提示词模板：角色扮演，专业助手',
      '• 实现上下文记忆：保存最近N轮对话',
      '',
      '💾 Week3：功能完善',
      '• 用户系统：注册登录、会员订阅',
      '• 对话历史：本地存储+云端同步',
      '• 对话管理：重命名、删除、置顶',
      '• 分享功能：生成分享链接/二维码',
      '• 成本统计：API调用次数与费用',
      '',
      '⚡ Week4：优化与部署',
      '• 性能优化：首屏加载、代码分割',
      '• 用户体验：加载状态，空状态、错误处理',
      '• 数据分析：埋点统计、用户行为',
      '• 部署上线：Vercel + Railway/VPS'
    ],
    resources: [
      { name: 'OpenAI API', url: 'https://platform.openai.com/docs' },
      { name: 'React 文档', url: 'https://react.dev' },
      { name: 'Vercel 部署', url: 'https://vercel.com' }
    ]
  },

  {
    id: 'english-vocabulary',
    categoryId: 'english',
    name: '背单词',
    icon: 'BookMarked',
    unit: '个',
    defaultDuration: 20,
    enabled: true,
    order: 1,
    description: '每日词汇积累，雅思/托福核心词',
    learningRoute: [
      '每日新词 20-30个',
      '复习旧词 50-100个（艾宾浩斯曲线）',
      '周六：本周词汇总复习',
      '周日：月度词汇测试',
      '重点：高频词汇、词根词缀'
    ],
    resources: [
      { name: '不背单词', url: 'https://www.bubei.cn' },
      { name: '墨墨背单词', url: 'https://www.maimemo.com' },
      { name: '雅思词汇真经', url: 'https://book.douban.com/subject/35112225' }
    ]
  },
  {
    id: 'english-listening',
    categoryId: 'english',
    name: '听力练习',
    icon: 'Headphones',
    unit: '分钟',
    defaultDuration: 30,
    enabled: true,
    order: 2,
    description: '雅思听力、BBC、TED、播客',
    learningRoute: [
      '周一、三：雅思听力真题练习',
      '周二、四：BBC Learning English',
      '周五：TED演讲精听',
      '周六：美剧片段听写',
      '周日：本周听力材料复盘'
    ],
    resources: [
      { name: '雅思哥', url: 'https://www.yasige.com' },
      { name: 'BBC Learning English', url: 'https://www.bbc.co.uk/learningenglish' },
      { name: 'TED Talks', url: 'https://www.ted.com/talks' },
      { name: 'ESLPod', url: 'https://www.eslpod.com' }
    ]
  },
  {
    id: 'english-speaking',
    categoryId: 'english',
    name: '口语练习',
    icon: 'Mic',
    unit: '分钟',
    defaultDuration: 20,
    enabled: true,
    order: 3,
    description: '雅思口语、影子跟读、对话练习',
    learningRoute: [
      'Day 1-2：Part 1 日常话题',
      'Day 3-4：Part 2 卡片题（1-2分钟）',
      'Day 5-6：Part 3 讨论题',
      '每日影子跟读 10分钟',
      '语言伙伴练习 30分钟/周'
    ],
    resources: [
      { name: 'Cambly 外教', url: 'https://www.cambly.com' },
      { name: '口语侠', url: 'https://www.kouyuxia.com' },
      { name: 'YouGlish', url: 'https://youglish.com' },
      { name: '雅思口语题库', url: 'https://www.yasi123.com' }
    ]
  },
  {
    id: 'english-reading',
    categoryId: 'english',
    name: '阅读理解',
    icon: 'Newspaper',
    unit: '篇',
    defaultDuration: 20,
    enabled: true,
    order: 4,
    description: '雅思阅读、英文外刊、新闻',
    learningRoute: [
      '每日 1 篇雅思阅读真题',
      '精读：定位词、同义词替换',
      '周六：The Economist / 卫报',
      '周日：本周阅读词汇整理',
      '阅读速度目标：18分钟/篇'
    ],
    resources: [
      { name: 'The Economist', url: 'https://www.economist.com' },
      { name: 'BBC News', url: 'https://www.bbc.com/news' },
      { name: '扇贝阅读', url: 'https://www.shanbay.com/read' }
    ]
  },
  {
    id: 'english-writing',
    categoryId: 'english',
    name: '写作练习',
    icon: 'PenTool',
    unit: '篇',
    defaultDuration: 20,
    enabled: true,
    order: 5,
    description: '雅思写作、大作文、小作文',
    learningRoute: [
      '周一：小作文（图表描述）',
      '周三：大作文（议论文）',
      '周五：Task Response 练习',
      '周六：万能论点整理',
      '周日：作文批改与复盘',
      '目标：每周 2 篇完整作文'
    ],
    resources: [
      { name: 'Simon 雅思', url: 'https://ielts-simon.com' },
      { name: 'Grammarly', url: 'https://www.grammarly.com' },
      { name: '雅思写作真经', url: 'https://book.douban.com/subject/27169130' }
    ]
  },

  // ========== 副业模块 ==========
  {
    id: 'side-content',
    categoryId: 'side',
    name: '自媒体内容',
    icon: 'Video',
    unit: '分钟',
    defaultDuration: 60,
    enabled: true,
    order: 1,
    description: '短视频、公众号、博客内容产出',
    learningRoute: [
      '定位：技术/职场/学习分享',
      '内容规划：选题库建立',
      '制作：脚本 → 录制/写作 → 编辑',
      '发布：公众号/知乎/B站/小红书',
      '数据分析：阅读/播放/互动率',
      '每周至少 2-3 篇内容'
    ],
    resources: [
      { name: '剪映', url: 'https://www.capcut.com' },
      { name: 'Canva', url: 'https://www.canva.com' },
      { name: '新榜', url: 'https://www.newrank.cn' },
      { name: 'B站创作中心', url: 'https://member.bilibili.com' }
    ]
  },
  {
    id: 'side-product',
    categoryId: 'side',
    name: '产品开发',
    icon: 'Rocket',
    unit: '分钟',
    defaultDuration: 60,
    enabled: true,
    order: 2,
    description: 'SaaS工具、Chrome插件、付费模板',
    learningRoute: [
      '需求调研：目标用户痛点',
      'MVP 设计：核心功能确定',
      '开发迭代：2周完成MVP',
      '上线推广：Product Hunt',
      '变现：订阅/一次性付费',
      '案例：小红书模板、Notion模板'
    ],
    resources: [
      { name: 'Product Hunt', url: 'https://www.producthunt.com' },
      { name: 'Gumroad', url: 'https://gumroad.com' },
      { name: 'Lemon Squeezy', url: 'https://lemonsqueezy.com' },
      { name: 'Indie Hackers', url: 'https://www.indiehackers.com' }
    ]
  },
  {
    id: 'side-freelance',
    categoryId: 'side',
    name: '技能接单',
    icon: 'Users',
    unit: '单',
    defaultDuration: 30,
    enabled: true,
    order: 3,
    description: '自由职业、外包项目、技术咨询',
    learningRoute: [
      '技能包：前端开发/技术咨询',
      '平台：Upwork/Fiverr/猪八戒',
      '简历：作品集展示',
      '定价：时薪 $30-100',
      '客户维护：长期合作',
      '目标：每月 2-3 单'
    ],
    resources: [
      { name: 'Upwork', url: 'https://www.upwork.com' },
      { name: 'Toptal', url: 'https://www.toptal.com' },
      { name: '电鸭社区', url: 'https://eleduck.com' },
      { name: '程序员客栈', url: 'https://www.proginn.com' }
    ]
  },
  {
    id: 'side-learning',
    categoryId: 'side',
    name: '副业技能',
    icon: 'GraduationCap',
    unit: '分钟',
    defaultDuration: 30,
    enabled: true,
    order: 4,
    description: '短视频制作、运营、变现知识',
    learningRoute: [
      'Week 1-2：短视频剪辑技能',
      'Week 3-4：私域运营',
      'Week 5-6：自媒体变现模式',
      'Week 7-8：案例拆解',
      '持续关注：行业最新玩法'
    ],
    resources: [
      { name: '生财有术', url: 'https://www.shengcaiyouhu.com' },
      { name: '私域流量课', url: 'https://www.siyuyunying.com' },
      { name: '短视频运营', url: 'https://www.douyin.com' }
    ]
  },
  {
    id: 'side-research',
    categoryId: 'side',
    name: '市场调研',
    icon: 'Search',
    unit: '分钟',
    defaultDuration: 20,
    enabled: true,
    order: 5,
    description: '行业分析、竞品调研、用户访谈',
    learningRoute: [
      '每周：1 个细分赛道调研',
      '竞品分析：功能/定价/用户评价',
      '用户调研：问卷/访谈',
      '机会评估：市场规模/痛点',
      '形成：调研报告'
    ],
    resources: [
      { name: '艾瑞咨询', url: 'https://www.iresearch.com.cn' },
      { name: 'QuestMobile', url: 'https://www.questmobile.com.cn' },
      { name: '七麦数据', url: 'https://www.qimai.cn' },
      { name: 'SimilarWeb', url: 'https://www.similarweb.com' }
    ]
  },
];