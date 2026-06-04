import WorldBankRanking from './WorldBankRanking'

export default function PopulationRanking() {
  return (
    <div>
      <p style={{ color: '#475569', lineHeight: 1.8, marginBottom: 16, padding: '12px 16px', background: '#f8fafc', borderRadius: 8, borderLeft: '4px solid #2563eb', fontSize: 15 }}>
        世界人口排名展示全球各国人口数据，数据来源于世界银行统计。
      </p>
      <WorldBankRanking indicator="SP.POP.TOTL" title="世界人口排名" unit="population" />
    </div>
  )
}
