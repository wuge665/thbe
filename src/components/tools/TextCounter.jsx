import { useState } from 'react'

export default function TextCounter() {
  const [text, setText] = useState('')

  const stats = {
    chars: text.length,
    charsNoSpace: text.replace(/\s/g, '').length,
    words: text.trim() ? text.trim().split(/\s+/).length : 0,
    lines: text ? text.split('\n').length : 0,
    paragraphs: text ? text.split(/\n\s*\n/).filter(p => p.trim()).length : 0,
  }

  return (
    <div className="tool-container">
      <h2>字数统计</h2>
      <div className="tool-area">
        <textarea placeholder='请输入或粘贴文字...' value={text} onChange={e => setText(e.target.value)} style={{ height: '200px' }} />
        <div className="stats-grid">
          <div className="stat-box">
            <span className="stat-num">{stats.chars}</span>
            <span className="stat-label">总字符</span>
          </div>
          <div className="stat-box">
            <span className="stat-num">{stats.charsNoSpace}</span>
            <span className="stat-label">不含空格</span>
          </div>
          <div className="stat-box">
            <span className="stat-num">{stats.words}</span>
            <span className="stat-label">单词/词数</span>
          </div>
          <div className="stat-box">
            <span className="stat-num">{stats.lines}</span>
            <span className="stat-label">行数</span>
          </div>
          <div className="stat-box">
            <span className="stat-num">{stats.paragraphs}</span>
            <span className="stat-label">段落数</span>
          </div>
        </div>
        <button onClick={() => setText('')}>清空</button>
      </div>
    </div>
  )
}