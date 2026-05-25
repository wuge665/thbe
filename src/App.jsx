import { useState, useEffect } from 'react'
import './App.css'
import JsonFormatter from './components/tools/JsonFormatter'
import TimestampConverter from './components/tools/TimestampConverter'
import Base64Tool from './components/tools/Base64Tool'
import UrlEncoder from './components/tools/UrlEncoder'
import PasswordGenerator from './components/tools/PasswordGenerator'
import ColorConverter from './components/tools/ColorConverter'
import TextCounter from './components/tools/TextCounter'
import HashTool from './components/tools/HashTool'
import QRCodeGenerator from './components/tools/QRCodeGenerator'
import CompoundInterest from './components/tools/CompoundInterest'
import HouseCalculator from './components/tools/HouseCalculator'
import InvestmentCalculator from './components/tools/InvestmentCalculator'
import PensionCalculator from './components/tools/PensionCalculator'
import Privacy from './pages/Privacy'
import About from './pages/About'
import Terms from './pages/Terms'

const tools = [
  { id: 'json', name: 'JSON格式化', desc: '美化/压缩JSON数据', keywords: 'JSON格式化,JSON压缩,在线JSON工具' },
  { id: 'timestamp', name: '时间戳转换', desc: 'Unix时间戳互转', keywords: '时间戳转换,Unix时间戳,时间戳在线转换' },
  { id: 'base64', name: 'Base64编码', desc: 'Base64加密解密', keywords: 'Base64编码,Base64解码,在线Base64' },
  { id: 'url', name: 'URL编码', desc: 'URL特殊字符转义', keywords: 'URL编码,URL解码,URL转义' },
  { id: 'password', name: '密码生成', desc: '随机安全密码生成', keywords: '密码生成器,随机密码,安全密码' },
  { id: 'color', name: '颜色转换', desc: 'HEX/RGB/HSL互转', keywords: '颜色转换,HEX转RGB,颜色代码' },
  { id: 'text', name: '字数统计', desc: '统计字符/词/行数', keywords: '字数统计,字符统计,在线计数' },
  { id: 'hash', name: 'Hash加密', desc: 'SHA-256/MD5加密', keywords: 'Hash加密,MD5加密,SHA256' },
  { id: 'qrcode', name: '二维码生成', desc: '在线生成二维码', keywords: '二维码生成,QR码,在线二维码' },
  { id: 'compound', name: '复利计算器', desc: '复利投资收益计算', keywords: '复利计算器,复利收益,投资计算' },
  { id: 'house', name: '房贷计算器', desc: '房贷月供利息计算', keywords: '房贷计算器,贷款计算,月供计算' },
  { id: 'investment', name: '定投计算器', desc: '基金定投收益计算', keywords: '定投计算器,基金定投,收益计算' },
  { id: 'pension', name: '养老金计算器', desc: '退休养老金预测', keywords: '养老金计算器,退休规划,养老测算' },
]

function App() {
  const [activeTool, setActiveTool] = useState(null)
  const [activePage, setActivePage] = useState(null)
  const currentTool = tools.find(t => t.id === activeTool)

  const navigate = (page) => {
    setActiveTool(null)
    setActivePage(page)
  }

  useEffect(() => {
    if (currentTool) {
      document.title = `${currentTool.name} - DevTools在线工具`
      const metaDesc = document.querySelector('meta[name="description"]')
      if (metaDesc) metaDesc.content = `${currentTool.desc}，${currentTool.keywords}，免费在线工具网站。`
    } else {
      document.title = 'DevTools - 开发者必备在线工具集合'
      const metaDesc = document.querySelector('meta[name="description"]')
      if (metaDesc) metaDesc.content = 'JSON格式化、时间戳转换、Base64编码、密码生成、复利计算器、房贷计算器等免费在线工具集合。'
    }
  }, [currentTool])

  const renderTool = () => {
    if (activePage === 'privacy') return <Privacy />
    if (activePage === 'about') return <About />
    if (activePage === 'terms') return <Terms />
    switch (activeTool) {
      case 'json': return <JsonFormatter />
      case 'timestamp': return <TimestampConverter />
      case 'base64': return <Base64Tool />
      case 'url': return <UrlEncoder />
      case 'password': return <PasswordGenerator />
      case 'color': return <ColorConverter />
      case 'text': return <TextCounter />
      case 'hash': return <HashTool />
      case 'qrcode': return <QRCodeGenerator />
      case 'compound': return <CompoundInterest />
      case 'house': return <HouseCalculator />
      case 'investment': return <InvestmentCalculator />
      case 'pension': return <PensionCalculator />
      default: return (
        <div className="home">
          <div className="hero-section">
            <h1>🛠️ DevTools</h1>
            <p className="subtitle">开发者必备 + 理财工具集合</p>
            <p className="description">免费、开源、易用的在线工具网站</p>
          </div>
          <div className="ad-banner-top">
            <span className="ad-placeholder">广告位 (728x90)</span>
          </div>
          <div className="tool-grid">
            {tools.map(t => (
              <div key={t.id} className="tool-card" onClick={() => setActiveTool(t.id)}>
                <h3>{t.name}</h3>
                <p>{t.desc}</p>
              </div>
            ))}
          </div>
          <div className="ad-banner-bottom">
            <span className="ad-placeholder">广告位 (728x90)</span>
          </div>
        </div>
      )
    }
  }

  return (
    <div className="app">
      <div className="ad-header">
        <span className="ad-placeholder">广告位 (468x60)</span>
      </div>
      <header>
        <div className="logo" onClick={() => { setActiveTool(null); setActivePage(null) }}>DevTools</div>
        <nav>
          {tools.map(t => (
            <button key={t.id} className={activeTool === t.id ? 'active' : ''} onClick={() => setActiveTool(t.id)}>{t.name}</button>
          ))}
        </nav>
      </header>
      <main>{renderTool()}</main>
      <div className="ad-footer">
        <span className="ad-placeholder">广告位 (728x90)</span>
      </div>
      <footer>
        <p>© 2026 DevTools - 开发者必备工具</p>
        <p className="footer-links">
          <a href="#" onClick={(e) => { e.preventDefault(); navigate('about') }}>关于我们</a> | <a href="#" onClick={(e) => { e.preventDefault(); navigate('terms') }}>使用条款</a> | <a href="#" onClick={(e) => { e.preventDefault(); navigate('privacy') }}>隐私政策</a>
        </p>
      </footer>
    </div>
  )
}

export default App