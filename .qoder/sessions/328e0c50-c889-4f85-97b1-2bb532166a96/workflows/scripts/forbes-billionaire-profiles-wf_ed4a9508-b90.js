export const meta = {
  name: 'forbes-billionaire-profiles',
  description: 'Research and write detailed profiles for 15 Forbes Top 50 billionaires (2013-2025)',
  phases: [
    { title: 'Research & Write Batch 1', detail: 'Musk, Bezos, Zuckerberg, Arnault, Jensen Huang' },
    { title: 'Research & Write Batch 2', detail: 'Page, Brin, Ortega, Bettencourt Meyers, Bloomberg' },
    { title: 'Research & Write Batch 3', detail: 'Schwarzman, Griffin, Ambani, Adani, CZ' },
  ],
};

const outputDir = '/Users/allengaller/Documents/GitHub/allengaller/dana/人物志/富豪榜/福布斯全球';

function buildPrompt(name, extra) {
  return `你是一个富豪人物档案研究员和撰稿人。任务：为 **${name}** 撰写一篇详细的中文人物档案，保存到 Obsidian Wiki。

## 研究步骤
1. 使用 WebSearch 搜索 ${name} 的以下信息（至少搜索 3-5 次）：
   - 出生年份、地点、教育背景、家庭背景
   - 第一桶金如何赚到
   - 3-4 个关键转折点（带年份、具体事件、结果）
   - 商业模式与护城河
   - 2013-2025 年 Forbes 财富排名和净资产变化
   - 标志性决策、名言、思维模式
   - 慈善、政治参与、争议事件
   - 2025 年最新 Forbes 排名和净资产

2. 使用 WebFetch 查阅 Wikipedia 页面获取补充信息

## 写作要求
${extra}

- 中文撰写，人物名用英文
- 1500-2500 字
- 批判性视角：成功与失败/争议并重
- 所有数字必须可查证，不确定的标注"待查证"
- 不偶像化，区分"可学习"和"不可复制"

## 输出
使用 Write 工具将 Markdown 文件保存到 ${outputDir}/${name}.md

完成后报告：写入了多少字的档案。`;
}

const elonExtra = `**特别处理 Elon Musk**：已有详细档案在"人物志/全球视野/Elon Musk.md"。不要重写完整档案。
创建一个精简版富豪榜专用档案，包含：
- 用 [[Elon Musk]] 引用主档
- 2013-2025 财富轨迹表（年份、Forbes排名、净资产）
- 与富豪榜相关的里程碑（首富之争、Tesla 股价暴涨、SpaceX 估值等）
- 与其他富豪的对比（与 Bezos、Arnault 的首富之争）
- frontmatter 按模板格式，标签包含 人物/富豪榜、富豪榜/福布斯
- 文件格式严格遵循以下模板8大板块，但内容侧重于富豪榜视角

模板 frontmatter 格式：
---
title: "Elon Musk（埃隆·马斯克）：从 PayPal 黑帮到全球首富的颠覆者"
tags:
  - 人物/富豪榜
  - 富豪榜/福布斯
  - 行业/科技
  - 地区/美国
aliases:
  - 埃隆·马斯克
  - Musk
born: 1971
nationality: 美国（南非裔）
industry: 科技/汽车/航天
company: Tesla / SpaceX / xAI
peak_rank: 1
peak_net_worth: 342B USD
first_appeared: 2018
date: 2025-01-01
related:
  - [[富豪榜主索引]]
  - [[Elon Musk]]
---`;

const standardTemplate = `严格按照以下模板8大板块写作：

模板 frontmatter 格式：
---
title: "{英文名}（{中文名}）：{一句话定位}"
tags:
  - 人物/富豪榜
  - 富豪榜/福布斯
  - 行业/{行业}
  - 地区/{地区}
aliases:
  - {中文名}
born: {出生年}
nationality: {国籍}
industry: {行业}
company: {公司}
peak_rank: {最高排名}
peak_net_worth: {峰值财富}
first_appeared: {首次上榜年}
date: 2025-01-01
related:
  - [[富豪榜主索引]]
---

8大板块：
一、基本面档案（表格：出生、教育、第一桶金、核心公司、财富峰值、当前财富、家庭）
二、发家史（3-4个关键转折，每个含年份、背景→行动→结果）
三、商业模式与护城河（核心业务、护城河类型、收入结构、关键杠杆）
四、财富轨迹（2013-2025 Forbes 排名和净资产表格 + 轨迹解读）
五、投资版图与多元化
六、社会影响力（慈善、政治、争议）
七、可复用的心法与决策模式（3-5条可学习思维模式）
八、关键数字时间线

加上：参考来源、相关人物`;

const people = args.people;

