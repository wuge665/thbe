import WorldBankRanking from './WorldBankRanking'

export default function GDPRanking() {
  return (
    <div>
      <p style={{ color: '#475569', lineHeight: 1.8, marginBottom: 16, padding: '12px 16px', background: '#f8fafc', borderRadius: 8, borderLeft: '4px solid #2563eb', fontSize: 15 }}>
        GDP是指国内生产总值，即国内生产的所有商品的价值总和。GDP是最常用的比较国家间经济实力的资料。
      </p>
      <WorldBankRanking indicator="NY.GDP.MKTP.CD" title="世界GDP排名" unit="trillion" />
    </div>
  )
}
