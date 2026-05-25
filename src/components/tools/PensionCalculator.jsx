import { useState } from 'react'

export default function PensionCalculator() {
  const [currentAge, setCurrentAge] = useState(30)
  const [retireAge, setRetireAge] = useState(60)
  const [currentSavings, setCurrentSavings] = useState(100000)
  const [monthlyContribute, setMonthlyContribute] = useState(2000)
  const [expectedReturn, setExpectedReturn] = useState(6)
  const [result, setResult] = useState(null)

  const calculate = () => {
    const years = retireAge - currentAge
    const months = years * 12
    const r = expectedReturn / 100 / 12
    
    const futureSavings = currentSavings * Math.pow(1 + r, months)
    const futureContribute = monthlyContribute * ((Math.pow(1 + r, months) - 1) / r)
    
    const total = futureSavings + futureContribute
    const monthlyPension = total / 120
    
    setResult({
      total: total.toFixed(2),
      personal: futureSavings.toFixed(2),
      contribute: futureContribute.toFixed(2),
      monthly: monthlyPension.toFixed(2)
    })
  }

  return (
    <div className="tool-container">
      <h2>养老金计算器</h2>
      <div className="tool-area">
        <div className="field">
          <label>当前年龄:</label>
          <input type="number" value={currentAge} onChange={e => setCurrentAge(Number(e.target.value))} />
        </div>
        <div className="field">
          <label>退休年龄:</label>
          <input type="number" value={retireAge} onChange={e => setRetireAge(Number(e.target.value))} />
        </div>
        <div className="field">
          <label>当前储蓄 (元):</label>
          <input type="number" value={currentSavings} onChange={e => setCurrentSavings(Number(e.target.value))} />
        </div>
        <div className="field">
          <label>每月缴费 (元):</label>
          <input type="number" value={monthlyContribute} onChange={e => setMonthlyContribute(Number(e.target.value))} />
        </div>
        <div className="field">
          <label>预期年化收益 (%):</label>
          <input type="number" value={expectedReturn} onChange={e => setExpectedReturn(Number(e.target.value))} />
        </div>
        <button onClick={calculate}>计算</button>
        {result && (
          <div className="result-box">
            <div className="result-row">
              <span>退休时总资产:</span>
              <strong>¥{Number(result.total).toLocaleString()}</strong>
            </div>
            <div className="result-row">
              <span>个人账户:</span>
              <strong>¥{Number(result.personal).toLocaleString()}</strong>
            </div>
            <div className="result-row">
              <span>累计缴费:</span>
              <strong>¥{Number(result.contribute).toLocaleString()}</strong>
            </div>
            <div className="result-row">
              <span>预计月领 (按120个月):</span>
              <strong className="highlight">¥{Number(result.monthly).toLocaleString()}</strong>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}