import { useState } from 'react'

const gdpData = [
  { rank: 1, country: '美国', flag: '🇺🇸', value: '27.36万亿美元' },
  { rank: 2, country: '中国', flag: '🇨🇳', value: '17.79万亿美元' },
  { rank: 3, country: '德国', flag: '🇩🇪', value: '4.46万亿美元' },
  { rank: 4, country: '日本', flag: '🇯🇵', value: '4.21万亿美元' },
  { rank: 5, country: '印度', flag: '🇮🇳', value: '3.73万亿美元' },
  { rank: 6, country: '英国', flag: '🇬🇧', value: '3.34万亿美元' },
  { rank: 7, country: '法国', flag: '🇫🇷', value: '3.03万亿美元' },
  { rank: 8, country: '意大利', flag: '🇮🇹', value: '2.25万亿美元' },
  { rank: 9, country: '巴西', flag: '🇧🇷', value: '2.17万亿美元' },
  { rank: 10, country: '加拿大', flag: '🇨🇦', value: '2.14万亿美元' },
  { rank: 11, country: '俄罗斯', flag: '🇷🇺', value: '2.02万亿美元' },
  { rank: 12, country: '墨西哥', flag: '🇲🇽', value: '1.79万亿美元' },
  { rank: 13, country: '澳大利亚', flag: '🇦🇺', value: '1.74万亿美元' },
  { rank: 14, country: '韩国', flag: '🇰🇷', value: '1.71万亿美元' },
  { rank: 15, country: '西班牙', flag: '🇪🇸', value: '1.58万亿美元' },
  { rank: 16, country: '印度尼西亚', flag: '🇮🇩', value: '1.37万亿美元' },
  { rank: 17, country: '荷兰', flag: '🇳🇱', value: '1.12万亿美元' },
  { rank: 18, country: '沙特阿拉伯', flag: '🇸🇦', value: '1.07万亿美元' },
  { rank: 19, country: '土耳其', flag: '🇹🇷', value: '1.11万亿美元' },
  { rank: 20, country: '瑞士', flag: '🇨🇭', value: '0.88万亿美元' },
]

export default function GDPRanking() {
  const [search, setSearch] = useState('')

  const filtered = gdpData.filter(d =>
    d.country.includes(search) || d.flag.includes(search)
  )

  return (
    <div>
      <div className="field">
        <label>搜索国家:</label>
        <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="输入国家名称..." />
      </div>
      <p className="table-info">共 {gdpData.length} 个国家/地区，数据仅供参考</p>
      <div className="table-wrap">
        <table className="data-table">
          <thead>
            <tr>
              <th>排名</th>
              <th></th>
              <th>国家</th>
              <th>GDP</th>
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
