export const meta = {
  name: 'hurun-profiles-batch1',
  description: 'Create 10 Hurun billionaire profiles in parallel worktrees',
  phases: [
    { title: 'Priority Profiles', detail: '王卫, 张志东, 汪滔, 陈天石, 秦英林, 郑家纯' },
    { title: 'Remaining Profiles', detail: '庞康, 严昊, 钟慧娟, 周群飞' },
  ],
};

const basePath = '/Users/allengaller/Documents/GitHub/allengaller/dana/人物志/富豪榜/胡润百富';

const template = `---
title: "{{NAME}}（{{EN}}）：{{SUMMARY}}"
tags:
  - 人物/富豪榜
  - 富豪榜/胡润
  - 行业/{{INDUSTRY}}
  - 地区/中国
aliases:
  - {{EN}}
  - {{NAME}}
born: {{BORN}}
nationality: 中国
industry: {{INDUSTRY}}
company: {{COMPANY}}
peak_rank: {{PEAK_RANK}}
peak_net_worth: {{PEAK_NW}}
first_appeared: {{FIRST_YEAR}}
date: 2025-06-29
related:
  - [[富豪榜主索引]]
  - [[{{RELATED1}}]]
  - [[{{RELATED2}}]]
---`;

async function createProfile(agent, name, prompt) {
  await agent(prompt);
}

// Phase 1: Priority profiles
phase('Priority Profiles');

