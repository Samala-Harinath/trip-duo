import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const SafetyPanel = ({ participant, onClose, onReport, onBlock }) => {
  const [reportReason, setReportReason] = useState('');
  const [reportDetails, setReportDetails] = useState('');
  const [showReportForm, setShowReportForm] = useState(false);

  const reportReasons = [
    { value: 'inappropriate_content', label: 'Inappropriate content or language' },
    { value: 'harassment', label: 'Harassment or bullying' },
    { value: 'spam', label: 'Spam or unwanted messages' },
    { value: 'fake_profile', label: 'Fake or misleading profile' },
    { value: 'safety_concern', label: 'Safety concern or threat' },
    { value: 'other', label: 'Other reason' }
  ];

  const handleReport = () => {
    if (reportReason && reportDetails?.trim()) {
      onReport({
        userId: participant?.id,
        reason: reportReason,
        details: reportDetails,
        timestamp: new Date()
      });
      setShowReportForm(false);
      setReportReason('');
      setReportDetails('');
      onClose();
    }
  };

  const handleBlock = () => {
    onBlock(participant?.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-surface rounded-lg shadow-elevated max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-foreground">Safety Options</h3>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <Icon name="X" size={20} />
            </Button>
          </div>

          {!showReportForm ? (
            <div className="space-y-4">
              {/* User Info */}
              <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Icon name="User" size={20} className="text-primary" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">{participant?.name}</h4>
                  <p className="text-sm text-muted-foreground">Travel Partner</p>
                </div>
              </div>

              {/* Safety Guidelines */}
              <div className="bg-success/10 border border-success/20 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Icon name="Shield" size={20} className="text-success flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-success mb-2">Safety Guidelines</h4>
                    <ul className="text-sm text-foreground space-y-1">
                      <li>• Never share personal financial information</li>
                      <li>• Meet in public places for first meetings</li>
                      <li>• Trust your instincts about people</li>
                      <li>• Keep conversations respectful</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button
                  variant="outline"
                  fullWidth
                  onClick={() => setShowReportForm(true)}
                  iconName="Flag"
                  iconPosition="left"
                >
                  Report User
                </Button>
                
                <Button
                  variant="destructive"
                  fullWidth
                  onClick={handleBlock}
                  iconName="UserX"
                  iconPosition="left"
                >
                  Block User
                </Button>
              </div>

              {/* Emergency Contact */}
              <div className="bg-error/10 border border-error/20 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Icon name="AlertTriangle" size={20} className="text-error flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-error mb-1">Emergency?</h4>
                    <p className="text-sm text-foreground mb-2">
                      If you feel unsafe or threatened, contact local authorities immediately.
                    </p>
                    <Button variant="outline" size="sm">
                      Emergency Contacts
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center space-x-2 mb-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowReportForm(false)}
                >
                  <Icon name="ArrowLeft" size={20} />
                </Button>
                <h4 className="font-medium text-foreground">Report {participant?.name}</h4>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Reason for reporting
                  </label>
                  <div className="space-y-2">
                    {reportReasons?.map((reason) => (
                      <label key={reason?.value} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="reportReason"
                          value={reason?.value}
                          checked={reportReason === reason?.value}
                          onChange={(e) => setReportReason(e?.target?.value)}
                          className="text-primary focus:ring-primary"
                        />
                        <span className="text-sm text-foreground">{reason?.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <Input
                  label="Additional details"
                  type="text"
                  placeholder="Please provide more details about the issue..."
                  value={reportDetails}
                  onChange={(e) => setReportDetails(e?.target?.value)}
                  required
                />

                <div className="flex space-x-3">
                  <Button
                    variant="outline"
                    fullWidth
                    onClick={() => setShowReportForm(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="destructive"
                    fullWidth
                    onClick={handleReport}
                    disabled={!reportReason || !reportDetails?.trim()}
                  >
                    Submit Report
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SafetyPanel;