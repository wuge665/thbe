import { useLang } from '../../LangContext'
import WorldBankRanking from './WorldBankRanking'

export default function PopulationRanking() {
  const { t } = useLang()
  return (
    <div>
      <p className="tool-description">{t('popDesc')}</p>
      <WorldBankRanking indicator="SP.POP.TOTL" title={t('popTitle')} unit="population" />
    </div>
  )
}
