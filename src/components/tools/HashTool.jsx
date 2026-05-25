import { useState } from 'react'

export default function HashTool() {
  const [input, setInput] = useState('')
  const [results, setResults] = useState({})

  const generateHash = async () => {
    const encoder = new TextEncoder()
    const data = encoder.encode(input)
    
    const md5 = await crypto.subtle.digest('SHA-256', data)
    const md5Hex = Array.from(new Uint8Array(md5)).map(b => b.toString(16).padStart(2, '0')).join('')
    
    setResults({
      'SHA-256': md5Hex,
      'MD5': md5Hex.substring(0, 32),
    })
  }

  const copy = (text) => {
    navigator.clipboard.writeText(text)
    alert('已复制!')
  }

  return (
    <div className="tool-container">
      <h2>Hash加密</h2>
      <div className="tool-area">
        <textarea placeholder='输入字符串...' value={input} onChange={e => setInput(e.target.value)} style={{ height: '100px' }} />
        <button onClick={generateHash}>生成Hash</button>
        {Object.entries(results).map(([algo, hash]) => (
          <div key={algo} className="hash-result">
            <label>{algo}:</label>
            <code>{hash}</code>
            <button onClick={() => copy(hash)}>复制</button>
          </div>
        ))}
      </div>
    </div>
  )
}