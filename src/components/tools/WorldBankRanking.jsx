import { useState, useEffect, useRef } from 'react'
import { Chart, registerables } from 'chart.js'
import { useLang } from '../../LangContext'

Chart.register(...registerables)

function countryToFlag(code) {
  if (!code || code.length !== 2) return ''
  const cp = code.toUpperCase().split('').map(c => 0x1F1E6 + c.charCodeAt(0) - 0x41)
  return String.fromCodePoint(...cp)
}

function fmtChart(value) {
  if (value == null) return '-'
  const num = Number(value)
  if (num >= 1e12) return '$' + (num / 1e12).toFixed(2) + 'T'
  if (num >= 1e9) return '$' + (num / 1e9).toFixed(2) + 'B'
  if (num >= 1e6) return '$' + (num / 1e6).toFixed(2) + 'M'
  return '$' + num.toLocaleString()
}

export default function WorldBankRanking({ indicator, title, unit }) {
  const { t, lang } = useLang()
  const [allData, setAllData] = useState({})
  const [years, setYears] = useState([])
  const [selectedYear, setSelectedYear] = useState('')
  const [search, setSearch] = useState('')
  const [compare, setCompare] = useState([])
  const [loading, setLoading] = useState(true)
  const chartRef = useRef(null)
  const chartInstance = useRef(null)
  const [historicalData, setHistoricalData] = useState({})

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    if (chartRef.current && compare.length > 0 && historicalData.countries) {
      renderChart()
    }
    return () => {
      if (chartInstance.current) chartInstance.current.destroy()
    }
  }, [compare, historicalData, selectedYear])

  const fetchData = async () => {
    setLoading(true)
    try {
      const locale = lang === 'en' ? 'en' : 'zh'
      const res = await fetch(`https://api.worldbank.org/v2/country/all/indicator/${indicator}?format=json&per_page=5000&date=2019:2024&locale=${locale}`)
      const json = await res.json()
      if (!json[1]) return

      const byCountry = {}
      const countryHistorical = {}
      const yearSet = new Set()

      json[1].forEach(item => {
        if (!item.value) return
        const code = item.country.id
        const name = item.country.value
        const year = item.date
        const value = parseFloat(item.value)

        yearSet.add(year)

        if (!byCountry[code]) byCountry[code] = { code, name, years: {} }
        byCountry[code].years[year] = value
        byCountry[code].name = name
      })

      const sortedYears = Array.from(yearSet).sort()
      setYears(sortedYears)
      setSelectedYear(sortedYears[sortedYears.length - 1])
      setAllData(byCountry)
      setHistoricalData({ countries: byCountry, years: sortedYears })
    } catch (e) {
      console.error('Failed to fetch data:', e)
    } finally {
      setLoading(false)
    }
  }

  const getYearData = () => {
    if (!selectedYear || !allData) return []
    const arr = Object.values(allData)
      .filter(d => d.years[selectedYear] != null)
      .map(d => ({ ...d, value: d.years[selectedYear] }))
      .sort((a, b) => b.value - a.value)
    return arr
  }

  const filtered = getYearData().filter(d =>
    d.name.includes(search)
  )

  const toggleCompare = (code) => {
    setCompare(prev =>
      prev.includes(code) ? prev.filter(c => c !== code) : [...prev, code]
    )
  }

  const renderChart = () => {
    if (chartInstance.current) chartInstance.current.destroy()
    if (compare.length === 0) return

    const ctx = chartRef.current.getContext('2d')
    const colors = ['#2563eb', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4', '#f97316']

    const datasets = compare.map((code, i) => {
      const country = historicalData.countries[code]
      if (!country) return null
      const data = historicalData.years.map(y => country.years[y] || null)
      return {
        label: country.name,
        data,
        borderColor: colors[i % colors.length],
        backgroundColor: colors[i % colors.length] + '20',
        tension: 0.3,
        fill: true
      }
    }).filter(Boolean)

    chartInstance.current = new Chart(ctx, {
      type: 'line',
      data: { labels: historicalData.years, datasets },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        plugins: {
          legend: { position: 'top' },
          tooltip: {
            callbacks: {
              label: (ctx) => `${ctx.dataset.label}: ${fmtChart(ctx.raw)}`
            }
          }
        },
        scales: {
          y: {
            ticks: { callback: (v) => fmtChart(v) }
          }
        }
      }
    })
  }

  const fv = (value) => {
    if (value == null) return '-'
    const num = Number(value)
    if (unit === 'trillion') return (num / 1e12).toFixed(2) + t('unitTrillion')
    if (unit === 'thousand') return num.toLocaleString() + t('unitThousand')
    if (unit === 'population') return (num / 1e8).toFixed(2) + t('unitPopulation')
    return num.toLocaleString()
  }

  const colLabel = unit === 'population' ? t('population') : unit === 'thousand' ? t('gdpCapita') : t('gdp')

  return (
    <div>
      <div className="field" style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
        <label>{t('year')}:</label>
        <select value={selectedYear} onChange={e => setSelectedYear(e.target.value)}>
          {years.map(y => <option key={y} value={y}>{y}{lang === 'zh' ? '年' : ''}</option>)}
        </select>
        <label>{t('search')}:</label>
        <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder={t('inputCountry')} style={{ flex: 1, minWidth: 120 }} />
      </div>

      {loading && <p style={{ color: '#666', padding: 20 }}>{t('loading')}</p>}

      {!loading && (
        <>
          <p className="table-info">{t('dataFrom')} | {filtered.length} {lang === 'zh' ? '个国家/地区' : 'countries'}</p>
          <div className="table-wrap" style={{ maxHeight: 450 }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>{t('rank')}</th>
                  <th></th>
                  <th>{t('country')}</th>
                  <th style={{ textAlign: 'right' }}>{colLabel}</th>
                  <th style={{ textAlign: 'center' }}>{t('compare')}</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((d, i) => (
                  <tr key={d.code}>
                    <td className="rank">{i + 1}</td>
                    <td className="flag-col">{countryToFlag(d.code)}</td>
                    <td>{d.name}</td>
                    <td className="num">{fv(d.value)}</td>
                    <td style={{ textAlign: 'center' }}>
                      <button
                        onClick={() => toggleCompare(d.code)}
                        style={{
                          padding: '2px 10px',
                          fontSize: 12,
                          background: compare.includes(d.code) ? '#ef4444' : '#2563eb',
                          color: '#fff',
                          border: 'none',
                          borderRadius: 4,
                          cursor: 'pointer'
                        }}
                      >
                        {compare.includes(d.code) ? '×' : '+'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {compare.length > 0 && (
            <div style={{ marginTop: 24 }}>
              <h4 style={{ marginBottom: 12 }}>{t('historicalTrend')}</h4>
              <div style={{ position: 'relative', height: 300 }}>
                <canvas ref={chartRef}></canvas>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
