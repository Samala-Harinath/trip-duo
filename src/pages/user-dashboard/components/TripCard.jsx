import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const TripCard = ({ trip, onViewDetails, onManageTrip }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'pending':
        return 'text-amber-600 bg-amber-50 border-amber-200';
      case 'planning':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-soft border border-gray-100 overflow-hidden hover:shadow-elevated transition-smooth">
      <div className="h-32 overflow-hidden">
        <Image 
          src={trip?.image} 
          alt={trip?.destination}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900">{trip?.destination}</h3>
          <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(trip?.status)}`}>
            {trip?.status?.charAt(0)?.toUpperCase() + trip?.status?.slice(1)}
          </span>
        </div>
        
        <div className="flex items-center text-sm text-gray-600 mb-2">
          <Icon name="Calendar" size={14} className="mr-1" />
          <span>{formatDate(trip?.startDate)} - {formatDate(trip?.endDate)}</span>
        </div>
        
        <div className="flex items-center text-sm text-gray-600 mb-2">
          <Icon name="IndianRupee" size={14} className="mr-1" />
          <span>Budget: ₹{trip?.budget?.toLocaleString()}</span>
        </div>
        
        {trip?.companion && (
          <div className="flex items-center text-sm text-gray-600 mb-3">
            <Icon name="Users" size={14} className="mr-1" />
            <span>With {trip?.companion}</span>
          </div>
        )}
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onViewDetails(trip?.id)}
            className="flex-1"
            iconName="Eye"
            iconSize={16}
          >
            Details
          </Button>
          <Button 
            variant="default" 
            size="sm" 
            onClick={() => onManageTrip(trip?.id)}
            className="flex-1"
            iconName="Settings"
            iconSize={16}
          >
            Manage
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TripCard;