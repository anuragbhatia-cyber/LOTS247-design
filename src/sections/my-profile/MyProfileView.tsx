import { useEffect, useState } from 'react'
import data from '@/../product/sections/my-profile/data.json'
import { MyProfile } from './components/MyProfile'
import { MyProfileSkeleton } from './components/MyProfileSkeleton'

export default function MyProfilePreview() {
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 900)
    return () => clearTimeout(t)
  }, [])
  if (isLoading) return <MyProfileSkeleton />
  return (
    <MyProfile
      subscriberProfile={data.subscriberProfile as any}
      organizationDetails={data.organizationDetails as any}
      kycDocuments={data.kycDocuments as any}
      onUpdatePersonalInfo={(d) => console.log('Update personal info:', d)}
      onUpdateOrganization={(d) => console.log('Update organization:', d)}
      onUploadKycDocument={(type) => console.log('Upload KYC document:', type)}
      onReuploadKycDocument={(id) => console.log('Re-upload KYC document:', id)}
      onUploadProfilePhoto={() => console.log('Upload profile photo')}
      onRemoveProfilePhoto={() => console.log('Remove profile photo')}
      onChangePhone={(phone) => console.log('Change phone:', phone)}
    />
  )
}
