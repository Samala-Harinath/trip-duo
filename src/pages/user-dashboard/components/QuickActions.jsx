import React from 'react';
import Button from '../../../components/ui/Button';

const QuickActions = ({ onCreateTrip, onSearchDestinations, onViewMessages, messageCount }) => {
  return (
    <div className="bg-white rounded-xl shadow-soft border border-gray-100 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Button 
          variant="default" 
          onClick={onCreateTrip}
          className="w-full"
          iconName="Plus"
          iconPosition="left"
          iconSize={18}
        >
          Create Trip
        </Button>
        
        <Button 
          variant="outline" 
          onClick={onSearchDestinations}
          className="w-full"
          iconName="Search"
          iconPosition="left"
          iconSize={18}
        >
          Search Destinations
        </Button>
        
        <div className="relative">
          <Button 
            variant="secondary" 
            onClick={onViewMessages}
            className="w-full"
            iconName="MessageCircle"
            iconPosition="left"
            iconSize={18}
          >
            Messages
          </Button>
          {messageCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {messageCount > 99 ? '99+' : messageCount}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuickActions;