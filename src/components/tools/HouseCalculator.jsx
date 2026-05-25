import { useState } from 'react'

export default function HouseCalculator() {
  const [housePrice, setHousePrice] = useState(2000000)
  const [downPayment, setDownPayment] = useState(600000)
  const [loanYears, setLoanYears] = useState(30)
  const [rate, setRate] = useState(4.1)
  const [result, setResult] = useState(null)

  const calculate = () => {
    const loan = housePrice - downPayment
    const monthlyRate = rate / 100 / 12
    const months = loanYears * 12
    const monthlyPayment = loan * monthlyRate * Math.pow(1 + monthlyRate, months) / (Math.pow(1 + monthlyRate, months) - 1)
    const totalPayment = monthlyPayment * months
    const totalInterest = totalPayment - loan
    
    setResult({
      monthlyPayment: monthlyPayment.toFixed(2),
      totalPayment: totalPayment.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
      loan
    })
  }

  return (
    <div className="tool-container">
      <h2>房贷计算器</h2>
      <div className="tool-area">
        <div className="field">
          <label>房屋总价 (元):</label>
          <input type="number" value={housePrice} onChange={e => setHousePrice(Number(e.target.value))} />
        </div>
        <div className="field">
          <label>首付金额 (元):</label>
          <input type="number" value={downPayment} onChange={e => setDownPayment(Number(e.target.value))} />
        </div>
        <div className="field">
          <label>贷款年限:</label>
          <select value={loanYears} onChange={e => setLoanYears(Number(e.target.value))}>
            <option value={10}>10年</option>
            <option value={15}>15年</option>
            <option value={20}>20年</option>
            <option value={30}>30年</option>
          </select>
        </div>
        <div className="field">
          <label>年利率 (%):</label>
          <input type="number" value={rate} onChange={e => setRate(Number(e.target.value))} step="0.1" />
        </div>
        <button onClick={calculate}>计算</button>
        {result && (
          <div className="result-box">
            <div className="result-row">
              <span>月供:</span>
              <strong>¥{Number(result.monthlyPayment).toLocaleString()}</strong>
            </div>
            <div className="result-row">
              <span>贷款总额:</span>
              <strong>¥{Number(result.loan).toLocaleString()}</strong>
            </div>
            <div className="result-row">
              <span>利息总额:</span>
              <strong>¥{Number(result.totalInterest).toLocaleString()}</strong>
            </div>
            <div className="result-row">
              <span>还款总额:</span>
              <strong>¥{Number(result.totalPayment).toLocaleString()}</strong>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}