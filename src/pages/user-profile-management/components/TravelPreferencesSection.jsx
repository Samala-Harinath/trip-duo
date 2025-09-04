import React from 'react';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const TravelPreferencesSection = ({ preferences, onPreferenceChange, errors }) => {
  const budgetOptions = [
    { value: 'budget', label: 'Budget (₹2,000-4,000/day)', description: 'Hostels, local transport, street food' },
    { value: 'mid_range', label: 'Mid-range (₹4,000-8,000/day)', description: '3-star hotels, mix of activities' },
    { value: 'luxury', label: 'Luxury (₹8,000+/day)', description: 'Premium hotels, exclusive experiences' },
    { value: 'flexible', label: 'Flexible', description: 'Adapt based on destination and season' }
  ];

  const accommodationOptions = [
    { value: 'hotel', label: 'Standard Hotels', description: 'Regular Indian hotels' },
    { value: 'heritage', label: 'Heritage Hotels', description: 'Historic properties and palaces' },
    { value: 'resort', label: 'Resorts', description: 'All-inclusive properties' },
    { value: 'homestay', label: 'Homestays', description: 'Stay with local families' },
    { value: 'ashram', label: 'Ashrams', description: 'Spiritual retreats' },
    { value: 'hostel', label: 'Hostels', description: 'Budget backpacker options' },
    { value: 'guesthouse', label: 'Guesthouses', description: 'Local B&Bs' },
    { value: 'camping', label: 'Camping', description: 'Outdoor stays and glamping' }
  ];

  const travelStyleOptions = [
    { value: 'spiritual', label: 'Spiritual Seeker', description: 'Temples, meditation, yoga' },
    { value: 'cultural', label: 'Heritage Explorer', description: 'Forts, palaces, traditions' },
    { value: 'adventure', label: 'Adventure Enthusiast', description: 'Trekking, rafting, camping' },
    { value: 'nature', label: 'Nature Lover', description: 'Wildlife, mountains, beaches' },
    { value: 'foodie', label: 'Food Explorer', description: 'Regional cuisines, street food' },
    { value: 'wellness', label: 'Wellness Seeker', description: 'Ayurveda, yoga, meditation' },
    { value: 'luxury', label: 'Luxury Traveler', description: 'Premium experiences' },
    { value: 'backpacker', label: 'Backpacker', description: 'Budget travel, local experiences' },
    { value: 'photography', label: 'Photography Enthusiast', description: 'Travel photography' },
    { value: 'festival', label: 'Festival Hopper', description: 'Cultural celebrations' }
  ];

  const activityInterests = [
    { id: 'temples', label: 'Temple Visits', description: 'Explore ancient temples' },
    { id: 'heritage', label: 'Heritage Walks', description: 'Guided fort and palace tours' },
    { id: 'yoga', label: 'Yoga & Meditation', description: 'Spiritual practices' },
    { id: 'ayurveda', label: 'Ayurvedic Treatments', description: 'Traditional wellness' },
    { id: 'food_tours', label: 'Food Tours', description: 'Regional cuisine exploration' },
    { id: 'cooking', label: 'Cooking Classes', description: 'Learn Indian cooking' },
    { id: 'wildlife', label: 'Wildlife Safaris', description: 'National parks and sanctuaries' },
    { id: 'trekking', label: 'Himalayan Trekking', description: 'Mountain adventures' },
    { id: 'beaches', label: 'Beach Activities', description: 'Coastal experiences' },
    { id: 'backwaters', label: 'Backwater Cruises', description: 'Kerala houseboats' },
    { id: 'festivals', label: 'Festival Celebrations', description: 'Cultural festivals' },
    { id: 'handicrafts', label: 'Handicraft Shopping', description: 'Local artisan markets' },
    { id: 'village', label: 'Village Tours', description: 'Rural experiences' },
    { id: 'photography', label: 'Photography Tours', description: 'Capture India\'s beauty' },
    { id: 'desert', label: 'Desert Adventures', description: 'Rajasthan desert experiences' }
  ];

  const frequencyOptions = [
    { value: '1-2', label: '1-2 times per year' },
    { value: '3-4', label: '3-4 times per year' },
    { value: '5-8', label: '5-8 times per year' },
    { value: '9+', label: '9+ times per year' }
  ];

  const destinationOptions = [
    { value: 'north_india', label: 'North India', description: 'Delhi, Agra, Rajasthan' },
    { value: 'south_india', label: 'South India', description: 'Kerala, Tamil Nadu, Karnataka' },
    { value: 'northeast_india', label: 'Northeast India', description: 'Seven Sisters, Sikkim' },
    { value: 'west_india', label: 'West India', description: 'Gujarat, Maharashtra, Goa' },
    { value: 'east_india', label: 'East India', description: 'West Bengal, Odisha' },
    { value: 'central_india', label: 'Central India', description: 'Madhya Pradesh, Chhattisgarh' },
    { value: 'himalayas', label: 'Himalayas', description: 'Uttarakhand, Himachal, Ladakh' },
    { value: 'islands', label: 'Indian Islands', description: 'Andaman & Nicobar, Lakshadweep' }
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Select
          label="Travel Budget"
          options={budgetOptions}
          value={preferences?.budget}
          onChange={(value) => onPreferenceChange('budget', value)}
          error={errors?.budget}
          required
        />
        
        <Select
          label="Travel Frequency"
          options={frequencyOptions}
          value={preferences?.frequency}
          onChange={(value) => onPreferenceChange('frequency', value)}
          error={errors?.frequency}
        />
      </div>
      <Select
        label="Preferred Accommodation Types"
        options={accommodationOptions}
        value={preferences?.accommodation}
        onChange={(value) => onPreferenceChange('accommodation', value)}
        multiple
        description="Select all accommodation types you're comfortable with"
      />
      <Select
        label="Travel Style"
        options={travelStyleOptions}
        value={preferences?.travelStyle}
        onChange={(value) => onPreferenceChange('travelStyle', value)}
        multiple
        description="What describes your travel personality?"
      />
      <div>
        <label className="block text-sm font-medium text-foreground mb-4">
          Activity Interests
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {activityInterests?.map((activity) => (
            <Checkbox
              key={activity?.id}
              label={activity?.label}
              checked={preferences?.activities?.includes(activity?.id) || false}
              onChange={(e) => {
                const currentActivities = preferences?.activities || [];
                const newActivities = e?.target?.checked
                  ? [...currentActivities, activity?.id]
                  : currentActivities?.filter(id => id !== activity?.id);
                onPreferenceChange('activities', newActivities);
              }}
            />
          ))}
        </div>
      </div>
      <Select
        label="Preferred Destinations"
        options={destinationOptions}
        value={preferences?.destinations}
        onChange={(value) => onPreferenceChange('destinations', value)}
        multiple
        description="Which regions interest you most?"
      />
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Dream Destinations
        </label>
        <textarea
          placeholder="List specific Indian cities or landmarks you'd love to visit (e.g., Taj Mahal, Varanasi Ghats)..."
          value={preferences?.dreamDestinations}
          onChange={(e) => onPreferenceChange('dreamDestinations', e?.target?.value)}
          rows={3}
          className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
        />
      </div>
      <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
        <div className="flex items-start space-x-3">
          <Icon name="Lightbulb" size={16} className="text-primary mt-0.5" />
          <div className="text-sm">
            <p className="font-medium text-foreground mb-1">Matching Tip</p>
            <p className="text-muted-foreground">
              The more detailed your preferences, the better we can match you with compatible travel partners who share similar interests in exploring India's diverse culture, cuisine, and landscapes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelPreferencesSection;