import { useState } from 'react'

export default function CompoundInterest() {
  const [principal, setPrincipal] = useState(10000)
  const [rate, setRate] = useState(5)
  const [years, setYears] = useState(10)
  const [freq, setFreq] = useState(12)
  const [result, setResult] = useState(null)

  const calculate = () => {
    const r = rate / 100
    const n = freq
    const t = years
    const amount = principal * Math.pow(1 + r/n, n*t)
    const interest = amount - principal
    setResult({
      amount: amount.toFixed(2),
      interest: interest.toFixed(2),
      total: (principal + interest).toFixed(2)
    })
  }

  return (
    <div className="tool-container">
      <h2>复利计算器</h2>
      <div className="tool-area">
        <div className="field">
          <label>初始本金 (元):</label>
          <input type="number" value={principal} onChange={e => setPrincipal(Number(e.target.value))} />
        </div>
        <div className="field">
          <label>年利率 (%):</label>
          <input type="number" value={rate} onChange={e => setRate(Number(e.target.value))} />
        </div>
        <div className="field">
          <label>投资年限:</label>
          <input type="number" value={years} onChange={e => setYears(Number(e.target.value))} />
        </div>
        <div className="field">
          <label>复利频率:</label>
          <select value={freq} onChange={e => setFreq(Number(e.target.value))}>
            <option value={1}>每年</option>
            <option value={4}>每季度</option>
            <option value={12}>每月</option>
            <option value={365}>每天</option>
          </select>
        </div>
        <button onClick={calculate}>计算</button>
        {result && (
          <div className="result-box">
            <div className="result-row">
              <span>最终本息:</span>
              <strong>¥{Number(result.amount).toLocaleString()}</strong>
            </div>
            <div className="result-row">
              <span>利息收益:</span>
              <strong>¥{Number(result.interest).toLocaleString()}</strong>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}