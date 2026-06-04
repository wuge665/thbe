import { useState } from 'react'

export default function StockAverage() {
  const [entries, setEntries] = useState([
    { price: 10, shares: 1000 },
    { price: 8, shares: 500 }
  ])
  const [result, setResult] = useState(null)

  const addEntry = () => {
    setEntries([...entries, { price: 0, shares: 0 }])
    setResult(null)
  }

  const removeEntry = (i) => {
    if (entries.length <= 1) return
    setEntries(entries.filter((_, idx) => idx !== i))
    setResult(null)
  }

  const updateEntry = (i, field, value) => {
    const updated = entries.map((e, idx) =>
      idx === i ? { ...e, [field]: Number(value) } : e
    )
    setEntries(updated)
    setResult(null)
  }

  const calculate = () => {
    const totalCost = entries.reduce((sum, e) => sum + e.price * e.shares, 0)
    const totalShares = entries.reduce((sum, e) => sum + e.shares, 0)
    const avgPrice = totalShares > 0 ? totalCost / totalShares : 0
    setResult({
      avgPrice: avgPrice.toFixed(4),
      totalCost: totalCost.toFixed(2),
      totalShares
    })
  }

  return (
    <div>
      {entries.map((e, i) => (
        <div key={i} className="field-group" style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8 }}>
          <span style={{ minWidth: 20, fontWeight: 600 }}>#{i + 1}</span>
          <label style={{ minWidth: 50 }}>买入价:</label>
          <input type="number" value={e.price} onChange={ev => updateEntry(i, 'price', ev.target.value)} step="0.01" style={{ width: 120 }} />
          <label style={{ minWidth: 50 }}>股数:</label>
          <input type="number" value={e.shares} onChange={ev => updateEntry(i, 'shares', ev.target.value)} style={{ width: 120 }} />
          <button onClick={() => removeEntry(i)} style={{ padding: '4px 8px', background: '#ef4444', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer' }}>×</button>
        </div>
      ))}
      <div style={{ marginTop: 8 }}>
        <button onClick={addEntry} style={{ marginRight: 8, background: '#f1f5f9', color: '#333' }}>+ 加仓</button>
        <button onClick={calculate}>计算均价</button>
      </div>
      {result && (
        <div className="result-box">
          <div className="result-row">
            <span>持仓均价:</span>
            <strong>¥{result.avgPrice}</strong>
          </div>
          <div className="result-row">
            <span>总投入:</span>
            <strong>¥{Number(result.totalCost).toLocaleString()}</strong>
          </div>
          <div className="result-row">
            <span>总股数:</span>
            <strong>{result.totalShares.toLocaleString()} 股</strong>
          </div>
        </div>
      )}
    </div>
  )
}
