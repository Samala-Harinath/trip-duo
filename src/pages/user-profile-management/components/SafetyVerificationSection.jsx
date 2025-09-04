import React from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const SafetyVerificationSection = ({ safetyData, onSafetyChange, onDocumentUpload }) => {
  const verificationItems = [
    {
      id: 'email',
      label: 'Email Verification',
      status: 'verified',
      description: 'Email address confirmed',
      icon: 'Mail'
    },
    {
      id: 'phone',
      label: 'Phone Verification',
      status: 'pending',
      description: 'SMS verification pending',
      icon: 'Phone'
    },
    {
      id: 'id_document',
      label: 'Government ID',
      status: 'not_verified',
      description: 'Upload government-issued ID',
      icon: 'CreditCard'
    },
    {
      id: 'background_check',
      label: 'Background Check',
      status: 'not_verified',
      description: 'Optional enhanced verification',
      icon: 'Shield'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'verified': return 'text-success';
      case 'pending': return 'text-warning';
      case 'not_verified': return 'text-muted-foreground';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'verified': return 'CheckCircle';
      case 'pending': return 'Clock';
      case 'not_verified': return 'AlertCircle';
      default: return 'AlertCircle';
    }
  };

  const handleFileUpload = (type, e) => {
    const file = e?.target?.files?.[0];
    if (file) {
      onDocumentUpload(type, file);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Verification Status</h3>
        <div className="space-y-4">
          {verificationItems?.map((item) => (
            <div key={item?.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                  <Icon name={item?.icon} size={20} className="text-muted-foreground" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">{item?.label}</h4>
                  <p className="text-sm text-muted-foreground">{item?.description}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Icon 
                  name={getStatusIcon(item?.status)} 
                  size={20} 
                  className={getStatusColor(item?.status)} 
                />
                {item?.status === 'not_verified' && (
                  <Button variant="outline" size="sm">
                    Verify
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Emergency Contacts</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Emergency Contact Name"
            type="text"
            placeholder="Full name"
            value={safetyData?.emergencyContactName}
            onChange={(e) => onSafetyChange('emergencyContactName', e?.target?.value)}
          />
          
          <Input
            label="Emergency Contact Phone"
            type="tel"
            placeholder="+1 (555) 123-4567"
            value={safetyData?.emergencyContactPhone}
            onChange={(e) => onSafetyChange('emergencyContactPhone', e?.target?.value)}
          />
        </div>
        
        <Input
          label="Relationship to Emergency Contact"
          type="text"
          placeholder="e.g., Parent, Sibling, Friend"
          value={safetyData?.emergencyContactRelation}
          onChange={(e) => onSafetyChange('emergencyContactRelation', e?.target?.value)}
          className="mt-4"
        />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Document Upload</h3>
        <div className="space-y-4">
          <div className="border-2 border-dashed border-border rounded-lg p-6">
            <div className="text-center">
              <Icon name="Upload" size={32} className="text-muted-foreground mx-auto mb-2" />
              <h4 className="font-medium text-foreground mb-1">Upload Government ID</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Driver's license, passport, or national ID card
              </p>
              <label className="cursor-pointer">
                <Button variant="outline">
                  Choose File
                </Button>
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(e) => handleFileUpload('government_id', e)}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Privacy Settings</h3>
        <div className="space-y-4">
          <Checkbox
            label="Show my profile to verified users only"
            checked={safetyData?.verifiedUsersOnly}
            onChange={(e) => onSafetyChange('verifiedUsersOnly', e?.target?.checked)}
            description="Only users with verified profiles can see your profile"
          />
          
          <Checkbox
            label="Share location with matched partners"
            checked={safetyData?.shareLocation}
            onChange={(e) => onSafetyChange('shareLocation', e?.target?.checked)}
            description="Allow matched travel partners to see your general location"
          />
          
          <Checkbox
            label="Allow profile to appear in discovery"
            checked={safetyData?.allowDiscovery}
            onChange={(e) => onSafetyChange('allowDiscovery', e?.target?.checked)}
            description="Let other users discover your profile in search results"
          />
          
          <Checkbox
            label="Enable read receipts in messages"
            checked={safetyData?.readReceipts}
            onChange={(e) => onSafetyChange('readReceipts', e?.target?.checked)}
            description="Show when you've read messages from travel partners"
          />
        </div>
      </div>
      <div className="bg-error/5 p-4 rounded-lg border border-error/20">
        <div className="flex items-start space-x-3">
          <Icon name="AlertTriangle" size={16} className="text-error mt-0.5" />
          <div className="text-sm">
            <p className="font-medium text-foreground mb-1">Safety Reminder</p>
            <p className="text-muted-foreground">
              Always meet potential travel partners in public places first. Share your travel plans with trusted contacts and trust your instincts.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SafetyVerificationSection;