// Phase 1: Top 5 priority
phase('Research & Write Batch 1');
await parallel([
  () => agent(buildPrompt('Elon Musk', elonExtra), {label: 'Elon Musk', phase: 'Research & Write Batch 1'}),
  () => agent(buildPrompt('Jeff Bezos', standardTemplate + `\n\n已知数据：2025 Forbes 排名 #3，净资产 215B USD。2018-2021连续4年首富。峰值 227B (2024)。Amazon 创始人。`), {label: 'Jeff Bezos', phase: 'Research & Write Batch 1'}),
  () => agent(buildPrompt('Mark Zuckerberg', standardTemplate + `\n\n已知数据：2025 Forbes 排名 #2，净资产 216B USD。Meta/Facebook 创始人。峰值 207B (2025)。注意写元宇宙亏损争议。`), {label: 'Mark Zuckerberg', phase: 'Research & Write Batch 1'}),
  () => agent(buildPrompt('Bernard Arnault', standardTemplate + `\n\n已知数据：2025 Forbes 排名 #5，净资产 178B USD。LVMH 掌门人。2023年首富(187B)。法国奢侈品巨头。`), {label: 'Bernard Arnault', phase: 'Research & Write Batch 1'}),
  () => agent(buildPrompt('Jensen Huang', standardTemplate + `\n\n已知数据：2025 Forbes 排名 #16，净资产 98.7B USD。Nvidia CEO，AI芯片教父。2024年排名 #11 (118B)。AI浪潮最大受益者。`), {label: 'Jensen Huang', phase: 'Research & Write Batch 1'}),
]);

// Phase 2: Next 5
phase('Research & Write Batch 2');
await parallel([
  () => agent(buildPrompt('Larry Page', standardTemplate + `\n\n已知数据：2025 Forbes 排名 #7，净资产 144B USD。Google/Alphabet 联合创始人。`), {label: 'Larry Page', phase: 'Research & Write Batch 2'}),
  () => agent(buildPrompt('Sergey Brin', standardTemplate + `\n\n已知数据：2025 Forbes 排名 #8，净资产 138B USD。Google/Alphabet 联合创始人。`), {label: 'Sergey Brin', phase: 'Research & Write Batch 2'}),
  () => agent(buildPrompt('Amancio Ortega', standardTemplate + `\n\n已知数据：2025 Forbes 排名 #9，净资产 124B USD。Inditex/Zara 创始人。西班牙首富。快时尚模式开创者。`), {label: 'Amancio Ortega', phase: 'Research & Write Batch 2'}),
  () => agent(buildPrompt('Francoise Bettencourt Meyers', standardTemplate + `\n\n已知数据：2025 Forbes 排名 #20，净资产 81.6B USD。L'Oréal 继承人。全球女性首富。`), {label: 'Francoise Bettencourt Meyers', phase: 'Research & Write Batch 2'}),
  () => agent(buildPrompt('Michael Bloomberg', standardTemplate + `\n\n已知数据：2025 Forbes 排名 #14，净资产 105B USD。Bloomberg LP 创始人。前纽约市长。政治家富豪。`), {label: 'Michael Bloomberg', phase: 'Research & Write Batch 2'}),
]);

// Phase 3: Final 5
phase('Research & Write Batch 3');
await parallel([
  () => agent(buildPrompt('Stephen Schwarzman', standardTemplate + `\n\n已知数据：2025 Forbes 排名 #31，净资产 44.4B USD。Blackstone/黑石集团联合创始人。PE教父。`), {label: 'Stephen Schwarzman', phase: 'Research & Write Batch 3'}),
  () => agent(buildPrompt('Ken Griffin', standardTemplate + `\n\n已知数据：2025 Forbes 排名 #35，净资产 42.3B USD。Citadel 创始人。量化交易巨头。`), {label: 'Ken Griffin', phase: 'Research & Write Batch 3'}),
  () => agent(buildPrompt('Mukesh Ambani', standardTemplate + `\n\n已知数据：2025 Forbes 排名 #18，净资产 92.5B USD。Reliance Industries 掌门人。印度首富。`), {label: 'Mukesh Ambani', phase: 'Research & Write Batch 3'}),
  () => agent(buildPrompt('Gautam Adani', standardTemplate + `\n\n已知数据：2025 Forbes 排名 #28，净资产 56.3B USD。Adani Group 创始人。印度基建首富。注意写 Hindenburg 做空风波。`), {label: 'Gautam Adani', phase: 'Research & Write Batch 3'}),
  () => agent(buildPrompt('Changpeng Zhao', standardTemplate + `\n\n已知数据：2025 Forbes 排名 #24，净资产 62.9B USD。Binance/币安创始人。加密货币首富。注意写入狱事件。中文名赵长鹏。`), {label: 'Changpeng Zhao', phase: 'Research & Write Batch 3'}),
]);

log('All 15 billionaire profiles have been researched and written.');
