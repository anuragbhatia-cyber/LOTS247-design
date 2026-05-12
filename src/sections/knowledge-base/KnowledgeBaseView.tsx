import { useEffect, useState } from 'react'
import data from '@/../product/sections/knowledge-base/data.json'
import { KnowledgeBase } from './components/KnowledgeBase'
import { KnowledgeBaseSkeleton } from './components/KnowledgeBaseSkeleton'

export default function KnowledgeBaseView() {
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 900)
    return () => clearTimeout(t)
  }, [])
  if (isLoading) return <KnowledgeBaseSkeleton />
  return (
    <KnowledgeBase
      articles={data.articles}
      faqItems={data.faqItems}
      checklistItems={data.checklistItems}
      onDownloadTemplate={(id) => console.log('Download template:', id)}
      onCopyTemplate={(id) => console.log('Copy template:', id)}
      onHelpful={(id) => console.log('Helpful:', id)}
      onNotHelpful={(id) => console.log('Not helpful:', id)}
    />
  )
}
