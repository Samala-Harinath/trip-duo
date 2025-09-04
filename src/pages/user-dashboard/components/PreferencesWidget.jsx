import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PreferencesWidget = ({ preferences, onEditPreferences }) => {
  const formatBudgetRange = (min, max) => {
    return `₹${min?.toLocaleString()} - ₹${max?.toLocaleString()}`;
  };

  return (
    <div className="bg-white rounded-xl shadow-soft border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Travel Preferences</h2>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={onEditPreferences}
          iconName="Edit2"
          iconSize={16}
        >
          Edit
        </Button>
      </div>
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
            <Icon name="MapPin" size={16} className="mr-2" />
            Saved Destinations
          </h3>
          <div className="flex flex-wrap gap-2">
            {preferences?.destinations?.map((destination, index) => (
              <span key={index} className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full">
                {destination}
              </span>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
            <Icon name="IndianRupee" size={16} className="mr-2" />
            Budget Range
          </h3>
          <span className="px-3 py-1 bg-green-50 text-green-700 text-sm rounded-full">
            {formatBudgetRange(preferences?.budgetRange?.min, preferences?.budgetRange?.max)}
          </span>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
            <Icon name="Activity" size={16} className="mr-2" />
            Activity Interests
          </h3>
          <div className="flex flex-wrap gap-2">
            {preferences?.activities?.map((activity, index) => (
              <span key={index} className="px-3 py-1 bg-purple-50 text-purple-700 text-sm rounded-full">
                {activity}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreferencesWidget;