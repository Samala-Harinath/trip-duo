import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ProfilePhotoSection from './components/ProfilePhotoSection';
import PersonalInfoSection from './components/PersonalInfoSection';
import TravelPreferencesSection from './components/TravelPreferencesSection';
import SafetyVerificationSection from './components/SafetyVerificationSection';
import TravelHistorySection from './components/TravelHistorySection';
import AccountSettingsSection from './components/AccountSettingsSection';
import ProfilePreview from './components/ProfilePreview';

const UserProfileManagement = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('personal');
  const [showPreview, setShowPreview] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Mock user data
  const [profileData, setProfileData] = useState({
    firstName: 'Harinath',
    lastName: 'samala',
    email: 'Harinath.samala@email.com',
    phone: '+91 9022654532',
    gender: 'male',
    age: '28',
    city: 'Mumbai, Maharashtra',
    occupation: 'software_engineer',
    languages: ['english', 'Hindi ,Marathi'],
    bio: `Adventure-seeking software engineer who loves exploring new cultures and cuisines. Looking for a travel companion who shares my passion for hiking, photography, and discovering hidden gems off the beaten path. I believe the best travel experiences come from meaningful connections and shared adventures.`,
    photos: [
      {
        id: 1,
        url: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=500&fit=crop',
        isPrimary: true,
        isVerified: true
      },
      {
        id: 2,
        url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=500&fit=crop',
        isPrimary: false,
        isVerified: false
      }
    ]
  });

  const [preferences, setPreferences] = useState({
    budget: 'mid_range',
    frequency: '3-4',
    accommodation: ['hotel', 'airbnb'],
    travelStyle: ['adventure', 'cultural', 'photography'],
    activities: ['hiking', 'museums', 'food_tours', 'photography', 'beaches'],
    destinations: ['europe', 'asia'],
    dreamDestinations: 'Japan, Iceland, New Zealand, Patagonia, Morocco'
  });

  const [safetyData, setSafetyData] = useState({
    emergencyContactName: 'Jennifer Johnson',
    emergencyContactPhone: '+1 (555) 987-6543',
    emergencyContactRelation: 'Sister',
    verifiedUsersOnly: true,
    shareLocation: true,
    allowDiscovery: true,
    readReceipts: false
  });

  const [travelHistory, setTravelHistory] = useState([
    {
      id: 1,
      destination: 'Barcelona, Spain',
      startDate: '2024-06-15',
      endDate: '2024-06-22',
      description: 'Amazing week exploring Gaudí architecture, enjoying tapas, and soaking up the Mediterranean culture. Met incredible locals and fellow travelers.',
      photos: [
        'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=200&h=200&fit=crop',
        'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=200&h=200&fit=crop',
        'https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?w=200&h=200&fit=crop'
      ],
      rating: 5,
      companionRating: null
    },
    {
      id: 2,
      destination: 'Tokyo, Japan',
      startDate: '2024-03-10',
      endDate: '2024-03-20',
      description: 'Incredible solo adventure through Tokyo and Kyoto. From bustling Shibuya to serene temples, every moment was magical.',
      photos: [
        'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=200&h=200&fit=crop',
        'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=200&h=200&fit=crop'
      ],
      rating: 5,
      companionRating: null
    }
  ]);

  const [settings, setSettings] = useState({
    emailNotifications: 'matches_only',
    pushMatches: true,
    pushMessages: true,
    weeklyEmails: false,
    smsNotifications: false,
    maxDistance: '100',
    ageRange: ['26-30', '31-35'],
    verifiedOnly: true,
    similarBudget: true,
    diverseStyles: false,
    language: 'en',
    showInDiscovery: true,
    autoAcceptMatches: false,
    shareTravelPlans: true,
    hideLastActive: false,
    mutualMatchRequired: true,
    twoFactorAuth: false
  });

  const [errors, setErrors] = useState({});

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: 'User' },
    { id: 'photos', label: 'Photos', icon: 'Camera' },
    { id: 'preferences', label: 'Travel Preferences', icon: 'MapPin' },
    { id: 'safety', label: 'Safety & Verification', icon: 'Shield' },
    { id: 'history', label: 'Travel History', icon: 'Clock' },
    { id: 'settings', label: 'Account Settings', icon: 'Settings' }
  ];

  const handleFormChange = (field, value) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
    setHasUnsavedChanges(true);
    // Clear error for this field
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handlePreferenceChange = (field, value) => {
    setPreferences(prev => ({ ...prev, [field]: value }));
    setHasUnsavedChanges(true);
  };

  const handleSafetyChange = (field, value) => {
    setSafetyData(prev => ({ ...prev, [field]: value }));
    setHasUnsavedChanges(true);
  };

  const handleSettingChange = (field, value) => {
    setSettings(prev => ({ ...prev, [field]: value }));
    setHasUnsavedChanges(true);
  };

  const handlePhotoUpload = (photo) => {
    setProfileData(prev => ({
      ...prev,
      photos: [...prev?.photos, photo]
    }));
    setHasUnsavedChanges(true);
  };

  const handlePhotoDelete = (photoId) => {
    setProfileData(prev => ({
      ...prev,
      photos: prev?.photos?.filter(photo => photo?.id !== photoId)
    }));
    setHasUnsavedChanges(true);
  };

  const handlePhotoReorder = (fromIndex, toIndex) => {
    setProfileData(prev => {
      const newPhotos = [...prev?.photos];
      const [movedPhoto] = newPhotos?.splice(fromIndex, 1);
      newPhotos?.splice(toIndex, 0, movedPhoto);
      
      // Update primary photo
      newPhotos?.forEach((photo, index) => {
        photo.isPrimary = index === 0;
      });
      
      return { ...prev, photos: newPhotos };
    });
    setHasUnsavedChanges(true);
  };

  const handleAddTrip = (trip) => {
    setTravelHistory(prev => [trip, ...prev]);
    setHasUnsavedChanges(true);
  };

  const handleDeleteTrip = (tripId) => {
    setTravelHistory(prev => prev?.filter(trip => trip?.id !== tripId));
    setHasUnsavedChanges(true);
  };

  const handleDocumentUpload = (type, file) => {
    console.log('Uploading document:', type, file?.name);
    // Mock document upload
    setHasUnsavedChanges(true);
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      console.log('Account deletion requested');
      // Mock account deletion
      navigate('/user-registration');
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!profileData?.firstName?.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!profileData?.lastName?.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!profileData?.gender) {
      newErrors.gender = 'Gender is required';
    }
    
    if (!profileData?.age) {
      newErrors.age = 'Age is required';
    }
    
    if (!profileData?.city?.trim()) {
      newErrors.city = 'City is required';
    }
    
    if (!profileData?.bio?.trim()) {
      newErrors.bio = 'Bio is required';
    } else if (profileData?.bio?.length < 50) {
      newErrors.bio = 'Bio must be at least 50 characters';
    }
    
    if (!preferences?.budget) {
      newErrors.budget = 'Travel budget is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      console.log('Saving profile data:', {
        profileData,
        preferences,
        safetyData,
        settings
      });
      setHasUnsavedChanges(false);
      // Mock save success
      alert('Profile updated successfully!');
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'personal':
        return (
          <PersonalInfoSection
            formData={profileData}
            onFormChange={handleFormChange}
            errors={errors}
          />
        );
      case 'photos':
        return (
          <ProfilePhotoSection
            photos={profileData?.photos}
            onPhotoUpload={handlePhotoUpload}
            onPhotoDelete={handlePhotoDelete}
            onPhotoReorder={handlePhotoReorder}
          />
        );
      case 'preferences':
        return (
          <TravelPreferencesSection
            preferences={preferences}
            onPreferenceChange={handlePreferenceChange}
            errors={errors}
          />
        );
      case 'safety':
        return (
          <SafetyVerificationSection
            safetyData={safetyData}
            onSafetyChange={handleSafetyChange}
            onDocumentUpload={handleDocumentUpload}
          />
        );
      case 'history':
        return (
          <TravelHistorySection
            travelHistory={travelHistory}
            onAddTrip={handleAddTrip}
            onDeleteTrip={handleDeleteTrip}
          />
        );
      case 'settings':
        return (
          <AccountSettingsSection
            settings={settings}
            onSettingChange={handleSettingChange}
            onDeleteAccount={handleDeleteAccount}
          />
        );
      default:
        return null;
    }
  };

  // Handle browser back/forward navigation
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (hasUnsavedChanges) {
        e?.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasUnsavedChanges]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-surface border-b border-border sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/user-dashboard')}
                iconName="ArrowLeft"
                iconPosition="left"
              >
                Back to Dashboard
              </Button>
              <div className="h-6 w-px bg-border" />
              <h1 className="text-xl font-semibold text-foreground">Profile Management</h1>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowPreview(true)}
                iconName="Eye"
                iconPosition="left"
              >
                Preview Profile
              </Button>
              <Button
                onClick={handleSave}
                disabled={!hasUnsavedChanges}
                iconName="Save"
                iconPosition="left"
              >
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-surface border border-border rounded-lg p-4 sticky top-24">
              <nav className="space-y-2">
                {tabs?.map((tab) => (
                  <button
                    key={tab?.id}
                    onClick={() => setActiveTab(tab?.id)}
                    className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-smooth ${
                      activeTab === tab?.id
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                  >
                    <Icon name={tab?.icon} size={16} className="mr-3" />
                    {tab?.label}
                  </button>
                ))}
              </nav>
              
              {hasUnsavedChanges && (
                <div className="mt-4 p-3 bg-warning/10 border border-warning/20 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Icon name="AlertCircle" size={14} className="text-warning" />
                    <span className="text-xs text-warning font-medium">
                      Unsaved changes
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-surface border border-border rounded-lg p-6 lg:p-8">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>
      {/* Profile Preview Modal */}
      <ProfilePreview
        profileData={{ ...profileData, preferences }}
        isVisible={showPreview}
        onClose={() => setShowPreview(false)}
      />
    </div>
  );
};

export default UserProfileManagement;