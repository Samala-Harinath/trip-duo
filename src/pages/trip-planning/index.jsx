import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import TripBasicInfo from './components/TripBasicInfo';
import ActivityPlanner from './components/ActivityPlanner';
import ItineraryBuilder from './components/ItineraryBuilder';
import CompanionInvitation from './components/CompanionInvitation';
import PhotoUpload from './components/PhotoUpload';
import CostEstimator from './components/CostEstimator';

const TripPlanning = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [tripData, setTripData] = useState({
    title: '',
    destination: '',
    startDate: '',
    endDate: '',
    budget: '',
    accommodation: '',
    description: ''
  });
  
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [itinerary, setItinerary] = useState([]);
  const [invitedCompanions, setInvitedCompanions] = useState([]);
  const [tripPhotos, setTripPhotos] = useState([]);
  const [tripVisibility, setTripVisibility] = useState('private');
  const [costBreakdown, setCostBreakdown] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  // Indian destination suggestions
  const destinationSuggestions = [
    {
      id: 'goa-india',
      city: 'Goa',
      country: 'India',
      description: 'Beach paradise with vibrant culture and nightlife'
    },
    {
      id: 'jaipur-india',
      city: 'Jaipur',
      country: 'India',
      description: 'Pink City with royal heritage and majestic forts'
    },
    {
      id: 'varanasi-india',
      city: 'Varanasi',
      country: 'India',
      description: 'Spiritual capital with ancient ghats and temples'
    },
    {
      id: 'kerala-india',
      city: 'Kerala',
      country: 'India',
      description: 'God\'s own country with backwaters and ayurveda'
    },
    {
      id: 'agra-india',
      city: 'Agra',
      country: 'India',
      description: 'Home to the majestic Taj Mahal'
    },
    {
      id: 'ladakh-india',
      city: 'Ladakh',
      country: 'India',
      description: 'High-altitude desert with Buddhist culture'
    },
    {
      id: 'mumbai-india',
      city: 'Mumbai',
      country: 'India',
      description: 'City of dreams and Bollywood'
    },
    {
      id: 'udaipur-india',
      city: 'Udaipur',
      country: 'India',
      description: 'City of Lakes with romantic palaces'
    },
    {
      id: 'rishikesh-india',
      city: 'Rishikesh',
      country: 'India',
      description: 'Yoga capital with spiritual retreats'
    },
    {
      id: 'darjeeling-india',
      city: 'Darjeeling',
      country: 'India',
      description: 'Tea gardens and Himalayan views'
    }
  ];

  const planningSteps = [
    {
      id: 'basic-info',
      title: 'Trip Details',
      description: 'Basic information about your trip',
      icon: 'MapPin',
      component: TripBasicInfo
    },
    {
      id: 'activities',
      title: 'Activities',
      description: 'Choose your preferred activities',
      icon: 'Calendar',
      component: ActivityPlanner
    },
    {
      id: 'itinerary',
      title: 'Itinerary',
      description: 'Plan your day-by-day schedule',
      icon: 'Clock',
      component: ItineraryBuilder
    },
    {
      id: 'companions',
      title: 'Companions',
      description: 'Find and invite travel partners',
      icon: 'Users',
      component: CompanionInvitation
    },
    {
      id: 'photos',
      title: 'Photos',
      description: 'Add inspiration and activity photos',
      icon: 'Camera',
      component: PhotoUpload
    },
    {
      id: 'costs',
      title: 'Cost Estimate',
      description: 'Review and split trip expenses',
      icon: 'Calculator',
      component: CostEstimator
    }
  ];

  // Auto-save functionality
  useEffect(() => {
    const autoSave = setTimeout(() => {
      if (tripData?.title || tripData?.destination) {
        console.log('Auto-saving trip data...');
        // Auto-save logic would go here
      }
    }, 2000);

    return () => clearTimeout(autoSave);
  }, [tripData, selectedActivities, itinerary]);

  const handleTripDataChange = (newTripData) => {
    setTripData(newTripData);
  };

  const handleActivitiesChange = (activities) => {
    setSelectedActivities(activities);
  };

  const handleItineraryChange = (newItinerary) => {
    setItinerary(newItinerary);
  };

  const handleInviteCompanion = (companionId) => {
    if (!invitedCompanions?.includes(companionId)) {
      setInvitedCompanions([...invitedCompanions, companionId]);
    }
  };

  const handleRemoveInvite = (companionId) => {
    setInvitedCompanions(invitedCompanions?.filter(id => id !== companionId));
  };

  const handlePhotosChange = (photos) => {
    setTripPhotos(photos);
  };

  const handleCostUpdate = (costs) => {
    setCostBreakdown(costs);
  };

  const handleStepChange = (stepIndex) => {
    setActiveStep(stepIndex);
  };

  const handleNextStep = () => {
    if (activeStep < planningSteps?.length - 1) {
      setActiveStep(activeStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  const handleSaveTrip = async () => {
    setIsSaving(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('Saving trip:', {
      tripData,
      selectedActivities,
      itinerary,
      invitedCompanions,
      tripPhotos,
      tripVisibility,
      costBreakdown
    });
    
    setIsSaving(false);
    
    // Navigate to dashboard or trip view
    navigate('/user-dashboard');
  };

  const handlePublishTrip = async () => {
    setTripVisibility('public');
    await handleSaveTrip();
  };

  const isStepComplete = (stepIndex) => {
    switch (stepIndex) {
      case 0: // Basic Info
        return tripData?.title && tripData?.destination && tripData?.startDate && tripData?.endDate;
      case 1: // Activities
        return selectedActivities?.length > 0;
      case 2: // Itinerary
        return itinerary?.length > 0;
      case 3: // Companions
        return true; // Optional step
      case 4: // Photos
        return true; // Optional step
      case 5: // Costs
        return true; // Auto-calculated
      default:
        return false;
    }
  };

  const getCompletedStepsCount = () => {
    return planningSteps?.filter((_, index) => isStepComplete(index))?.length;
  };

  const getCurrentStepComponent = () => {
    const currentStep = planningSteps?.[activeStep];
    const Component = currentStep?.component;

    const commonProps = {
      tripData,
      onTripDataChange: handleTripDataChange
    };

    switch (currentStep?.id) {
      case 'basic-info':
        return (
          <Component
            {...commonProps}
            destinationSuggestions={destinationSuggestions}
            onDestinationSearch={() => {}}
          />
        );
      case 'activities':
        return (
          <Component
            selectedActivities={selectedActivities}
            onActivitiesChange={handleActivitiesChange}
          />
        );
      case 'itinerary':
        return (
          <Component
            itinerary={itinerary}
            onItineraryChange={handleItineraryChange}
          />
        );
      case 'companions':
        return (
          <Component
            invitedCompanions={invitedCompanions}
            onInviteCompanion={handleInviteCompanion}
            onRemoveInvite={handleRemoveInvite}
            tripVisibility={tripVisibility}
            onVisibilityChange={setTripVisibility}
          />
        );
      case 'photos':
        return (
          <Component
            photos={tripPhotos}
            onPhotosChange={handlePhotosChange}
          />
        );
      case 'costs':
        return (
          <Component
            {...commonProps}
            itinerary={itinerary}
            selectedActivities={selectedActivities}
            onCostUpdate={handleCostUpdate}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-surface border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => navigate('/user-dashboard')}
                iconName="ArrowLeft"
                iconPosition="left"
              >
                Back to Dashboard
              </Button>
              <div className="h-6 w-px bg-border"></div>
              <div>
                <h1 className="text-xl font-semibold text-foreground">Trip Planning</h1>
                <p className="text-sm text-muted-foreground">
                  {getCompletedStepsCount()}/{planningSteps?.length} steps completed
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="text-sm text-muted-foreground">
                Auto-saved 2 minutes ago
              </div>
              <Button
                variant="outline"
                onClick={handleSaveTrip}
                loading={isSaving}
                iconName="Save"
                iconPosition="left"
              >
                Save Draft
              </Button>
              <Button
                onClick={handlePublishTrip}
                loading={isSaving}
                iconName="Send"
                iconPosition="left"
              >
                Publish Trip
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Step Navigation Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-lg border border-border p-6 sticky top-24">
              <h2 className="font-semibold text-card-foreground mb-4">Planning Steps</h2>
              <nav className="space-y-2">
                {planningSteps?.map((step, index) => (
                  <button
                    key={step?.id}
                    onClick={() => handleStepChange(index)}
                    className={`w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-smooth ${
                      activeStep === index
                        ? 'bg-primary text-primary-foreground'
                        : isStepComplete(index)
                        ? 'bg-success/10 text-success hover:bg-success/20' :'hover:bg-muted text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      activeStep === index
                        ? 'bg-primary-foreground/20'
                        : isStepComplete(index)
                        ? 'bg-success/20' :'bg-muted'
                    }`}>
                      {isStepComplete(index) && activeStep !== index ? (
                        <Icon name="Check" size={16} color="var(--color-success)" />
                      ) : (
                        <Icon 
                          name={step?.icon} 
                          size={16} 
                          color={activeStep === index ? "var(--color-primary-foreground)" : "currentColor"}
                        />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium">{step?.title}</div>
                      <div className="text-xs opacity-80 truncate">{step?.description}</div>
                    </div>
                  </button>
                ))}
              </nav>

              {/* Progress Summary */}
              <div className="mt-6 pt-6 border-t border-border">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-medium text-card-foreground">
                    {Math.round((getCompletedStepsCount() / planningSteps?.length) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(getCompletedStepsCount() / planningSteps?.length) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            <div className="space-y-6">
              {/* Step Header */}
              <div className="bg-card rounded-lg border border-border p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon 
                        name={planningSteps?.[activeStep]?.icon} 
                        size={24} 
                        color="var(--color-primary)" 
                      />
                    </div>
                    <div>
                      <h2 className="text-2xl font-semibold text-card-foreground">
                        {planningSteps?.[activeStep]?.title}
                      </h2>
                      <p className="text-muted-foreground">
                        {planningSteps?.[activeStep]?.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">
                      Step {activeStep + 1} of {planningSteps?.length}
                    </span>
                    {isStepComplete(activeStep) && (
                      <div className="w-6 h-6 bg-success rounded-full flex items-center justify-center">
                        <Icon name="Check" size={14} color="white" />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Step Content */}
              {getCurrentStepComponent()}

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between bg-card rounded-lg border border-border p-6">
                <Button
                  variant="outline"
                  onClick={handlePreviousStep}
                  disabled={activeStep === 0}
                  iconName="ChevronLeft"
                  iconPosition="left"
                >
                  Previous
                </Button>
                
                <div className="flex items-center space-x-2">
                  {planningSteps?.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => handleStepChange(index)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === activeStep
                          ? 'bg-primary'
                          : isStepComplete(index)
                          ? 'bg-success' :'bg-muted'
                      }`}
                    />
                  ))}
                </div>

                <Button
                  onClick={handleNextStep}
                  disabled={activeStep === planningSteps?.length - 1}
                  iconName="ChevronRight"
                  iconPosition="right"
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripPlanning;