import { useState } from 'react'

export default function PasswordGenerator() {
  const [length, setLength] = useState(16)
  const [options, setOptions] = useState({
    upper: true,
    lower: true,
    number: true,
    symbol: true
  })
  const [password, setPassword] = useState('')

  const generate = () => {
    let chars = ''
    if (options.upper) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    if (options.lower) chars += 'abcdefghijklmnopqrstuvwxyz'
    if (options.number) chars += '0123456789'
    if (options.symbol) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?'
    if (!chars) chars = 'abcdefghijklmnopqrstuvwxyz'
    
    let result = ''
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    setPassword(result)
  }

  return (
    <div className="tool-container">
      <h2>密码生成器</h2>
      <div className="tool-area">
        <div className="field">
          <label>密码长度: {length}</label>
          <input type="range" min="6" max="64" value={length} onChange={e => setLength(e.target.value)} />
        </div>
        <div className="options">
          <label><input type="checkbox" checked={options.upper} onChange={e => setOptions({...options, upper: e.target.checked})} /> 大写字母</label>
          <label><input type="checkbox" checked={options.lower} onChange={e => setOptions({...options, lower: e.target.checked})} /> 小写字母</label>
          <label><input type="checkbox" checked={options.number} onChange={e => setOptions({...options, number: e.target.checked})} /> 数字</label>
          <label><input type="checkbox" checked={options.symbol} onChange={e => setOptions({...options, symbol: e.target.checked})} /> 特殊符号</label>
        </div>
        <button className="generate-btn" onClick={generate}>生成密码</button>
        {password && (
          <div className="result-box">
            <code>{password}</code>
            <button onClick={() => navigator.clipboard.writeText(password)}>复制</button>
          </div>
        )}
      </div>
    </div>
  )
}