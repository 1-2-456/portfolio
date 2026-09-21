/* =========================================================
 * 项目作品数据（来源：profile.md 项目经历）
 * ---------------------------------------------------------
 * 新增项目：直接在 PROJECTS 数组中追加一个对象即可，
 * 分类筛选按钮会根据 category 字段自动生成。
 * category 取值：'algo'      -> 大数据算法分析
 *                'behavior'  -> 用户行为挖掘
 *                'modeling'  -> 数据建模
 *                'aidev'     -> AI辅助开发
 * 说明：time（完成时间）与 scale（数据规模）、tags（类别标签）为可选字段，
 *       暂无数据时不填即可，卡片会自动省略对应展示位。
 * ======================================================= */

const CATEGORY_LABELS = {
  all: '全部',
  algo: '大数据算法分析',
  behavior: '用户行为挖掘',
  modeling: '数据建模',
  aidev: 'AI辅助开发'
};

const PROJECTS = [
  {
    id: 'user-behavior-recommend',
    name: '基于Python的用户行为分析与个性化推荐',
    category: 'behavior',
    tags: ['AI应用', '数据分析'],
    time: '',
    background:
      '针对平台用户活跃度低、内容匹配精准度不足的痛点，搭建全链路用户行为分析体系，构建个性化推荐模型，实现用户需求与内容的精准匹配。',
    tech: ['Python', 'Pandas', 'NumPy', '协同过滤算法', 'Navicat Premium', 'MySQL'],
    scale: '百万级用户行为日志',
    metrics: [
      { value: '18%', label: '用户内容点击率提升' },
      { value: '12%', label: '次日留存率提升' }
    ],
    results: [
      '完成百万级行为日志的清洗、去重、缺失值处理与特征提取，构建标准化用户行为特征数据集',
      '基于协同过滤算法搭建个性化推荐模型，完成用户偏好度计算、内容相似度打分与推荐结果排序',
      '通过 Navicat Premium 管理用户特征数据库，设计并优化行为表结构与索引，提升多维度数据查询效率'
    ],
    image:
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=user%20behavior%20analysis%20and%20recommendation%20engine%20dashboard%2C%20glowing%20user%20network%20nodes%2C%20collaborative%20filtering%20similarity%20matrix%20heatmap%2C%20dark%20tech%20style%2C%20cyan%20blue%20gradient&image_size=landscape_16_9'
  },
  {
    id: 'demand-forecast',
    name: '大数据用户需求预测与服务流程优化',
    category: 'algo',
    tags: ['智能预测', '数据分析'],
    time: '',
    background:
      '面向业务服务响应滞后、资源调度匹配度低的问题，通过大数据算法预测用户需求趋势，反向驱动服务流程优化与资源动态配置。',
    tech: ['VMware Workstation', 'Python', '时序预测算法', '回归分析', 'SQL'],
    scale: '多源业务数据整合与统一治理',
    metrics: [
      { value: '85%+', label: '用户需求预测准确率' },
      { value: '22%', label: '服务平均响应时长缩短' },
      { value: '15%', label: '资源闲置率下降' }
    ],
    results: [
      '基于 VMware Workstation 搭建分布式数据分析环境，完成多源业务数据的整合、同步与统一治理',
      '运用时序预测与回归分析算法构建用户需求预测模型，输出周期级需求规模预判与波动趋势',
      '结合预测结果定位服务流程瓶颈，输出流程优化方案，调整资源分配策略与调度机制'
    ],
    image:
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=time%20series%20forecasting%20dashboard%2C%20glowing%20prediction%20trend%20curves%20and%20seasonal%20patterns%2C%20distributed%20cluster%20environment%2C%20dark%20analytics%20UI%2C%20cyan%20accent&image_size=landscape_16_9'
  },
  {
    id: 'user-profile-modeling',
    name: '用户画像构建与服务效率提升数据建模',
    category: 'modeling',
    tags: ['用户画像', '数据可视化'],
    time: '',
    background:
      '解决用户分层粗放、服务针对性不足的问题，构建多维度用户画像模型，为精细化运营与服务升级提供数据支撑。',
    tech: ['Python', 'K-Means聚类算法', 'SQL', 'Excel', 'PowerPoint'],
    scale: '用户属性、行为、消费多维度指标数据',
    metrics: [
      { value: '5大类', label: '核心用户画像构建' },
      { value: '25%', label: '用户分层精准度提升' },
      { value: '20%', label: '服务人效提升' },
      { value: '10%', label: '服务投诉率下降' }
    ],
    results: [
      '梳理用户属性、行为、消费等核心维度指标体系，通过 Python 完成指标计算、特征工程与数据建模',
      '基于 K-Means 聚类算法实现用户分层，输出不同类型用户群体的特征标签与行为画像',
      '使用 Excel 完成数据校验与多维度透视分析，通过 PowerPoint 输出用户画像分析报告，支撑服务策略迭代'
    ],
    image:
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=customer%20segmentation%20clustering%20visualization%2C%20glowing%20k-means%20scatter%20clusters%2C%20user%20persona%20profile%20cards%2C%20dark%20tech%20dashboard%2C%20cyan%20blue&image_size=landscape_16_9'
  }
];
