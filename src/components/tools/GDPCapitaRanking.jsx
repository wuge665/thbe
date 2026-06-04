import WorldBankRanking from './WorldBankRanking'

export default function GDPCapitaRanking() {
  return (
    <div>
      <p style={{ color: '#475569', lineHeight: 1.8, marginBottom: 16, padding: '12px 16px', background: '#f8fafc', borderRadius: 8, borderLeft: '4px solid #2563eb', fontSize: 15 }}>
        人均GDP是国内生产总值除以人口数量，是衡量各国人民生活水平的重要经济指标。
      </p>
      <WorldBankRanking indicator="NY.GDP.PCAP.CD" title="世界人均GDP排名" unit="thousand" />
    </div>
  )
}
