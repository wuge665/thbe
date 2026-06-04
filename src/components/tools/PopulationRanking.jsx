import { useState } from 'react'

const populationData = [
  { rank: 1, country: '印度', flag: '🇮🇳', value: '14.41亿' },
  { rank: 2, country: '中国', flag: '🇨🇳', value: '14.11亿' },
  { rank: 3, country: '美国', flag: '🇺🇸', value: '3.35亿' },
  { rank: 4, country: '印度尼西亚', flag: '🇮🇩', value: '2.78亿' },
  { rank: 5, country: '巴基斯坦', flag: '🇵🇰', value: '2.41亿' },
  { rank: 6, country: '尼日利亚', flag: '🇳🇬', value: '2.24亿' },
  { rank: 7, country: '巴西', flag: '🇧🇷', value: '2.16亿' },
  { rank: 8, country: '孟加拉国', flag: '🇧🇩', value: '1.73亿' },
  { rank: 9, country: '俄罗斯', flag: '🇷🇺', value: '1.44亿' },
  { rank: 10, country: '墨西哥', flag: '🇲🇽', value: '1.29亿' },
  { rank: 11, country: '埃塞俄比亚', flag: '🇪🇹', value: '1.27亿' },
  { rank: 12, country: '日本', flag: '🇯🇵', value: '1.24亿' },
  { rank: 13, country: '菲律宾', flag: '🇵🇭', value: '1.18亿' },
  { rank: 14, country: '埃及', flag: '🇪🇬', value: '1.13亿' },
  { rank: 15, country: '越南', flag: '🇻🇳', value: '0.99亿' },
  { rank: 16, country: '刚果（金）', flag: '🇨🇩', value: '1.02亿' },
  { rank: 17, country: '德国', flag: '🇩🇪', value: '0.83亿' },
  { rank: 18, country: '伊朗', flag: '🇮🇷', value: '0.89亿' },
  { rank: 19, country: '土耳其', flag: '🇹🇷', value: '0.85亿' },
  { rank: 20, country: '泰国', flag: '🇹🇭', value: '0.72亿' },
]

export default function PopulationRanking() {
  const [search, setSearch] = useState('')

  const filtered = populationData.filter(d =>
    d.country.includes(search) || d.flag.includes(search)
  )

  return (
    <div>
      <div className="field">
        <label>搜索国家:</label>
        <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="输入国家名称..." />
      </div>
      <p className="table-info">共 {populationData.length} 个国家/地区，数据仅供参考</p>
      <div className="table-wrap">
        <table className="data-table">
          <thead>
            <tr>
              <th>排名</th>
              <th></th>
              <th>国家</th>
              <th>人口</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(d => (
              <tr key={d.rank}>
                <td className="rank">{d.rank}</td>
                <td className="flag-col">{d.flag}</td>
                <td>{d.country}</td>
                <td className="num">{d.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
