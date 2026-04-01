import data from '@/../product/sections/settings/data.json'
import { Settings } from './components/Settings'

export default function SettingsPreview() {
  return (
    <Settings
      notificationPreferences={data.notificationPreferences as any}
      quietHours={data.quietHours as any}
      dailyDigest={data.dailyDigest as any}
      appPreferences={data.appPreferences as any}
      subscription={data.subscription as any}
      billingHistory={data.billingHistory as any}
      availablePlans={data.availablePlans as any}
      paymentMethods={data.paymentMethods as any}
      teamMembers={data.teamMembers as any}
      scheduledReports={data.scheduledReports as any}
      generalSettings={data.generalSettings as any}
      isFleetOrBusiness={true}
      onToggleChannel={(categoryId, channel, enabled) =>
        console.log('Toggle channel:', categoryId, channel, enabled)
      }
      onUpdateQuietHours={(qh) => console.log('Update quiet hours:', qh)}
      onToggleDailyDigest={(enabled) => console.log('Toggle daily digest:', enabled)}
      onChangeLandingPage={(page) => console.log('Change landing page:', page)}
      onToggleSidebarBadges={(enabled) => console.log('Toggle sidebar badges:', enabled)}
      onChangePlan={(planId) => console.log('Change plan:', planId)}
      onDownloadInvoice={(invoiceId) => console.log('Download invoice:', invoiceId)}
      onInviteMember={() => console.log('Invite member')}
      onChangeRole={(memberId, role) => console.log('Change role:', memberId, role)}
      onRemoveMember={(memberId) => console.log('Remove member:', memberId)}
      onToggleReport={(reportId, enabled) => console.log('Toggle report:', reportId, enabled)}
      onUpdateGeneralSettings={(settings) => console.log('Update general settings:', settings)}
    />
  )
}
