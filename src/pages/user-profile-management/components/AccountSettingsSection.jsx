import React from 'react';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const AccountSettingsSection = ({ settings, onSettingChange, onDeleteAccount }) => {
  const notificationOptions = [
    { value: 'all', label: 'All Notifications' },
    { value: 'matches_only', label: 'Matches Only' },
    { value: 'messages_only', label: 'Messages Only' },
    { value: 'none', label: 'None' }
  ];

  const matchingDistanceOptions = [
    { value: '25', label: '25 miles' },
    { value: '50', label: '50 miles' },
    { value: '100', label: '100 miles' },
    { value: '250', label: '250 miles' },
    { value: 'unlimited', label: 'Unlimited' }
  ];

  const ageRangeOptions = [
    { value: '18-25', label: '18-25 years' },
    { value: '26-30', label: '26-30 years' },
    { value: '31-35', label: '31-35 years' },
    { value: '36-40', label: '36-40 years' },
    { value: '41-45', label: '41-45 years' },
    { value: '46-50', label: '46-50 years' },
    { value: '50+', label: '50+ years' }
  ];

  const languageOptions = [
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Español' },
    { value: 'fr', label: 'Français' },
    { value: 'de', label: 'Deutsch' },
    { value: 'it', label: 'Italiano' },
    { value: 'pt', label: 'Português' }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Notification Preferences</h3>
        <div className="space-y-4">
          <Select
            label="Email Notifications"
            options={notificationOptions}
            value={settings?.emailNotifications}
            onChange={(value) => onSettingChange('emailNotifications', value)}
          />
          
          <div className="space-y-3">
            <Checkbox
              label="Push notifications for new matches"
              checked={settings?.pushMatches}
              onChange={(e) => onSettingChange('pushMatches', e?.target?.checked)}
            />
            
            <Checkbox
              label="Push notifications for new messages"
              checked={settings?.pushMessages}
              onChange={(e) => onSettingChange('pushMessages', e?.target?.checked)}
            />
            
            <Checkbox
              label="Weekly travel inspiration emails"
              checked={settings?.weeklyEmails}
              onChange={(e) => onSettingChange('weeklyEmails', e?.target?.checked)}
            />
            
            <Checkbox
              label="SMS notifications for urgent messages"
              checked={settings?.smsNotifications}
              onChange={(e) => onSettingChange('smsNotifications', e?.target?.checked)}
            />
          </div>
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Matching Preferences</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Select
            label="Maximum Distance"
            options={matchingDistanceOptions}
            value={settings?.maxDistance}
            onChange={(value) => onSettingChange('maxDistance', value)}
            description="How far to search for travel partners"
          />
          
          <Select
            label="Preferred Age Range"
            options={ageRangeOptions}
            value={settings?.ageRange}
            onChange={(value) => onSettingChange('ageRange', value)}
            multiple
            description="Age range for potential travel partners"
          />
        </div>
        
        <div className="mt-6 space-y-3">
          <Checkbox
            label="Only show verified profiles"
            checked={settings?.verifiedOnly}
            onChange={(e) => onSettingChange('verifiedOnly', e?.target?.checked)}
            description="Only see profiles with verified identity"
          />
          
          <Checkbox
            label="Show profiles with similar travel budget"
            checked={settings?.similarBudget}
            onChange={(e) => onSettingChange('similarBudget', e?.target?.checked)}
            description="Prioritize matches with compatible spending preferences"
          />
          
          <Checkbox
            label="Include users with different travel styles"
            checked={settings?.diverseStyles}
            onChange={(e) => onSettingChange('diverseStyles', e?.target?.checked)}
            description="Show complementary travel personalities"
          />
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Account Preferences</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Select
            label="Language"
            options={languageOptions}
            value={settings?.language}
            onChange={(value) => onSettingChange('language', value)}
          />
        </div>
        
        <div className="mt-6 space-y-3">
          <Checkbox
            label="Show me in discovery"
            checked={settings?.showInDiscovery}
            onChange={(e) => onSettingChange('showInDiscovery', e?.target?.checked)}
            description="Allow other users to find your profile"
          />
          
          <Checkbox
            label="Auto-accept matches with high compatibility"
            checked={settings?.autoAcceptMatches}
            onChange={(e) => onSettingChange('autoAcceptMatches', e?.target?.checked)}
            description="Automatically connect with 90%+ compatible users"
          />
          
          <Checkbox
            label="Share travel plans with matches"
            checked={settings?.shareTravelPlans}
            onChange={(e) => onSettingChange('shareTravelPlans', e?.target?.checked)}
            description="Let matched partners see your upcoming trips"
          />
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Privacy & Security</h3>
        <div className="space-y-3">
          <Checkbox
            label="Hide last active status"
            checked={settings?.hideLastActive}
            onChange={(e) => onSettingChange('hideLastActive', e?.target?.checked)}
            description="Don't show when you were last online"
          />
          
          <Checkbox
            label="Require mutual match for messaging"
            checked={settings?.mutualMatchRequired}
            onChange={(e) => onSettingChange('mutualMatchRequired', e?.target?.checked)}
            description="Only allow messages from mutual matches"
          />
          
          <Checkbox
            label="Enable two-factor authentication"
            checked={settings?.twoFactorAuth}
            onChange={(e) => onSettingChange('twoFactorAuth', e?.target?.checked)}
            description="Add extra security to your account"
          />
        </div>
      </div>
      <div className="border-t border-border pt-6">
        <h3 className="text-lg font-semibold text-error mb-4">Danger Zone</h3>
        <div className="bg-error/5 p-4 rounded-lg border border-error/20">
          <div className="flex items-start space-x-3 mb-4">
            <Icon name="AlertTriangle" size={16} className="text-error mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-foreground mb-1">Delete Account</p>
              <p className="text-muted-foreground">
                Permanently delete your account and all associated data. This action cannot be undone.
              </p>
            </div>
          </div>
          <Button
            variant="destructive"
            onClick={onDeleteAccount}
            iconName="Trash2"
            iconPosition="left"
          >
            Delete Account
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AccountSettingsSection;