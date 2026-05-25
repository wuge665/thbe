import { useEffect } from 'react'
import { Routes, Route, useNavigate, useParams, useLocation } from 'react-router-dom'
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
  { id: 'json', name: 'JSON格式化', desc: '美化/压缩JSON数据', keywords: 'JSON格式化,JSON压缩,在线JSON工具', content: 'JSON格式化工具用于美化和压缩JSON数据。开发者经常需要查看API返回的JSON结构，格式化功能可以将杂乱的JSON字符串转换成缩进清晰的层级结构，方便阅读和调试。压缩功能则去除空格和换行，减小数据体积，适合传输或存储。支持粘贴任意JSON字符串一键格式化。' },
  { id: 'timestamp', name: '时间戳转换', desc: 'Unix时间戳互转', keywords: '时间戳转换,Unix时间戳,时间戳在线转换', content: '时间戳转换工具支持Unix时间戳与标准日期时间格式之间的双向转换。Unix时间戳是从1970年1月1日开始经过的秒数，广泛用于程序开发和数据库存储。输入时间戳可查看对应的日期和时间，选择日期时间也可生成对应的时间戳。支持毫秒级精度。' },
  { id: 'base64', name: 'Base64编码', desc: 'Base64加密解密', keywords: 'Base64编码,Base64解码,在线Base64', content: 'Base64编码工具支持文本的Base64编码和解码操作。Base64是一种用64个可打印字符表示二进制数据的编码方式，常用于在URL、Cookie和网页中传输二进制数据。输入文本可快速编码为Base64格式，也可将Base64字符串解码还原为原文。' },
  { id: 'url', name: 'URL编码', desc: 'URL特殊字符转义', keywords: 'URL编码,URL解码,URL转义', content: 'URL编码工具用于对URL中的特殊字符进行转义和解码。URL中不允许出现中文、空格等特殊字符，编码功能将这些字符转换为%xx格式，确保链接可以被正确解析。解码功能则还原为原始字符。常用于前端开发、API调试和网页数据提交。' },
  { id: 'password', name: '密码生成', desc: '随机安全密码生成', keywords: '密码生成器,随机密码,安全密码', content: '密码生成器用于创建高强度的随机密码，保护账号安全。可自定义密码长度（6-64位），选择是否包含大写字母、小写字母、数字和特殊符号。组合越多、长度越长，密码强度越高。生成的密码可一键复制使用。建议使用16位以上包含全部字符类型的密码。' },
  { id: 'color', name: '颜色转换', desc: 'HEX/RGB/HSL互转', keywords: '颜色转换,HEX转RGB,颜色代码', content: '颜色转换工具支持HEX、RGB和HSL三种颜色格式之间的互转。前端开发中经常需要在不同颜色格式间切换，输入任意格式的颜色值即可自动识别并转换为其他格式。同时显示颜色预览色块，方便直观对比。支持HEX6位简写、HEX完整格式和RGB函数格式。' },
  { id: 'text', name: '字数统计', desc: '统计字符/词/行数', keywords: '字数统计,字符统计,在线计数', content: '字数统计工具快速统计文本的字符数、单词数和行数。支持中英文混合内容，自动识别并统计中文字数（按字统计）、英文字数（按单词统计）、总字符数（含空格和不含空格）以及段落行数。适合写作者、编辑和内容运营人员使用。' },
  { id: 'hash', name: 'Hash加密', desc: 'SHA-256/MD5加密', keywords: 'Hash加密,MD5加密,SHA256', content: 'Hash加密工具支持MD5和SHA-256两种主流哈希算法，将任意文本转换为固定长度的哈希值。哈希加密不可逆，常用于密码存储、文件完整性校验和数据指纹验证。支持同时计算MD5和SHA-256结果，一键对比哈希值。' },
  { id: 'qrcode', name: '二维码生成', desc: '在线生成二维码', keywords: '二维码生成,QR码,在线二维码', content: '二维码生成器可快速将文本、网址、联系方式等内容生成二维码图片。输入任意内容即可实时生成对应的QR码，支持下载为PNG图片。适用于分享链接、名片信息、WiFi配置等场景。生成的二维码符合国际QR码标准，扫码即可识别。' },
  { id: 'compound', name: '复利计算器', desc: '复利投资收益计算', keywords: '复利计算器,复利收益,投资计算', content: '复利计算器帮助投资者计算复利投资的最终收益。复利被称为世界第八大奇迹，本金产生的利息加入本金继续产生收益。输入本金、年化收益率、投资年限和复利频率，即可计算到期总金额和利息收益。支持按年、半年、季度和月度复利。' },
  { id: 'house', name: '房贷计算器', desc: '房贷月供利息计算', keywords: '房贷计算器,贷款计算,月供计算', content: '房贷计算器用于计算商业贷款和公积金贷款的月供金额和总利息。支持等额本息和等额本金两种还款方式。输入贷款总额、年利率和贷款年限即可得到详细的还款计划表，包括每月还款额、利息占比和还款总额。帮助购房者合理规划贷款方案。' },
  { id: 'investment', name: '定投计算器', desc: '基金定投收益计算', keywords: '定投计算器,基金定投,收益计算', content: '定投计算器模拟基金定投的长期收益。定投是定期定额投资基金的方式，通过长期坚持和复利效应实现财富增值。输入每月定投金额、预期年化收益率和定投年限，可计算出到期总投入、总收益和最终资产总值。展示不同收益率下的收益对比。' },
  { id: 'pension', name: '养老金计算器', desc: '退休养老金预测', keywords: '养老金计算器,退休规划,养老测算', content: '养老金计算器帮助规划退休养老储备。输入当前年龄、预计退休年龄、当前月支出、预期通胀率和已储备金额，系统将计算退休后每月所需生活费以及养老金总缺口。提前规划养老，确保退休生活品质。建议每年重新评估养老计划。' },
]