await parallel([
  () => agent(`Create a Chinese markdown profile file at ${basePath}/王卫.md for Wang Wei (王卫), founder of SF Express (顺丰). Follow this exact structure from the template at ${basePath}/_TEMPLATE.md. Use the reference style from ${basePath}/马云.md and ${basePath}/钟睒睒.md.

KEY FACTS TO INCLUDE:
- Born: 1970, Shanghai (raised partly in Hong Kong). Father was a military translator.
- Education: Did not attend university. Started as a "跑腿" (errand boy) in Hong Kong.
- First fortune: 1993, founded SF Express in Shunde, Guangdong, with a small team, doing cross-border courier between HK and mainland.
- Core company: 顺丰控股 (SF Express / SF Holding)
- Key turning points:
  1. 1993: Founded SF Express at age 22, starting with hand-delivering packages between HK and Guangdong
  2. 1997-2002: Built direct-operation model (直营模式) unlike competitors who used franchise model (加盟模式). This gave SF superior quality control.
  3. 2013-2017: SF Express backdoor listing on Shenzhen Stock Exchange (2017), making Wang Wei briefly China's 3rd richest at 1860亿
  4. 2023: SF Holding completed Hong Kong IPO, dual listing strategy
- Business model: Direct operation (直营), premium positioning, technology investment (drones, automation), logistics infrastructure
- Moat: Network scale, brand premium, direct operation quality, technology investment
- Revenue model: Express delivery fees, supply chain solutions, international logistics
- Key leverage: Labor (500K+ employees), technology (cargo planes, drones, AI routing)
- Hurun data:
  - 2015: ~550亿, #10
  - 2017: ~1860亿, #3 (after IPO)
  - 2018: ~1300亿, #8
  - 2019: ~1050亿, #11
  - 2020: ~1800亿, #6
  - 2021: ~1500亿, #10
  - 2022: ~1150亿, #13
  - 2023: ~1000亿, #20
  - 2024: ~1100亿, ~#18
  - 2025: ~1300亿, #26
- Trajectory: Volatile, tied to SF stock price. Peak in 2017 post-IPO, gradual decline as competition from JD Logistics and J&T (极兔) intensified.
- Investments: Cargo airline (顺丰航空, 90+ planes), cold chain, supply chain finance, international expansion (Southeast Asia), drone delivery R&D
- Social: Extremely low-profile, almost never gives interviews, no public social media. Known as "最神秘的富豪". Once personally paid for a courier's damaged car. Known for protecting frontline workers.
- Controversies: Criticized for high employee pressure, delivery worker exploitation concerns in the industry. SF's premium pricing model under pressure from price wars.
- Quotes: "我的未来不会有什么大的变化，只是希望将快递做到极致。" / Said he would "never sell SF" 
- Mindset: 1) Direct operation over franchise - quality as competitive moat. 2) Technology investment (early adopter of drones for delivery). 3) Extreme low-profile strategy - avoid public attention.
- Key timeline:
  - 1970: Born in Shanghai
  - 1993: Founded SF Express in Shunde
  - 2003: Established direct-operation model nationwide
  - 2009: Launched SF Airlines (cargo)
  - 2017: SF backdoor listing on Shenzhen exchange, briefly 1860亿
  - 2020: SF revenue exceeded 150 billion yuan
  - 2021: SF acquired Kerry Logistics (嘉里物流) for HK$17.5B
  - 2023: SF Hong Kong IPO
  - 2025: Hurun #26, 1300亿

Be critical: address the "mysterious" label, the direct-operation vs franchise debate, employee treatment concerns, and the challenge from J&T Express.

Write 1500-2500 Chinese characters. All content in Chinese. Save to ${basePath}/王卫.md`, { label: '王卫' }),

  () => agent(`Create a Chinese markdown profile file at ${basePath}/张志东.md for Zhang Zhidong (张志东), co-founder of Tencent. Follow the exact structure from the template at ${basePath}/_TEMPLATE.md. Use the reference style from ${basePath}/马云.md.

KEY FACTS:
- Born: 1972, Dongguan, Guangdong
- Education: Shenzhen University (computer science, graduated 1989 first in cohort), South China University of Technology (postgrad)
- Met Ma Huateng at Shenzhen University. Co-founded Tencent in 1998 as CTO.
- First fortune: Tencent co-founder, designed QQ's technical architecture
- Key turning points:
  1. 1998: Co-founded Tencent with Ma Huateng and 3 others, as CTO
  2. 1999-2003: Designed QQ's architecture - reduced installer to 220K, moved user profiles to server-side, optimized for China's slow internet. This technical genius saved massive hardware costs and enabled millions of concurrent users.
  3. 2004: Tencent Hong Kong IPO, became billionaire
  4. 2014: Retired from daily operations at age 42, published resignation letter. Had considered retiring 2 years earlier but stayed to stabilize leadership.
- Business model: Technical architect of Tencent's entire product ecosystem
- Moat: Technical architecture that enabled massive scale at low cost
- Hurun data:
  - 2004-2010: Listed as Tencent co-founder, wealth tracked through Tencent stock
  - 2015: ~600亿
  - 2017: Forbes #19, ~84亿美元
  - 2020: ~1000亿
  - 2025: #12, 1930亿 (Tencent stock appreciation)
- Post-retirement: Became angel investor. Known as "the wealthiest former deputy in China." Invested in various tech startups. Maintains low profile.
- Social: Known as a "技术宅" (tech geek). Extremely humble, drove ordinary cars even after becoming billionaire. Respected by engineers across China.
- Quotes: "腾讯的好产品依然不够多" (2020 interview, showing continued engagement)
- Mindset: 1) Technical excellence as competitive advantage. 2) Frugality in infrastructure design. 3) Knowing when to exit - graceful retirement.
- Controversies: Very few. One of the cleanest reputations in Chinese tech.
- Timeline:
  - 1972: Born in Dongguan
  - 1989: Graduated Shenzhen University (first in cohort)
  - 1993: Completed postgrad at South China University of Technology
  - 1998: Co-founded Tencent as CTO
  - 1999: Released OICQ (later QQ), designed ultra-lightweight architecture
  - 2004: Tencent HK IPO
  - 2012: First considered retirement
  - 2014: Officially retired from Tencent operations
  - 2025: Hurun #12, 1930亿

Write 1500-2500 Chinese characters. All in Chinese. Save to ${basePath}/张志东.md`, { label: '张志东' }),

  () => agent(`Create a Chinese markdown profile file at ${basePath}/汪滔.md for Frank Wang (汪滔), founder of DJI. Follow the exact structure from the template at ${basePath}/_TEMPLATE.md. Use the reference style from ${basePath}/钟睒睒.md.

KEY FACTS:
- Born: 1980, Hangzhou, Zhejiang (some sources say Wenzhou)
- Education: Left East China Normal University, transferred to HKUST (Hong Kong University of Science and Technology), studied electronic engineering, focused on helicopter flight control. Failed his final year project initially, then was taken on as graduate student by Professor Li Zexiang (李泽湘). Successfully refined his drone prototype within 3 months for his master's thesis.
- First fortune: Founded DJI in 2006 in a cramped Shenzhen apartment with ~200,000 RMB from parents
- Key turning points:
  1. 2006: Founded DJI in Shenzhen. Initially sold flight control components to drone hobbyists. Early sales to institutional buyers were profitable but technically unfulfilling.
  2. 2010-2012: Pivoted from components to complete, ready-to-fly consumer drones. Released the Phantom series which democratized aerial photography.
  3. 2013-2015: Explosive global growth. DJI captured ~70% of global consumer drone market. Revenue grew from near zero to billions.
  4. 2017-present: Expanded into enterprise drones (agriculture, inspection, public safety), gimbals (Ronin), action cameras (Osmo), and robotics (RoboMaster).
- Business model: Vertical integration + closed ecosystem. DJI designs hardware, firmware, and software in-house. Premium pricing. No licensing model.
- Moat: Technology (patents, R&D team of thousands), brand, ecosystem lock-in, manufacturing scale in Shenzhen
- Revenue: Consumer drones ~40%, enterprise ~30%, accessories/other ~30%
- Key leverage: Code (firmware/software), manufacturing (Shenzhen supply chain)
- Hurun data:
  - 2015: First appeared, ~200亿
  - 2016: ~260亿
  - 2017: ~330亿
  - 2018: ~350亿
  - 2019: ~400亿
  - 2020: ~420亿
  - 2021: ~500亿 (peak)
  - 2022: ~350亿 (valuation decline)
  - 2023: ~300亿
  - 2024: ~280亿
  - 2025: #33, 1100亿
- Investments: RoboMaster robotics competition, DJI Enterprise division, Hasselblad (Swedish camera company, acquired stake), Livox (LiDAR)
- Social: Extremely reclusive. Almost never gives interviews. No public speeches. Known for being brutally honest and demanding.
- Quotes: "我们只剩一张办公桌，但绝不放弃飞控梦" / "只带脑子，不带情绪" / "世界蠢得不可思议" / "DJI是一方净土，只有纯粹的创业和为梦想而生的艺术家" / "套上互联网这层皮，感觉好像很高大上，但事情的本质还是掩盖不了"
- Controversies: 1) US government banned DJI products over data security concerns (2017-ongoing). 2) Internal supply chain corruption scandal involving dozens of employees (2019). 3) Extremely demanding workplace culture, strict electronic device controls. 4) Criticized competitors publicly and harshly. 5) Design leaks and trade secret disputes.
- Mindset: 1) Product obsession over marketing. 2) Vertical integration over open collaboration. 3) Anti-互联网 hype - focus on real engineering. 4) Intellectual honesty - publicly criticize bad thinking.
- Timeline:
  - 1980: Born in Hangzhou
  - 2003: Graduated HKUST
  - 2005: Completed master's at HKUST under Li Zexiang
  - 2006: Founded DJI in Shenzhen with 200,000 RMB
  - 2012: Released Phantom drone, consumer market breakthrough
  - 2015: Global market share ~70%, first appeared on Hurun list
  - 2017: US government security review
  - 2019: Internal corruption scandal
  - 2020: Enterprise business grew rapidly during COVID (thermal cameras, agricultural drones)
  - 2025: Hurun #33, 1100亿

Write 1500-2500 Chinese characters. All in Chinese. Save to ${basePath}/汪滔.md`, { label: '汪滔' }),

  () => agent(`Create a Chinese markdown profile file at ${basePath}/陈天石.md for Chen Tianshi (陈天石), founder of Cambricon (寒武纪). Follow the exact structure from the template at ${basePath}/_TEMPLATE.md.

KEY FACTS:
- Born: 1985, Nanchang, Jiangxi
- Education: USTC (University of Science and Technology of China) "少年班" (gifted youth program), entered at age 16. PhD from Institute of Computing Technology, Chinese Academy of Sciences (中科院计算所). Research focus: AI chip architecture.
- Academic prodigy: Published papers on neural network processors while still a PhD student. Co-authored papers with his brother Chen Yunji (陈云霁), also a chip researcher.
- First fortune: Founded Cambricon Technologies (寒武纪) in 2016, spinning out of CAS research.
- Key turning points:
  1. 2016: Founded Cambricon at age 31, commercializing AI chip research from CAS. Early product: Dianwang ( Dianwang) deep learning processor IP.
  2. 2017: Huawei used Cambricon's NPU IP in its Kirin 970 chip (Mate 10 smartphone), giving massive validation. But Huawei later developed its own AI chips.
  3. 2020: Cambricon IPO on Shanghai STAR Market (科创板). Initial valuation ~100 billion. But company was deeply loss-making.
  4. 2024-2025: AI boom drove massive stock price surge. Cambricon achieved first quarterly profit after 8 consecutive years of losses. Stock price surged from ~60 to ~800 yuan. Chen Tianshi became Jiangxi's richest person.
- Business model: AI chip design (fabless). Products include training chips (Siyuan/思元 series), inference accelerators, and IP licensing.
- Moat: Patents (AI chip architecture), government support (CAS backing), talent (top chip researchers), national security (China's push for chip self-sufficiency)
- Revenue: IP licensing (early), chip sales (growing), government contracts
- Key leverage: Code (chip design), government policy (国产替代), talent
- Hurun data:
  - 2020: ~300亿 (IPO year, but volatile)
  - 2021: ~500亿 (peak stock)
  - 2022: ~150亿 (stock crash)
  - 2023: ~200亿
  - 2024: ~600亿 (AI boom)
  - 2025: #18, 1800亿 (massive AI rally, first Top 20 entry)
- Trajectory: Extremely volatile, tied to AI sentiment and stock price. 2025 surge driven by China AI chip demand amid US export controls on Nvidia.
- Investments: R&D intensive (80%+ of revenue spent on R&D), no significant diversification
- Social: Academic persona, rarely gives media interviews. Known as "学者型创业者" (scholar-entrepreneur). 
- Quotes: "身上既有科学家的严谨，又有务实经营的底色"
- Controversies: 1) Persistent losses for 8 years raised questions about viability. 2) Stock price volatility and speculative trading. 3) Dependence on government subsidies and contracts. 4) Huawei's in-house chip development reduced early revenue. 5) Questions about whether AI chip companies can compete with Nvidia long-term.
- Mindset: 1) Long-term R&D investment over short-term profits. 2) Academic rigor applied to business. 3) Riding the national policy wave (国产替代).
- Timeline:
  - 1985: Born in Nanchang, Jiangxi
  - 2001: Entered USTC gifted youth program at 16
  - 2008: PhD from CAS Institute of Computing Technology
  - 2011-2015: Researcher at CAS, published AI chip papers
  - 2016: Founded Cambricon Technologies
  - 2017: Huawei Kirin 970 used Cambricon NPU IP
  - 2020: IPO on Shanghai STAR Market (科创板)
  - 2024: AI boom, stock price 10x increase
  - 2025: First profitable quarter; Hurun #18, 1800亿; Jiangxi's richest person

Write 1500-2500 Chinese characters. All in Chinese. Save to ${basePath}/陈天石.md`, { label: '陈天石' }),

  () => agent(`Create a Chinese markdown profile file at ${basePath}/秦英林、钱瑛夫妇.md for Qin Yinglin and Qian Ying (秦英林、钱瑛夫妇), founders of Muyuan Foods (牧原股份). Follow the exact structure from the template at ${basePath}/_TEMPLATE.md.

KEY FACTS:
- Born: Qin Yinglin 1965, Nanyang, Henan. Qian Ying (wife), also from Henan.
- Education: Qin Yinglin graduated from Henan Agricultural University (河南农业大学), animal husbandry major. Qian Ying also studied animal science.
- First fortune: Started pig farming in 1992 with 22 pigs in their village.
- Key turning points:
  1. 1992: Started with 22 pigs in Nanyang, Henan after graduating from agricultural university. Applied scientific breeding methods instead of traditional farming.
  2. 2000s: Developed "全自养" (fully integrated) model - controlling the entire chain from breeding to slaughtering, unlike competitors who used contract farming. Built massive "超级猪场" (mega pig farms).
  3. 2014: Muyuan IPO on Shenzhen Stock Exchange. Became listed company.
  4. 2019-2020: African Swine Fever (ASF) devastated China's pig population. Muyuan's biosecurity measures (全封闭养殖) protected its herds. Profits surged as pork prices spiked. Stock price 10x increase. Qin became one of China's richest.
- Business model: Fully integrated pig farming (breeding, feeding, raising, slaughtering). Scale economics. Technology-driven (AI monitoring, automated feeding).
- Moat: Scale (China's largest pig producer), biosecurity systems, integrated model, cost efficiency
- Revenue: Live pig sales (~80%), slaughtering and processing (~20%)
- Key leverage: Labor, capital (massive farm construction), technology (biosecurity, AI)
- Hurun data:
  - 2014: ~50亿 (IPO year)
  - 2015: ~100亿
  - 2016: ~200亿
  - 2017: ~250亿
  - 2018: ~300亿
  - 2019: ~800亿 (ASF effect)
  - 2020: ~2000亿 (peak, pork price spike)
  - 2021: ~1500亿 (pork price normalization)
  - 2022: ~1000亿 (pig cycle downturn)
  - 2023: ~800亿
  - 2024: ~1200亿
  - 2025: #16, 1870亿
- Trajectory: Highly cyclical, tied to pig prices ("猪周期"). Peak in 2020 during ASF crisis, gradual normalization.
- Investments: Vertical integration into slaughtering and meat processing. Some diversification into feed production.
- Social: Known as "猪王" (Pig King). Relatively low-profile but more visible than Wang Wei.
- Quotes: "养猪是一门科学" / "要把养猪做到极致"
- Controversies: 1) Environmental pollution from mega pig farms (water contamination, odor complaints). 2) Animal welfare concerns about industrial farming. 3) Cyclical losses during pig price downturns (2022-2023 年亏损数十亿). 4) High debt levels for farm construction. 5) "猪周期" (pig cycle) makes earnings highly volatile.
- Mindset: 1) Scientific approach to agriculture. 2) Full integration for quality control. 3) Scale as competitive moat in a fragmented industry. 4) Biosecurity as existential priority.
- Timeline:
  - 1965: Qin Yinglin born in Nanyang, Henan
  - 1989: Graduated Henan Agricultural University
  - 1992: Started pig farming with 22 pigs
  - 2000: Established Muyuan Foods formally
  - 2014: Muyuan IPO on Shenzhen Stock Exchange
  - 2019: African Swine Fever crisis, Muyuan survived with biosecurity
  - 2020: Profits surged to ~30 billion yuan, stock 10x increase
  - 2021-2022: Pig cycle downturn, profits declined
  - 2023: Continued losses but market share grew
  - 2025: Hurun #16, 1870亿; Muyuan Hong Kong IPO

Write 1500-2500 Chinese characters. All in Chinese. Save to ${basePath}/秦英林、钱瑛夫妇.md`, { label: '秦英林' }),

  () => agent(`Create a Chinese markdown profile file at ${basePath}/郑家纯家族.md for Henry Cheng family (郑家纯家族), controlling Chow Tai Fook and New World Development. Follow the exact structure from the template at ${basePath}/_TEMPLATE.md.

KEY FACTS:
- Born: Henry Cheng (郑家纯) 1946, Hong Kong. Son of Cheng Yu-tung (郑裕彤, 1925-2016), one of Hong Kong's "Big Four" property tycoons.
- Education: University of Western Ontario (Canada), business degree.
- Family: Cheng Yu-tung founded Chow Tai Fook jewellery in 1929, then entered property development founding New World Development in 1970. Henry Cheng succeeded his father as chairman.
- Key turning points:
  1. 1970s-1980s: Joined family business, helped expand New World Development into a major Hong Kong property developer.
  2. 2012: Succeeded his father Cheng Yu-tung as chairman of both Chow Tai Fook and New World Development upon father's retirement.
  3. 2016: Father Cheng Yu-tung passed away. Henry became undisputed head of the family empire.
  4. 2024-2025: New World Development debt crisis. Total liabilities reached HK$210.9 billion. Company faced liquidity crunch, deferred perpetual bond payments, pursued HK$87.5 billion refinancing. Stock price collapsed. Family forced to sell assets rapidly.
- Business model: Diversified conglomerate - property development (New World), jewellery retail (Chow Tai Fook), infrastructure, hotels, department stores (New World Department Store)
- Moat: Brand (Chow Tai Fook), Hong Kong land bank (declining), family network
- Revenue: Property sales + rental income + Chow Tai Fook jewellery retail
- Key leverage: Capital (property leverage), brand, government relations (Hong Kong)
- Hurun data:
  - 2015: ~800亿
  - 2016: ~1000亿
  - 2017: ~1200亿
  - 2018: ~1300亿 (peak)
  - 2019: ~1200亿
  - 2020: ~1100亿
  - 2021: ~1000亿 (property downturn begins)
  - 2022: ~800亿
  - 2023: ~700亿
  - 2024: ~800亿
  - 2025: #20, 1750亿 (Chow Tai Fook valuation more stable)
- Trajectory: Gradual decline from 2018 peak as Hong Kong property market weakened. Chow Tai Fook provides stable cash flow but cannot offset property losses.
- Investments: Chow Tai Fook (jewellery, listed separately), NWS Holdings (infrastructure), New World Department Store, K11 (cultural retail concept by son Adrian Cheng)
- Third generation: Adrian Cheng (郑志刚, son) was groomed as successor but resigned from New World in 2024 amid the debt crisis. Family succession in turmoil.
- Social: Traditional Hong Kong tycoon family. Less visible than Li Ka-shing family.
- Controversies: 1) New World Development debt crisis (2024-2025) - massive leverage, asset fire sales. 2) Adrian Cheng's abrupt departure raised governance concerns. 3) Hong Kong property market structural decline. 4) Family wealth held through offshore trusts, complex governance.
- Mindset: 1) Diversification across sectors. 2) Brand building (Chow Tai Fook). 3) Cultural real estate (K11 concept). But over-leverage proved fatal.
- Comparison with Li Ka-shing: Both Hong Kong property families, but Li divested early while Cheng family held on, suffering from market decline.
- Timeline:
  - 1946: Henry Cheng born in Hong Kong
  - 1970: Father founded New World Development
  - 1970s: Henry joined family business
  - 2012: Succeeded father as chairman
  - 2016: Father passed away
  - 2020: Hong Kong property market weakened by COVID and political uncertainty
  - 2024: Adrian Cheng resigned; New World debt crisis erupted
  - 2025: Hurun #20, 1750亿; ongoing restructuring

Write 1500-2500 Chinese characters. All in Chinese. Save to ${basePath}/郑家纯家族.md`, { label: '郑家纯' }),
]);

