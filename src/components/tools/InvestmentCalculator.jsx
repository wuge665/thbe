import { useState } from 'react'

export default function InvestmentCalculator() {
  const [initial, setInitial] = useState(10000)
  const [monthly, setMonthly] = useState(1000)
  const [rate, setRate] = useState(8)
  const [years, setYears] = useState(10)
  const [result, setResult] = useState(null)

  const calculate = () => {
    const r = rate / 100 / 12
    const months = years * 12
    
    const initialFuture = initial * Math.pow(1 + r, months)
    const monthlyFuture = monthly * ((Math.pow(1 + r, months) - 1) / r)
    
    const total = initialFuture + monthlyFuture
    const totalInvestment = initial + monthly * months
    const profit = total - totalInvestment
    
    setResult({
      total: total.toFixed(2),
      investment: totalInvestment.toFixed(2),
      profit: profit.toFixed(2),
      roi: ((profit / totalInvestment) * 100).toFixed(1)
    })
  }

  return (
    <div className="tool-container">
      <h2>定投收益计算器</h2>
      <div className="tool-area">
        <div className="field">
          <label>初始本金 (元):</label>
          <input type="number" value={initial} onChange={e => setInitial(Number(e.target.value))} />
        </div>
        <div className="field">
          <label>每月定投 (元):</label>
          <input type="number" value={monthly} onChange={e => setMonthly(Number(e.target.value))} />
        </div>
        <div className="field">
          <label>预期年化收益 (%):</label>
          <input type="number" value={rate} onChange={e => setRate(Number(e.target.value))} />
        </div>
        <div className="field">
          <label>投资年限:</label>
          <input type="number" value={years} onChange={e => setYears(Number(e.target.value))} />
        </div>
        <button onClick={calculate}>计算</button>
        {result && (
          <div className="result-box">
            <div className="result-row">
              <span>总资产:</span>
              <strong>¥{Number(result.total).toLocaleString()}</strong>
            </div>
            <div className="result-row">
              <span>总投入:</span>
              <strong>¥{Number(result.investment).toLocaleString()}</strong>
            </div>
            <div className="result-row">
              <span>收益:</span>
              <strong>¥{Number(result.profit).toLocaleString()}</strong>
            </div>
            <div className="result-row">
              <span>收益率:</span>
              <strong className="highlight">{result.roi}%</strong>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}