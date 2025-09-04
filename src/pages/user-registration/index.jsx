import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import RegistrationForm from './components/RegistrationForm';
import PhotoUpload from './components/PhotoUpload';
import PolicyModal from './components/PolicyModal';
import SuccessModal from './components/SuccessModal';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const UserRegistration = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [showPolicyModal, setShowPolicyModal] = useState(false);
  const [policyType, setPolicyType] = useState('terms');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState('');

  const handlePhotoSelect = (photo) => {
    setSelectedPhoto(photo);
  };

  const handleShowPolicy = (type) => {
    setPolicyType(type);
    setShowPolicyModal(true);
  };

  const handleRegistrationSubmit = async (formData) => {
    setIsLoading(true);
    
    try {
      // Mock registration API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Registration data:', {
        ...formData,
        profilePhoto: selectedPhoto
      });
      
      setRegisteredEmail(formData?.email);
      setShowSuccessModal(true);
    } catch (error) {
      console.error('Registration failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-surface border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Plane" size={20} color="white" />
              </div>
              <span className="text-xl font-semibold text-foreground">TripDuo</span>
            </Link>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">Already have an account?</span>
              <Link to="/sign-in">
                <Button variant="outline" size="sm">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-surface rounded-lg shadow-soft border border-border p-6 sm:p-8">
          {/* Page Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Join TripDuo
            </h1>
            <p className="text-muted-foreground">
              Create your account and start finding amazing travel companions
            </p>
          </div>

          {/* Photo Upload Section */}
          <div className="mb-8">
            <PhotoUpload 
              onPhotoSelect={handlePhotoSelect}
              selectedPhoto={selectedPhoto}
            />
          </div>

          {/* Registration Form */}
          <RegistrationForm 
            onSubmit={handleRegistrationSubmit}
            isLoading={isLoading}
          />

          {/* Additional Links */}
          <div className="mt-8 pt-6 border-t border-border text-center space-y-4">
            <div className="flex items-center justify-center space-x-6 text-sm">
              <button
                onClick={() => handleShowPolicy('terms')}
                className="text-primary hover:text-primary/80 transition-colors"
              >
                Terms of Service
              </button>
              <button
                onClick={() => handleShowPolicy('privacy')}
                className="text-primary hover:text-primary/80 transition-colors"
              >
                Privacy Policy
              </button>
            </div>
            
            <p className="text-xs text-muted-foreground">
              By creating an account, you agree to our terms and privacy policy.
              TripDuo connects travelers for safe and enjoyable travel experiences.
            </p>
          </div>
        </div>

        {/* Trust Signals */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
            <Icon name="Shield" size={16} className="text-success" />
            <span>SSL Secured</span>
          </div>
          <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
            <Icon name="CheckCircle" size={16} className="text-success" />
            <span>Verified Profiles</span>
          </div>
          <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
            <Icon name="Users" size={16} className="text-success" />
            <span>Safe Community</span>
          </div>
        </div>
      </main>

      {/* Modals */}
      <PolicyModal
        isOpen={showPolicyModal}
        onClose={() => setShowPolicyModal(false)}
        type={policyType}
      />

      <SuccessModal
        isOpen={showSuccessModal}
        userEmail={registeredEmail}
      />
    </div>
  );
};

export default UserRegistration;