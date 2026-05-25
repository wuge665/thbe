import { useState } from 'react'

export default function JsonFormatter() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')

  const handleFormat = () => {
    try {
      const parsed = JSON.parse(input)
      setOutput(JSON.stringify(parsed, null, 2))
      setError('')
    } catch (e) {
      setError('JSON格式错误: ' + e.message)
    }
  }

  const handleCompress = () => {
    try {
      const parsed = JSON.parse(input)
      setOutput(JSON.stringify(parsed))
      setError('')
    } catch (e) {
      setError('JSON格式错误: ' + e.message)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(output)
    alert('已复制!')
  }

  return (
    <div className="tool-container">
      <h2>JSON格式化</h2>
      <div className="tool-area">
        <textarea placeholder='输入JSON...' value={input} onChange={e => setInput(e.target.value)} />
        <div className="buttons">
          <button onClick={handleFormat}>格式化</button>
          <button onClick={handleCompress}>压缩</button>
          <button onClick={() => { setInput(''); setOutput('') }}>清空</button>
        </div>
        <textarea placeholder='输出结果' value={output} readOnly />
        {error && <div className="error">{error}</div>}
        {output && <button className="copy-btn" onClick={handleCopy}>复制结果</button>}
      </div>
    </div>
  )
}