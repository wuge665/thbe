import { useState } from 'react'

export default function Base64Tool() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [mode, setMode] = useState('encode')

  const handleConvert = () => {
    try {
      if (mode === 'encode') {
        setOutput(btoa(unescape(encodeURIComponent(input))))
      } else {
        setOutput(decodeURIComponent(escape(atob(input))))
      }
    } catch (e) {
      setOutput('错误: ' + e.message)
    }
  }

  return (
    <div className="tool-container">
      <h2>Base64编码/解码</h2>
      <div className="tool-area">
        <div className="tabs">
          <button className={mode === 'encode' ? 'active' : ''} onClick={() => { setMode('encode'); setOutput('') }}>编码</button>
          <button className={mode === 'decode' ? 'active' : ''} onClick={() => { setMode('decode'); setOutput('') }}>解码</button>
        </div>
        <textarea placeholder={mode === 'encode' ? '输入字符串...' : '输入Base64...'} value={input} onChange={e => setInput(e.target.value)} />
        <button className="convert-btn" onClick={handleConvert}>{mode === 'encode' ? '编码' : '解码'}</button>
        <textarea placeholder='结果' value={output} readOnly />
        {output && <button className="copy-btn" onClick={() => navigator.clipboard.writeText(output)}>复制</button>}
      </div>
    </div>
  )
}