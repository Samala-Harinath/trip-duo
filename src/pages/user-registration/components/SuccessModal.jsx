import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SuccessModal = ({ isOpen, userEmail }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleContinue = () => {
    navigate('/user-dashboard');
  };

  const handleResendEmail = () => {
    // Mock resend email functionality
    console.log('Resending verification email to:', userEmail);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-surface rounded-lg shadow-elevated max-w-md w-full p-6">
        {/* Success Icon */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="CheckCircle" size={32} className="text-success" />
          </div>
          <h2 className="text-2xl font-semibold text-foreground mb-2">
            Account Created Successfully!
          </h2>
          <p className="text-muted-foreground">
            Welcome to TripDuo! Your travel companion journey starts here.
          </p>
        </div>

        {/* Email Verification Notice */}
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-6">
          <div className="flex items-start space-x-3">
            <Icon name="Mail" size={20} className="text-primary mt-0.5" />
            <div className="flex-1">
              <h3 className="font-medium text-foreground mb-1">
                Verify Your Email
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                We've sent a verification email to:
              </p>
              <p className="text-sm font-medium text-foreground bg-muted px-3 py-2 rounded">
                {userEmail}
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Please check your inbox and click the verification link to activate your account.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            variant="default"
            fullWidth
            onClick={handleContinue}
            iconName="ArrowRight"
            iconPosition="right"
          >
            Continue to Dashboard
          </Button>
          
          <Button
            variant="outline"
            fullWidth
            onClick={handleResendEmail}
            iconName="RefreshCw"
            iconPosition="left"
          >
            Resend Verification Email
          </Button>
        </div>

        {/* Additional Info */}
        <div className="mt-6 pt-4 border-t border-border">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="Info" size={16} />
            <span>
              Didn't receive the email? Check your spam folder or try resending.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;