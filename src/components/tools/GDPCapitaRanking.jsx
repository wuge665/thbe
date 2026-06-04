import { useState } from 'react'

const gdpCapitaData = [
  { rank: 1, country: '卢森堡', flag: '🇱🇺', value: '13.6万美元' },
  { rank: 2, country: '瑞士', flag: '🇨🇭', value: '10.0万美元' },
  { rank: 3, country: '挪威', flag: '🇳🇴', value: '8.9万美元' },
  { rank: 4, country: '爱尔兰', flag: '🇮🇪', value: '10.4万美元' },
  { rank: 5, country: '卡塔尔', flag: '🇶🇦', value: '8.8万美元' },
  { rank: 6, country: '美国', flag: '🇺🇸', value: '8.2万美元' },
  { rank: 7, country: '丹麦', flag: '🇩🇰', value: '6.8万美元' },
  { rank: 8, country: '新加坡', flag: '🇸🇬', value: '8.8万美元' },
  { rank: 9, country: '冰岛', flag: '🇮🇸', value: '7.8万美元' },
  { rank: 10, country: '瑞典', flag: '🇸🇪', value: '6.4万美元' },
  { rank: 11, country: '澳大利亚', flag: '🇦🇺', value: '6.5万美元' },
  { rank: 12, country: '荷兰', flag: '🇳🇱', value: '6.3万美元' },
  { rank: 13, country: '奥地利', flag: '🇦🇹', value: '5.8万美元' },
  { rank: 14, country: '芬兰', flag: '🇫🇮', value: '5.6万美元' },
  { rank: 15, country: '加拿大', flag: '🇨🇦', value: '5.5万美元' },
  { rank: 16, country: '德国', flag: '🇩🇪', value: '5.3万美元' },
  { rank: 17, country: '英国', flag: '🇬🇧', value: '4.9万美元' },
  { rank: 18, country: '法国', flag: '🇫🇷', value: '4.6万美元' },
  { rank: 19, country: '日本', flag: '🇯🇵', value: '3.4万美元' },
  { rank: 20, country: '中国', flag: '🇨🇳', value: '1.3万美元' },
]

export default function GDPCapitaRanking() {
  const [search, setSearch] = useState('')

  const filtered = gdpCapitaData.filter(d =>
    d.country.includes(search) || d.flag.includes(search)
  )

  return (
    <div>
      <div className="field">
        <label>搜索国家:</label>
        <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="输入国家名称..." />
      </div>
      <p className="table-info">共 {gdpCapitaData.length} 个国家/地区，数据仅供参考</p>
      <div className="table-wrap">
        <table className="data-table">
          <thead>
            <tr>
              <th>排名</th>
              <th></th>
              <th>国家</th>
              <th>人均GDP</th>
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
