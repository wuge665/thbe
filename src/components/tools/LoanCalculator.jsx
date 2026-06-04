import { useState } from 'react'

export default function LoanCalculator() {
  const [amount, setAmount] = useState(1000000)
  const [rate, setRate] = useState(4.5)
  const [years, setYears] = useState(30)
  const [type, setType] = useState('equal-payment')
  const [result, setResult] = useState(null)

  const calculate = () => {
    const monthlyRate = rate / 100 / 12
    const months = years * 12

    if (type === 'equal-payment') {
      const payment = amount * monthlyRate * Math.pow(1 + monthlyRate, months) / (Math.pow(1 + monthlyRate, months) - 1)
      const totalPayment = payment * months
      const totalInterest = totalPayment - amount
      setResult({
        monthlyPayment: payment.toFixed(2),
        totalPayment: totalPayment.toFixed(2),
        totalInterest: totalInterest.toFixed(2),
        type: '等额本息'
      })
    } else {
      const monthlyPrincipal = amount / months
      let totalPayment = 0
      const firstMonthInterest = amount * monthlyRate
      const firstMonthPayment = monthlyPrincipal + firstMonthInterest
      const lastMonthInterest = monthlyPrincipal * monthlyRate
      const lastMonthPayment = monthlyPrincipal + lastMonthInterest
      totalPayment = months * monthlyPrincipal + monthlyRate * (amount + monthlyPrincipal) * months / 2
      const totalInterest = totalPayment - amount
      setResult({
        monthlyPayment: `${firstMonthPayment.toFixed(2)} ~ ${lastMonthPayment.toFixed(2)}`,
        totalPayment: totalPayment.toFixed(2),
        totalInterest: totalInterest.toFixed(2),
        type: '等额本金',
        firstPayment: firstMonthPayment.toFixed(2),
        lastPayment: lastMonthPayment.toFixed(2)
      })
    }
  }

  return (
    <div>
      <div className="field">
        <label>贷款总额 (元):</label>
        <input type="number" value={amount} onChange={e => setAmount(Number(e.target.value))} />
      </div>
      <div className="field">
        <label>年利率 (%):</label>
        <input type="number" value={rate} onChange={e => setRate(Number(e.target.value))} step="0.1" />
      </div>
      <div className="field">
        <label>贷款期限:</label>
        <select value={years} onChange={e => setYears(Number(e.target.value))}>
          <option value={5}>5年</option>
          <option value={10}>10年</option>
          <option value={15}>15年</option>
          <option value={20}>20年</option>
          <option value={25}>25年</option>
          <option value={30}>30年</option>
        </select>
      </div>
      <div className="field">
        <label>还款方式:</label>
        <select value={type} onChange={e => setType(e.target.value)}>
          <option value="equal-payment">等额本息</option>
          <option value="equal-principal">等额本金</option>
        </select>
      </div>
      <button onClick={calculate}>计算</button>
      {result && (
        <div className="result-box">
          <div className="result-row">
            <span>还款方式:</span>
            <strong>{result.type}</strong>
          </div>
          <div className="result-row">
            <span>月供:</span>
            <strong>¥{result.monthlyPayment}</strong>
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
  )
}
