import { useLang } from '../../LangContext'
import WorldBankRanking from './WorldBankRanking'

export default function GDPRanking() {
  const { t } = useLang()
  return (
    <div>
      <p className="tool-description">{t('gdpDesc')}</p>
      <WorldBankRanking indicator="NY.GDP.MKTP.CD" title={t('gdpTitle')} unit="trillion" />
    </div>
  )
}
