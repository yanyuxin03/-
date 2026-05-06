const img1 = "images/icons/profile1.png";
const img2 = "images/icons/profile2.png";
const img3 = "images/icons/profile3.png";
const img4 = "images/icons/profile4.png";

const cover1 = "images/鸭嘴钳.png";
const cover2 = "images/荆楚古邑.jpg";
const cover3 = "images/入画入梦.jpeg";
const cover4 = "images/校园系列.png";
const cover5 = "images/世界自闭症日.png";
const cover6 = "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=800&q=80"; 
const cover7 = "images/陈国恩学长.png";
const cover8 = "images/摘一颗春天的诗.png";

export const DATA = {
  name: "颜雨欣",
  title: "媒体策划 | 深度报道 | 内容运营",
  university: "湖南大学 · 新闻学",
  contact: {
    phone: "18976175557",
    email: "yanyuxin03@126.com",
    location: "海南省海口市",
    birth: "2003.10"
  },
  images: [
    img1,
    img2,
    img3,
    img4
  ],
  skills: [
    "PS", "剪映", "Canva", "木疙瘩H5", "Python(数据挖掘)", "八爪鱼采集", "词云图制作"
  ],
  awards: [
    "湖南大学2025届本科优秀毕业论文",
    "第六届新闻奖通讯类一等奖",
    "第七届大学生网络文化节网络创新类二等奖"
  ],
  worldImages: [],
  experiences: {
    campus: [
      {
        company: "湖南大学校团委宣传部",
        role: "记者、编辑",
        time: "2021.10 - 2023.09",
        icon: "images/icons/湖南大学校团委.png",
        details: [
          "参与湖南大学校团委所属公众号“湖大青年”的推文宣传策划、文案撰写与图文设计等相关宣传工作。",
          "内容创作与宣发：任职期间结合校园活动、校园热点事件策划撰写推文涵盖校园通讯、人物深度、新媒体短讯等多种类型稿件，所策划并撰写推文共计16篇，累计阅读量超5w+。其中作为负责人策划与采写的作品《陪伴是最“长琦”的告白》获湖南大学第六届新闻奖通讯类一等奖、《陈国恩学长与令人心动的湖大》获湖南大学第七届大学生网络文化节网络创新类二等奖。",
          "节目策划与执行：作为导演组成员参与校园自制综艺《在湖大，遇见你》节目的策划筹备，环节设计、嘉宾选角与对接、现场录制执行，协调摄制组、嘉宾等多方资源，及时解决项目突发问题，保障内容落地与宣发效率。节目在bilibili、小红书等各大社交平台获得高曝光，其中在bilibili平台总浏览量达27w+。"
        ]
      },
      {
        company: "长沙天符宫遗产价值口述史研究",
        role: "遗产价值挖掘组核心成员",
        time: "2023.06 - 2024.07",
        icon: "images/icons/长沙天符宫.png",
        details: [
          "项目调研与资料整合：参与前期的文献收集研究，总结出超6万字文献线索。同时参与相关人物的口述史访谈与资料整理工作，收集到超10万字访谈材料，为该文物的修复设计工作提供重要史料参考。该项目获市级文保部门的高度关注，在本项目组的史料支持下，有关部门已将长沙天符宫升为市级文保单位。",
          "成果产出：据该项目研究成果，本人以第三作者身份所撰写的学术论文《口述史方法在低级别文物遗产价值建构中的应用——以长沙天符宫的保护与研究为例》已入选“2024年第七届中国建筑口述史学术研讨会”。"
        ]
      }
    ],
    internship: [
      {
        company: "湖南日报社",
        role: "文旅体频道实习记者",
        time: "2023.06 - 2023.08",
        icon: "images/icons/湖南日报.png",
        details: [
          "参与湖南日报及新湖南客户端日常新闻报道的采写拍摄，协助进行专题报道的策划、资料整理与采访工作。",
          "实习期间参与湖南日报推出的“走读湖湘书院”“文学里的村庄”等专题报道的采写工作，其中参与报道的封面文章《千年书院，其命惟新》在新湖南客户端获得36w+阅读量。",
          "实习期间于湖南日报发布独立署名文章《荆楚古邑的千年斯文》《入画入梦见情深》，单篇阅读量均超10w+。"
        ]
      },
      {
        company: "芒果TV",
        role: "大会员中心会员权益运营实习生",
        time: "2025.01 - 2025.04",
        icon: "images/icons/芒果TV.png",
        details: [
          "研策追踪：完成AI 角色包、亲密会员等新项目竞品调研，收集行业动态与用户反馈，提炼差异化运营方向并提供策略支撑;对接权益商品品牌方，完成信息整理、页面撰写与平台上架，同步收集商品曝光数据。",
          "生态运营：进行会员黑产筛查取证，整理违规数据与证据并同步公司法务部，维护会员生态;对多档综艺线下录制的会员观众进行资格评估与现场对接，协调多方资源保障线下会员权益落地。"
        ]
      }
    ]
  },
  projects: [
    {
      id: 1,
      title: "《让她们愤怒的，只是鸭嘴钳吗？》",
      category: "文案作品",
      image: cover1,
      desc: "深度特稿。聚焦女性妇科检查及医疗暴力，通过350份问卷与社媒数据挖掘揭示现象背后的多方困境。",
      tags: ["深度报道", "数据挖掘", "社会议题"],
      link: "https://www.kdocs.cn/l/cmvxxpdcfPZN"
    },
    {
      id: 2,
      title: "《荆楚古邑的千年斯文》",
      category: "文案作品",
      image: cover2,
      desc: "文化深度报道。发布于新湖南客户端，撰写共计16篇，累计阅读量超10w+。",
      content: `
### 作品背景
于湖南日报社实习期间，在新湖南客户端与湖南日报发布多篇独立署名文章。

### 核心内容
深度解读书院文化与地方底蕴。作为“走读湖湘书院”系列重要作品，单篇阅读量均超10w+，引发广泛社会关注。

书院是湖湘文化的缩影，每一块石碑、每一条长廊都承载着千年的斯文。通过《荆楚古邑的千年斯文》，我试图带领读者超越空间的局限，在历史的厚重感中寻找文化的根脉。
`,
      tags: ["文化采写", "爆款推文"],
      link: "https://mp.weixin.qq.com/s/eMs0SnQuXLSMOdoWoW3YnQ"
    },
    {
      id: 3,
      title: "《入画入梦见情深》",
      category: "文案作品",
      image: cover3,
      desc: "文化艺术特稿。发布于湖南日报，以细腻笔触勾勒博物馆背后的历史情怀。",
      content: `
### 作品介绍
该特稿通过实地走访与深度对谈，以“游在红楼梦境”为视角，将博物馆的数字化呈现与文化积淀完美融合。

### 社会影响
单篇阅读量超10w+，成功为传统文化的现代化转化提供了媒体叙事范本。

我在这篇特稿中探讨了数字化时代背景下，传统文化如何通过现代叙事获得“新生”。不仅是技术的堆叠，更是情感的共鸣。
`,
      tags: ["特稿", "文化宣传"],
      link: "https://m.voc.com.cn/xhn/news/202308/18512515.html"
    },
    {
      id: 4,
      title: "校园宣传系列推文",
      category: "文案作品",
      image: cover4,
      desc: "策划撰写推文16篇，累计阅读 5w+；负责《湖大青年》推文宣传与图文设计。",
      content: `
### 工作职责
作为校团委记者参与官方公众号“湖大青年”的宣传工作。负责推文策划、文案撰写与视觉设计。

### 作品概况
任职期间深入挖掘校园人物、报道重大活动，所策划推文深受校内师生喜爱，最高阅读量突破5w+。
`,
      tags: ["校园策划", "内容运营"],
      link: "#",
      articles: [
        { title: "为了这次相遇，我跨越了千百公里", link: "https://mp.weixin.qq.com/s/_0RpFiytAzkoHeO0akKCCQ" },
        { title: "他们是“湖大十佳”！", link: "https://mp.weixin.qq.com/s/A94467lUv88CUgK8zVrH3w" },
        { title: "我的“团长”我的团① | 陪伴是最“长琦”的告白", link: "https://mp.weixin.qq.com/s/mq-cXj43_W_n8YVnRqUVvA" },
        { title: "我的“团长”我的团②｜王楚晴：与青年的奇妙“化学反应”", link: "https://mp.weixin.qq.com/s/Ds4xTzVWb61l9Jp5Vf_IcQ" },
        { title: "在湖南大学23个学院读书分别是什么体验？", link: "https://mp.weixin.qq.com/s/-R-JusKx_6KyT3QXPpXYYg" },
        { title: "【唠嗑】震惊！今天我发现了永葆青春的秘密。。。", link: "https://mp.weixin.qq.com/s/renxv8XAS8vN6AY8dtEXZg" },
        { title: "今天的长沙没有哭泣", link: "https://mp.weixin.qq.com/s/v1_2kchlZE6PZRGQiEdwWw" },
        { title: "“喂？我想唱首歌给你听”", link: "https://mp.weixin.qq.com/s/a11CbRkGtYc2_vNBtSMsBA" },
        { title: "一个人就是一段历史，点击，一起见证历史", link: "https://mp.weixin.qq.com/s/5bYVYUVbKsvBrPG_6ZQhEQ" },
        { title: "湖大青年，我们等你来！", link: "https://mp.weixin.qq.com/s/slDvG-7pWx6Wv4bA-xXuMA" }
      ]
    },
    {
      id: 5,
      title: "《欣赏特殊的画展》",
      category: "视频作品",
      image: cover5,
      desc: "Vlog新闻。通过采访自闭症儿童展，呼吁社会大众共情并关注边缘群体。",
      content: `
### 视频简介
该作品在世界自闭症日节点，采用Vlog形式采访画展参观者。

### 创作初心
最终我们将填满了美好祝愿的T恤赠送给自闭症儿童康复中心，将温暖传递。希望通过视频唤起社会大众对边缘群体的共情。

视频作品在镜头外，更在于情感的流动。这些“特殊的画”，不仅仅是艺术的表达，更是孩子们连接世界的桥梁。
`,
      tags: ["Vlog新闻", "短视频策划"],
      link: "https://m.voc.com.cn/xhn/news/202404/19701862.html"
    },
    {
      id: 7,
      title: "《陈国恩学长与令人心动的湖大》",
      category: "新媒体作品",
      image: cover7,
      desc: "视觉排版设计。结合大IP联动校园文化宣传，获网络文化节二等奖。",
      content: `
### 项目概况
以知名校友为报道对象，采用图文结合的设计，以校园标志性地点为线索，唤起师生集体记忆。获湖南大学第七届大学生网络文化节二等奖。

视觉设计是内容的第二语言。通过结合《令人心动的offer》中的热门IP，我们成功打破了校园宣传的刻板印象，实现了出圈传播。
`,
      tags: ["排版设计", "IP联动"],
      link: "https://mp.weixin.qq.com/s/krdEEH67C2Yv9zZLvxWs3g"
    },
    {
      id: 8,
      title: "《摘一颗春天的诗》",
      category: "新媒体作品",
      image: cover8,
      desc: "H5动画新闻。运用AI图像生成与音频处理技术，呈现沉浸式互动体验。",
      content: `
### 技术亮点
采用H5动画、AI图像生成与音频处理技术，呈现小朋友为春天所写的诗歌。发布于红网客户端，极富生机与诗意。

AI不再是冰冷的算法，而是想象力的延伸。我们通过AI生成插图，将孩子们笔下单纯而灿烂的春天数字化，让每一首诗都能在指尖“绽放”。
`,
      tags: ["H5动画", "AI生成", "交互创意"],
      link: "https://a.u.h5mc.com/c/xrqw/uocf/index.html"
    }
  ]
};
