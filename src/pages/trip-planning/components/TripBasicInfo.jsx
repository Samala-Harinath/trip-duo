import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const TripBasicInfo = ({ 
  tripData, 
  onTripDataChange, 
  destinationSuggestions = [],
  onDestinationSearch 
}) => {
  const destinationOptions = destinationSuggestions?.map(dest => ({
    value: dest?.id,
    label: `${dest?.city}, ${dest?.country}`,
    description: dest?.description
  }));

  const budgetRanges = [
    { value: 'budget', label: 'Budget (₹15,000 - ₹40,000)', description: 'Backpacker and budget-friendly options' },
    { value: 'mid-range', label: 'Mid-Range (₹40,000 - ₹80,000)', description: 'Comfortable hotels and experiences' },
    { value: 'luxury', label: 'Luxury (₹80,000+)', description: 'Premium hotels and exclusive experiences' },
    { value: 'flexible', label: 'Flexible Budget', description: 'Open to various price ranges' }
  ];

  const accommodationTypes = [
    { value: 'hotel', label: 'Hotel', description: 'Standard Indian hotels and chains' },
    { value: 'heritage', label: 'Heritage Hotel', description: 'Historic properties and palaces' },
    { value: 'resort', label: 'Resort', description: 'All-inclusive resort experience' },
    { value: 'homestay', label: 'Homestay', description: 'Stay with local families' },
    { value: 'ashram', label: 'Ashram', description: 'Spiritual and yoga retreats' },
    { value: 'hostel', label: 'Hostel', description: 'Budget-friendly backpacker accommodation' },
    { value: 'guesthouse', label: 'Guesthouse', description: 'Local guesthouses and B&Bs' }
  ];

  const handleInputChange = (field, value) => {
    onTripDataChange({
      ...tripData,
      [field]: value
    });
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon name="MapPin" size={20} color="var(--color-primary)" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-card-foreground">Trip Details</h2>
          <p className="text-sm text-muted-foreground">Basic information about your trip</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <Input
            label="Trip Title"
            type="text"
            placeholder="e.g., Adventure in Tokyo"
            value={tripData?.title || ''}
            onChange={(e) => handleInputChange('title', e?.target?.value)}
            required
            description="Give your trip a memorable name"
          />
        </div>

        <div className="md:col-span-2">
          <Select
            label="Destination"
            placeholder="Search for a destination..."
            options={destinationOptions}
            value={tripData?.destination || ''}
            onChange={(value) => handleInputChange('destination', value)}
            searchable
            required
            description="Where would you like to travel?"
          />
        </div>

        <div>
          <Input
            label="Start Date"
            type="date"
            value={tripData?.startDate || ''}
            onChange={(e) => handleInputChange('startDate', e?.target?.value)}
            required
            min={new Date()?.toISOString()?.split('T')?.[0]}
          />
        </div>

        <div>
          <Input
            label="End Date"
            type="date"
            value={tripData?.endDate || ''}
            onChange={(e) => handleInputChange('endDate', e?.target?.value)}
            required
            min={tripData?.startDate || new Date()?.toISOString()?.split('T')?.[0]}
          />
        </div>

        <div>
          <Select
            label="Budget Range"
            placeholder="Select your budget"
            options={budgetRanges}
            value={tripData?.budget || ''}
            onChange={(value) => handleInputChange('budget', value)}
            required
          />
        </div>

        <div>
          <Select
            label="Accommodation Type"
            placeholder="Preferred accommodation"
            options={accommodationTypes}
            value={tripData?.accommodation || ''}
            onChange={(value) => handleInputChange('accommodation', value)}
            required
          />
        </div>

        <div className="md:col-span-2">
          <Input
            label="Trip Description"
            type="text"
            placeholder="Describe your ideal trip experience..."
            value={tripData?.description || ''}
            onChange={(e) => handleInputChange('description', e?.target?.value)}
            description="Share what makes this trip special"
          />
        </div>
      </div>
    </div>
  );
};

export default TripBasicInfo;