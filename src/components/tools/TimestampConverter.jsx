import { useState, useEffect } from 'react'

export default function TimestampConverter() {
  const [timestamp, setTimestamp] = useState(Math.floor(Date.now() / 1000))
  const [dateTime, setDateTime] = useState('')
  const [current, setCurrent] = useState('')

  useEffect(() => {
    const update = () => setCurrent(Math.floor(Date.now() / 1000))
    update()
    const interval = setInterval(update, 1000)
    return () => clearInterval(interval)
  }, [])

  const toDate = () => {
    try {
      const date = new Date(timestamp * 1000)
      setDateTime(date.toLocaleString('zh-CN'))
    } catch (e) {
      setDateTime('无效时间戳')
    }
  }

  const fromDate = () => {
    try {
      const date = new Date(dateTime)
      setTimestamp(Math.floor(date.getTime() / 1000))
    } catch (e) {
      setTimestamp(0)
    }
  }

  const toNow = () => {
    setTimestamp(Math.floor(Date.now() / 1000))
  }

  return (
    <div className="tool-container">
      <h2>时间戳转换</h2>
      <div className="tool-area">
        <div className="field">
          <label>当前时间戳: </label>
          <span className="highlight">{current}</span>
          <button onClick={() => setTimestamp(current)}>使用当前</button>
        </div>
        <div className="field">
          <label>时间戳 → 日期:</label>
          <input type="number" value={timestamp} onChange={e => setTimestamp(e.target.value)} />
          <button onClick={toDate}>转换</button>
        </div>
        {dateTime && <div className="result">{dateTime}</div>}
        <div className="field">
          <label>日期 → 时间戳:</label>
          <input type="datetime-local" onChange={e => setDateTime(e.target.value)} />
          <button onClick={fromDate}>转换</button>
        </div>
        <div className="tips">
          <p>💡 常用快捷: <button onClick={toNow}>获取当前</button></p>
        </div>
      </div>
    </div>
  )
}