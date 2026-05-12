import { useEffect, useState } from 'react'
import data from '@/../product/sections/wallet/data.json'
import { WalletView } from './components/WalletView'
import { WalletSkeleton } from './components/WalletSkeleton'

export default function WalletViewPreview() {
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 900)
    return () => clearTimeout(t)
  }, [])
  if (isLoading) return <WalletSkeleton />
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
