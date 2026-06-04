import { useLang } from '../../LangContext'
import WorldBankRanking from './WorldBankRanking'

export default function GDPCapitaRanking() {
  const { t } = useLang()
  return (
    <div>
      <p className="tool-description">{t('gdpCapitaDesc')}</p>
      <WorldBankRanking indicator="NY.GDP.PCAP.CD" title={t('gdpCapitaTitle')} unit="thousand" />
    </div>
  )
}
