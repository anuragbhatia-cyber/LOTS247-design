import data from '@/../product/sections/wallet/data.json'
import { WalletView } from './components/WalletView'

export default function WalletViewPreview() {
  return (
    <WalletView
      walletSummary={data.walletSummary}
      transactions={data.transactions as any}
      quickAmounts={data.quickAmounts}
      onAddMoney={(amount) => console.log('Add money:', amount)}
      onViewTransaction={(id) => console.log('View transaction:', id)}
      onNavigateToEntity={(type, id) => console.log('Navigate to entity:', type, id)}
      onFilterChange={(filters) => console.log('Filters changed:', filters)}
      onSearch={(query) => console.log('Search:', query)}
    />
  )
}
