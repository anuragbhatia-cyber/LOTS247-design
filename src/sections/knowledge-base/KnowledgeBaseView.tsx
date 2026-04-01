import data from '@/../product/sections/knowledge-base/data.json'
import { KnowledgeBase } from './components/KnowledgeBase'

export default function KnowledgeBaseView() {
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