function Home() {
  const navigate = useNavigate()

  useEffect(() => {
    document.title = 'DevTools - 开发者必备在线工具集合'
    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) metaDesc.content = 'JSON格式化、时间戳转换、Base64编码、密码生成、复利计算器、房贷计算器等免费在线工具集合。'
  }, [])

  return (
    <div className="home">
      <div className="hero-section">
        <h1>DevTools</h1>
        <p className="subtitle">开发者必备 + 理财工具集合</p>
        <p className="description">免费、开源、易用的在线工具网站</p>
      </div>
      <div className="tool-grid">
        {tools.map(t => (
          <div key={t.id} className="tool-card" onClick={() => navigate(`/tool/${t.id}`)}>
            <h3>{t.name}</h3>
            <p>{t.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function ToolPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const tool = tools.find(t => t.id === id)

  useEffect(() => {
    if (!tool) { navigate('/', { replace: true }); return }
    document.title = `${tool.name} - DevTools在线工具`
    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) metaDesc.content = `${tool.desc}，${tool.keywords}，免费在线工具网站。`
  }, [tool, navigate])

  if (!tool) return null

  const renderToolComponent = () => {
    switch (id) {
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
      default: return null
    }
  }

  return (
    <div className="tool-container">
      <h2>{tool.name}</h2>
      <p className="tool-description">{tool.content}</p>
      <div className="tool-area">{renderToolComponent()}</div>
    </div>
  )
}

function LegalPage({ title, children, updateMeta }) {
  useEffect(() => {
    document.title = `${title} - DevTools`
    if (updateMeta) updateMeta()
    else {
      const metaDesc = document.querySelector('meta[name="description"]')
      if (metaDesc) metaDesc.content = `${title} - DevTools在线工具网站`
    }
  }, [title, updateMeta])
  return <div className="legal-content">{children}</div>
}

function App() {
  const navigate = useNavigate()
  const location = useLocation()

  const isActiveTool = (id) => location.pathname === `/tool/${id}`
  const isActivePage = (page) => location.pathname === `/${page}`

  return (
    <div className="app">
      <header>
        <div className="logo" onClick={() => navigate('/')}>DevTools</div>
        <nav>
          {tools.map(t => (
            <button key={t.id} className={isActiveTool(t.id) ? 'active' : ''} onClick={() => navigate(`/tool/${t.id}`)}>{t.name}</button>
          ))}
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tool/:id" element={<ToolPage />} />
          <Route path="/about" element={
            <LegalPage title="关于我们">
              <About />
            </LegalPage>
          } />
          <Route path="/privacy" element={
            <LegalPage title="隐私政策">
              <Privacy />
            </LegalPage>
          } />
          <Route path="/terms" element={
            <LegalPage title="使用条款">
              <Terms />
            </LegalPage>
          } />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <footer>
        <p>© 2026 DevTools - 开发者必备工具</p>
        <p className="footer-links">
          <a href="#" onClick={(e) => { e.preventDefault(); navigate('/about') }}>关于我们</a> | <a href="#" onClick={(e) => { e.preventDefault(); navigate('/terms') }}>使用条款</a> | <a href="#" onClick={(e) => { e.preventDefault(); navigate('/privacy') }}>隐私政策</a>
        </p>
      </footer>
    </div>
  )
}

export default App