// Phase 2: Remaining profiles
phase('Remaining Profiles');

await parallel([
  () => agent(`Create a Chinese markdown profile file at ${basePath}/庞康.md for Pang Kang (庞康), chairman of Foshan Haitian Flavouring (海天味业). Follow the exact structure from the template at ${basePath}/_TEMPLATE.md.

KEY FACTS:
- Born: 1956, Foshan, Guangdong
- Education: Technical background, started as technician
- Career: Joined predecessor of Haitian (珠江酱油厂) in 1982 as a basic technician. Rose to deputy factory head by 1985. Led reform and expansion through the 1990s.
- Key turning points:
  1. 1982: Joined the soy sauce factory as a technician at age 26
  2. 1990s: Led two rounds of enterprise reform, converting state-owned factory to private company. Invested heavily in production expansion and export certification.
  3. 2010: Established actual controlling ownership through management buyout
  4. 2014: Haitian IPO on Shanghai Stock Exchange. Became China's "酱油第一股" (first soy sauce stock). Market cap peaked at ~7000亿 in 2021.
- Business model: Condiment manufacturing at massive scale. Soy sauce, oyster sauce, vinegar, cooking wine. Brand + distribution moat.
- Moat: Brand (海天 is household name), distribution (covering millions of retail terminals and restaurants), scale (largest condiment producer in China)
- Revenue: Soy sauce ~40%, oyster sauce ~25%, seasoning paste ~15%, other ~20%. 2024 total revenue ~269 billion yuan.
- Key leverage: Brand, distribution network, production scale (450万+ tons annually)
- Hurun data:
  - 2014: ~100亿 (IPO year)
  - 2015: ~200亿
  - 2017: ~400亿
  - 2019: ~600亿
  - 2020: ~1000亿 (consumer stock boom)
  - 2021: ~2000亿 (peak market cap ~7000亿)
  - 2022: ~1200亿 (consumer stock correction)
  - 2023: ~800亿
  - 2024: ~600亿
  - 2025: #42, 985亿 (recovery, "造富机器" label)
- Trajectory: Rapid rise 2014-2021 with consumer stock bubble, then significant correction. 2024 revenue rebounded.
- Controversies: 1) "海天酱油添加剂双标事件" (2022) - accused of using different ingredient standards for domestic vs export products. Major PR crisis. 2) High executive compensation, called "造富机器" (wealth-creating machine for executives). 3) Market dominance raised anti-competition concerns. 4) 2024 stock recovery but still far from peak.
- Management transition: Pang Kang stepped down from management in late 2024, passing control to next generation of executives.
- Mindset: 1) Scale economics in traditional food. 2) Brand building through TV advertising and restaurant channel. 3) Enterprise reform and modernization of traditional industry.
- Timeline:
  - 1956: Born in Foshan
  - 1982: Joined soy sauce factory as technician
  - 1985: Promoted to deputy factory head
  - 1990s: Two rounds of enterprise reform
  - 2010: Established controlling ownership
  - 2014: Haitian IPO on Shanghai exchange
  - 2020: Market cap exceeded 5000亿
  - 2021: Peak market cap ~7000亿
  - 2022: Additive controversy PR crisis
  - 2024: Resigned from management; revenue rebounded to 269亿
  - 2025: Hurun #42, 985亿; preparing Hong Kong IPO

Write 1500-2500 Chinese characters. All in Chinese. Save to ${basePath}/庞康.md`, { label: '庞康' }),

  () => agent(`Create a Chinese markdown profile file at ${basePath}/严昊.md for Yan Hao (严昊), chairman of Pacific Construction Group (太平洋建设集团). Follow the exact structure from the template at ${basePath}/_TEMPLATE.md.

KEY FACTS:
- Born: 1986, Huai'an, Jiangsu
- Education: Studied business/management. Son of Yan Jiehe (严介和), the flamboyant founder of Pacific Construction.
- Family: Father Yan Jiehe was a teacher turned construction tycoon, known as "中国第一狂人" (China's number one madman) for his bold business style and provocative statements.
- Key turning points:
  1. 2011-2014: Gradually took over Pacific Construction from his father. Yan Jiehe had faced financial difficulties and government investigations but managed to keep the empire together.
  2. 2015: Pacific Construction claimed to be among the world's largest private construction companies, with revenue exceeding 500 billion yuan. Yan Hao, at age 29, became chairman.
  3. 2016: At age 30, debuted on Hurun list at #6 with ~1000亿+, becoming the youngest Top 10 member.
  4. 2020s: Pacific Construction shifted focus to BT (Build-Transfer) and PPP (Public-Private Partnership) infrastructure projects in smaller Chinese cities.
- Business model: Infrastructure construction through BT/PPP model. Government contracts for roads, bridges, urban development. Revenue from construction margins and project financing.
- Moat: Government relationships (especially with local governments), scale, family brand
- Revenue: Construction contracts, infrastructure financing
- Key leverage: Government relationships, capital (leverage-heavy), labor
- Hurun data:
  - 2015: ~640亿 (with father, #8 together)
  - 2016: ~1000亿+ (#6, youngest Top 10)
  - 2017: ~1100亿
  - 2018: ~1150亿
  - 2019: ~1200亿
  - 2020: ~1300亿
  - 2021: ~1350亿
  - 2022: ~1400亿
  - 2023: ~1450亿
  - 2024: ~1500亿
  - 2025: #22, 1550亿
- Trajectory: Steady but questions about actual profitability vs claimed revenue. Construction companies often have thin margins and high receivables.
- Controversies: 1) "富二代" (rich second generation) label - inherited wealth rather than self-made. 2) Pacific Construction's financial transparency questioned - claimed Fortune 500 status but disputed. 3) Father Yan Jiehe's controversial statements and legal issues. 4) BT/PPP model criticized as creating local government debt. 5) Multiple court enforcement orders (强制执行) for unpaid debts despite claiming massive revenue. 6) Questions about whether the actual net worth matches the claimed figures, as much is tied to illiquid construction projects.
- Mindset: 1) PPP/BT model for infrastructure. 2) Government relationship management. 3) Scale-first approach.
- Comparison: Unlike self-made billionaires, Yan Hao represents the "富二代接班" model. His wealth is inherited rather than created.
- Timeline:
  - 1986: Born in Huai'an, Jiangsu
  - 1995: Father Yan Jiehe founded Pacific Construction
  - 2011: Began taking operational roles
  - 2015: Became chairman at age 29
  - 2016: Hurun #6 at age 30, youngest Top 10
  - 2020: Pacific Construction claimed top private construction company
  - 2024: Multiple enforcement orders raised transparency concerns
  - 2025: Hurun #22, 1550亿

Write 1500-2500 Chinese characters. All in Chinese. Save to ${basePath}/严昊.md`, { label: '严昊' }),

  () => agent(`Create a Chinese markdown profile file at ${basePath}/钟慧娟、孙远母女.md for Zhong Huijuan and Sun Yuan (钟慧娟、孙远母女), controlling Hansoh Pharma (翰森制药). Follow the exact structure from the template at ${basePath}/_TEMPLATE.md.

KEY FACTS:
- Born: Zhong Huijuan ~1961, Lianyungang, Jiangsu. Daughter Sun Yuan, born later.
- Education: Chemistry major, graduated 1982. Worked as a middle school chemistry teacher.
- Family: Husband is Sun Piaoyang (孙飘扬), founder of Hengrui Medicine (恒瑞医药), China's largest pharma company. This makes the couple one of China's most powerful pharmaceutical power couples - controlling both Hengrui (恒瑞) and Hansoh (翰森).
- Key turning points:
  1. 1982-1995: Worked as a chemistry teacher after graduation
  2. 1995: Husband Sun Piaoyang participated in founding the predecessor of Hansoh Pharma (豪森药业). Zhong Huijuan quit her teaching job to join and manage the company.
  3. 2000s-2010s: Under her leadership, Hansoh shifted focus from generic drugs to innovative pharmaceuticals, focusing on oncology, CNS, diabetes, and infectious diseases.
  4. 2019: Hansoh Pharma IPO on Hong Kong Stock Exchange. Stock price surged as innovative drug pipeline attracted investors.
  5. 2024-2025: Innovation drugs revenue grew rapidly. Global licensing deals (e.g., with GSK) boosted confidence. Stock price surged, making Zhong Huijuan China's richest woman in 2025.
- Business model: Pharmaceutical R&D, manufacturing, and sales. Focus on innovative drugs (创新药) in oncology, autoimmune, metabolic diseases.
- Moat: Patents (innovative drugs), R&D pipeline, regulatory approvals, brand in pharma
- Revenue: Innovative drugs (~40% and growing), generic drugs (~60%)
- Key leverage: Code/patents (drug patents), government (NMPA approvals, NRDL inclusion), talent (R&D scientists)
- Hurun data:
  - 2019: ~500亿 (IPO year)
  - 2020: ~800亿
  - 2021: ~1200亿 (pharma stock peak)
  - 2022: ~600亿 (pharma stock correction)
  - 2023: ~700亿
  - 2024: ~1000亿
  - 2025: #25, 1410亿 (China's richest woman 2025)
- Trajectory: Rose with innovative drug success, dipped during pharma stock correction, recovered strongly.
- Controversies: 1) Questions about whether Hansoh and Hengrui (husband's company) have overlapping interests or compete. 2) Generic drug quality concerns in early years. 3) High drug pricing in China. 4) Dependence on a few key products.
- Social: Low-profile, former teacher background. Known as "医药女王" (pharma queen) in 2025.
- Mindset: 1) Pivot from generics to innovation - long-term vision. 2) Teacher's discipline applied to business management. 3) Family power couple strategy (Hengrui + Hansoh).
- Comparison: Unlike Zhong Shanshan (钟睒睒, no relation), represents a different model of Chinese female billionaire - through pharmaceutical expertise rather than consumer brands.
- Timeline:
  - ~1961: Born in Lianyungang, Jiangsu
  - 1982: Graduated with chemistry degree, became teacher
  - 1995: Joined predecessor of Hansoh Pharma, quit teaching
  - 2000s: Shifted focus to innovative drugs
  - 2019: Hansoh IPO on Hong Kong Stock Exchange
  - 2024: Global licensing deals accelerated
  - 2025: Hurun #25, 1410亿; China's richest woman

Write 1500-2500 Chinese characters. All in Chinese. Save to ${basePath}/钟慧娟、孙远母女.md`, { label: '钟慧娟' }),

  () => agent(`Create a Chinese markdown profile file at ${basePath}/周群飞、郑俊龙夫妇.md for Zhou Qunfei and Zheng Junlong (周群飞、郑俊龙夫妇), founders of Lens Technology (蓝思科技). Follow the exact structure from the template at ${basePath}/_TEMPLATE.md.

KEY FACTS:
- Born: Zhou Qunfei 1970, Xiangxi, Hunan (poor rural area). Zheng Junlong is her husband.
- Education: Limited formal education. Left rural Hunan as a teenager to work in Shenzhen factories. Self-taught technical skills.
- Early career: Worked as a factory girl (打工妹) in Shenzhen, manufacturing watch glass covers. Progressively upgraded her skills.
- Key turning points:
  1. 2000: Identified that acrylic panels on phones had durability issues. Initiated glass material research. Invented the world's first glass panel application for mobile phones.
  2. 2003: Founded Lens Technology (蓝思科技) in Shenzhen, focusing on protective glass panels for phones.
  3. 2007-2010: Became Apple's key glass panel supplier for iPhone. This transformed Lens Technology into a critical Apple supply chain partner. Revenue exploded.
  4. 2015: Lens Technology IPO on Shenzhen ChiNext (创业板). Zhou Qunfei became one of China's richest self-made women. Market cap peaked at ~2000亿 in 2021.
- Business model: Manufacturing protective glass/ceramic/sapphire panels for smartphones, tablets, smartwatches, and automotive displays.
- Moat: Manufacturing technology (chemical ion exchange, anti-fingerprint coatings), Apple supply chain relationship, scale, production equipment
- Revenue: Smartphone panels (~60%), automotive displays (~15%), smartwatch/wearable (~15%), other (~10%)
- Key leverage: Manufacturing (mass production), Apple relationship, labor
- Hurun data:
  - 2015: ~400亿 (IPO year)
  - 2016: ~500亿
  - 2017: ~600亿 (#20, #1 global self-made woman)
  - 2018: ~400亿 (smartphone market slowdown)
  - 2019: ~350亿
  - 2020: ~700亿 (iPhone 12 cycle)
  - 2021: ~1000亿 (peak)
  - 2022: ~500亿 (smartphone downturn)
  - 2023: ~400亿
  - 2024: ~600亿
  - 2025: #32, 1110亿 (recovery)
- Trajectory: Tied to smartphone cycles, especially Apple. Peaked 2021, corrected, recovering.
- Investments: Expanding into automotive displays (EV dashboard screens), smart wearables, ceramic materials. Relocated major production to Hunan (creating tens of thousands of jobs in her home province).
- Social: Known as "触屏女王" (Touch Screen Queen). Inspiring "打工妹逆袭" (factory girl success story). Active in Hunan community affairs.
- Quotes: About her early days - used to study technical books late at night. Known for hands-on management style.
- Controversies: 1) Heavy dependence on Apple (single customer risk). 2) Labor conditions in factories (tens of thousands of workers). 3) Stock price volatility tied to iPhone cycles. 4) Competition from Chinese and Korean glass manufacturers.
- Mindset: 1) From factory floor to boardroom - self-education. 2) Identify material innovation opportunities (glass vs acrylic). 3) Build critical supply chain position. 4) Geographic diversification of production (Shenzhen to Hunan).
- Timeline:
  - 1970: Born in Xiangxi, Hunan (rural poverty)
  - 1986: Left for Shenzhen as factory worker at age 16
  - 1990s: Worked in watch glass manufacturing, self-taught
  - 2000: Began glass panel research for mobile phones
  - 2003: Founded Lens Technology in Shenzhen
  - 2007: Became Apple supplier for iPhone glass
  - 2015: IPO on Shenzhen ChiNext, ~400亿
  - 2017: Named #1 global self-made woman by Hurun
  - 2021: Peak wealth ~1000亿
  - 2025: Hurun #32, 1110亿; preparing Hong Kong secondary listing

Write 1500-2500 Chinese characters. All in Chinese. Save to ${basePath}/周群飞、郑俊龙夫妇.md`, { label: '周群飞' }),
]);

log('All 10 profiles created successfully');
