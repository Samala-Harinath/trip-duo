import React, { useState } from 'react';
import { Checkbox, CheckboxGroup } from '../../../components/ui/Checkbox';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ActivityPlanner = ({ selectedActivities = [], onActivitiesChange }) => {
  const [expandedCategories, setExpandedCategories] = useState({
    adventure: true,
    cultural: false,
    relaxation: false,
    food: false,
    nightlife: false,
    shopping: false
  });

  const activityCategories = {
    adventure: {
      title: 'Adventure & Outdoor',
      icon: 'Mountain',
      activities: [
        { id: 'hiking', label: 'Hiking & Trekking', description: 'Explore nature trails and mountains' },
        { id: 'water-sports', label: 'Water Sports', description: 'Swimming, surfing, diving' },
        { id: 'cycling', label: 'Cycling Tours', description: 'Bike through scenic routes' },
        { id: 'rock-climbing', label: 'Rock Climbing', description: 'Indoor and outdoor climbing' },
        { id: 'zip-lining', label: 'Zip Lining', description: 'Thrilling canopy adventures' },
        { id: 'safari', label: 'Wildlife Safari', description: 'Animal watching and photography' }
      ]
    },
    cultural: {
      title: 'Cultural & Historical',
      icon: 'Building',
      activities: [
        { id: 'museums', label: 'Museums & Galleries', description: 'Art and history exhibitions' },
        { id: 'temples', label: 'Temples & Churches', description: 'Religious and spiritual sites' },
        { id: 'local-tours', label: 'Local Walking Tours', description: 'Guided city exploration' },
        { id: 'festivals', label: 'Local Festivals', description: 'Cultural celebrations and events' },
        { id: 'workshops', label: 'Cultural Workshops', description: 'Learn traditional crafts' },
        { id: 'architecture', label: 'Architecture Tours', description: 'Historic buildings and landmarks' }
      ]
    },
    relaxation: {
      title: 'Relaxation & Wellness',
      icon: 'Flower2',
      activities: [
        { id: 'spa', label: 'Spa & Wellness', description: 'Massage and relaxation treatments' },
        { id: 'yoga', label: 'Yoga & Meditation', description: 'Mindfulness and wellness sessions' },
        { id: 'beaches', label: 'Beach Time', description: 'Sunbathing and beach activities' },
        { id: 'hot-springs', label: 'Hot Springs', description: 'Natural thermal baths' },
        { id: 'gardens', label: 'Botanical Gardens', description: 'Peaceful nature walks' },
        { id: 'scenic-views', label: 'Scenic Viewpoints', description: 'Photography and sightseeing' }
      ]
    },
    food: {
      title: 'Food & Dining',
      icon: 'UtensilsCrossed',
      activities: [
        { id: 'food-tours', label: 'Food Tours', description: 'Local cuisine exploration' },
        { id: 'cooking-class', label: 'Cooking Classes', description: 'Learn to cook local dishes' },
        { id: 'wine-tasting', label: 'Wine Tasting', description: 'Local wines and vineyards' },
        { id: 'street-food', label: 'Street Food', description: 'Authentic local street eats' },
        { id: 'fine-dining', label: 'Fine Dining', description: 'Upscale restaurant experiences' },
        { id: 'markets', label: 'Local Markets', description: 'Fresh produce and local goods' }
      ]
    },
    nightlife: {
      title: 'Nightlife & Entertainment',
      icon: 'Music',
      activities: [
        { id: 'bars', label: 'Bars & Lounges', description: 'Cocktails and social drinking' },
        { id: 'live-music', label: 'Live Music', description: 'Concerts and performances' },
        { id: 'dancing', label: 'Dancing & Clubs', description: 'Nightclub experiences' },
        { id: 'theater', label: 'Theater Shows', description: 'Plays and musical performances' },
        { id: 'comedy', label: 'Comedy Shows', description: 'Stand-up and entertainment' },
        { id: 'rooftop', label: 'Rooftop Venues', description: 'Scenic evening venues' }
      ]
    },
    shopping: {
      title: 'Shopping & Markets',
      icon: 'ShoppingBag',
      activities: [
        { id: 'local-crafts', label: 'Local Crafts', description: 'Handmade souvenirs and art' },
        { id: 'fashion', label: 'Fashion Shopping', description: 'Clothing and accessories' },
        { id: 'antiques', label: 'Antique Markets', description: 'Vintage and collectible items' },
        { id: 'jewelry', label: 'Jewelry Shopping', description: 'Local gems and accessories' },
        { id: 'bookstores', label: 'Bookstores', description: 'Local literature and guides' },
        { id: 'souvenirs', label: 'Souvenir Shopping', description: 'Travel mementos and gifts' }
      ]
    }
  };

  const toggleCategory = (category) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev?.[category]
    }));
  };

  const handleActivityToggle = (activityId, checked) => {
    let updatedActivities;
    if (checked) {
      updatedActivities = [...selectedActivities, activityId];
    } else {
      updatedActivities = selectedActivities?.filter(id => id !== activityId);
    }
    onActivitiesChange(updatedActivities);
  };

  const getSelectedCount = () => selectedActivities?.length;

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
            <Icon name="Calendar" size={20} color="var(--color-accent)" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-card-foreground">Activities & Interests</h2>
            <p className="text-sm text-muted-foreground">
              {getSelectedCount()} activities selected
            </p>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onActivitiesChange([])}
          disabled={getSelectedCount() === 0}
        >
          Clear All
        </Button>
      </div>
      <div className="space-y-4">
        {Object.entries(activityCategories)?.map(([categoryKey, category]) => (
          <div key={categoryKey} className="border border-border rounded-lg">
            <button
              onClick={() => toggleCategory(categoryKey)}
              className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-smooth rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <Icon name={category?.icon} size={20} color="var(--color-muted-foreground)" />
                <span className="font-medium text-card-foreground">{category?.title}</span>
                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                  {category?.activities?.filter(activity => 
                    selectedActivities?.includes(activity?.id)
                  )?.length}
                </span>
              </div>
              <Icon 
                name="ChevronDown" 
                size={16} 
                className={`transition-transform ${
                  expandedCategories?.[categoryKey] ? 'rotate-180' : ''
                }`}
              />
            </button>

            {expandedCategories?.[categoryKey] && (
              <div className="px-4 pb-4 border-t border-border">
                <CheckboxGroup className="mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {category?.activities?.map((activity) => (
                      <div key={activity?.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/30 transition-smooth">
                        <Checkbox
                          checked={selectedActivities?.includes(activity?.id)}
                          onChange={(e) => handleActivityToggle(activity?.id, e?.target?.checked)}
                          className="mt-1"
                        />
                        <div className="flex-1 min-w-0">
                          <label className="text-sm font-medium text-card-foreground cursor-pointer">
                            {activity?.label}
                          </label>
                          <p className="text-xs text-muted-foreground mt-1">
                            {activity?.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CheckboxGroup>
              </div>
            )}
          </div>
        ))}
      </div>
      {getSelectedCount() > 0 && (
        <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
          <div className="flex items-center space-x-2">
            <Icon name="CheckCircle" size={16} color="var(--color-primary)" />
            <span className="text-sm font-medium text-primary">
              {getSelectedCount()} activities selected for your trip
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActivityPlanner;