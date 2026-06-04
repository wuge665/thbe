import { useState } from 'react'

export default function KellyCalculator() {
  const [winProb, setWinProb] = useState(60)
  const [winLossRatio, setWinLossRatio] = useState(2)
  const [result, setResult] = useState(null)

  const calculate = () => {
    const p = winProb / 100
    const b = winLossRatio
    const q = 1 - p
    const f = (b * p - q) / b
    setResult({
      fraction: f > 0 ? (f * 100).toFixed(2) : '0',
      suggestion: f > 0
        ? `建议投入 ${(f * 100).toFixed(1)}% 的资金`
        : '不建议投入（期望值为负）'
    })
  }

  return (
    <div>
      <div className="field">
        <label>胜率 (%):</label>
        <input type="number" value={winProb} onChange={e => setWinProb(Number(e.target.value))} min="0" max="100" />
      </div>
      <div className="field">
        <label>盈亏比:</label>
        <input type="number" value={winLossRatio} onChange={e => setWinLossRatio(Number(e.target.value))} min="0" step="0.1" />
      </div>
      <button onClick={calculate}>计算</button>
      {result && (
        <div className="result-box">
          <div className="result-row">
            <span>最佳投资比例:</span>
            <strong>{result.fraction}%</strong>
          </div>
          <div className="result-row">
            <span>{result.suggestion}</span>
          </div>
        </div>
      )}
    </div>
  )
}
