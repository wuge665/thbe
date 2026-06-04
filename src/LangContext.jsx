import { createContext, useContext, useState, useEffect } from 'react'

const LangContext = createContext()

const zh = {
  siteTitle: 'DevTools - 开发者必备在线工具集合',
  siteDesc: 'JSON格式化、时间戳转换、Base64编码、密码生成、复利计算器、房贷计算器、凯利公式、贷款计算器等免费在线工具集合。',
  subtitle: '开发者必备 + 理财工具集合',
  description: '免费、开源、易用的在线工具网站',
  more: '更多工具',
  about: '关于我们',
  terms: '使用条款',
  privacy: '隐私政策',
  footer: '开发者必备工具',
  loading: '加载中...',
  dataFrom: '数据来源：世界银行',
  year: '年份',
  search: '搜索',
  compare: '对比',
  historicalTrend: '历史趋势对比',
  country: '国家/地区',
  rank: '排名',
  value: '数值',
  inputCountry: '输入国家名称...',
  gdpTitle: '世界GDP排名',
  gdpDesc: 'GDP是指国内生产总值，即国内生产的所有商品的价值总和。GDP是最常用的比较国家间经济实力的资料。',
  gdpCapitaTitle: '世界人均GDP排名',
  gdpCapitaDesc: '人均GDP是国内生产总值除以人口数量，是衡量各国人民生活水平的重要经济指标。',
  popTitle: '世界人口排名',
  popDesc: '世界人口排名展示全球各国人口数据，数据来源于世界银行统计。',
  unitTrillion: '万亿美元',
  unitThousand: '千美元',
  unitPopulation: '人',
  addCompare: '添加对比',
  langZh: '中文',
  langEn: 'English',
}

const en = {
  siteTitle: 'DevTools - Free Online Developer Tools',
  siteDesc: 'JSON Formatter, Timestamp Converter, Base64, Password Generator, Compound Interest, Mortgage Calculator, Kelly Formula, Loan Calculator & more free online tools.',
  subtitle: 'Developer Tools + Financial Calculators',
  description: 'Free, Open Source, Easy-to-Use Online Tools',
  more: 'More Tools',
  about: 'About',
  terms: 'Terms of Use',
  privacy: 'Privacy Policy',
  footer: 'Developer Tools',
  loading: 'Loading...',
  dataFrom: 'Data Source: World Bank',
  year: 'Year',
  search: 'Search',
  compare: 'Compare',
  historicalTrend: 'Historical Trend Comparison',
  country: 'Country',
  rank: 'Rank',
  value: 'Value',
  inputCountry: 'Enter country name...',
  gdpTitle: 'World GDP Ranking',
  gdpDesc: 'GDP (Gross Domestic Product) is the total value of all goods produced within a country. It is the most commonly used metric for comparing economic strength between nations.',
  gdpCapitaTitle: 'World GDP per Capita Ranking',
  gdpCapitaDesc: 'GDP per capita is the total GDP divided by the population. It is a key indicator of living standards.',
  popTitle: 'World Population Ranking',
  popDesc: 'World population ranking showing population data for all countries, sourced from World Bank statistics.',
  unitTrillion: 'Trillion USD',
  unitThousand: 'Thousand USD',
  unitPopulation: 'People',
  addCompare: 'Add to Compare',
  langZh: '中文',
  langEn: 'English',
}

const translations = { zh, en }
const LANG_KEY = 'devtools-lang'

export function LangProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem(LANG_KEY) || 'zh')

  useEffect(() => {
    localStorage.setItem(LANG_KEY, lang)
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en'
  }, [lang])

  const t = (key) => translations[lang]?.[key] || translations.zh[key] || key

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  return useContext(LangContext)
}
