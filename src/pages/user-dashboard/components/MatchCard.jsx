import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import TravelerModal from './TravelerModal';

const MatchCard = ({ match, onViewProfile, onLike, onPass }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewProfile = () => {
    setIsModalOpen(true);
    onViewProfile(match?.id);
  };

  const getCompatibilityColor = (score) => {
    if (score >= 80) return 'text-green-600 bg-green-50';
    if (score >= 60) return 'text-blue-600 bg-blue-50';
    return 'text-amber-600 bg-amber-50';
  };

  return (
    <div className="bg-white rounded-xl shadow-soft border border-gray-100 overflow-hidden hover:shadow-elevated transition-smooth">
      <div className="relative">
        <div className="h-72 overflow-hidden">
          <Image 
            src={match?.photo} 
            alt={match?.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium ${getCompatibilityColor(match?.compatibilityScore)}`}>
          {match?.compatibilityScore}% Match
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900">{match?.name}</h3>
          <span className="text-sm text-gray-500">{match?.age} years</span>
        </div>
        
        <div className="flex items-center text-sm text-gray-600 mb-2">
          <Icon name="MapPin" size={14} className="mr-1" />
          <span>{match?.location}</span>
        </div>
        
        <div className="flex items-center text-sm text-gray-600 mb-3">
          <Icon name="Calendar" size={14} className="mr-1" />
          <span>Traveling {match?.travelDates}</span>
        </div>
        
        <div className="flex items-center text-sm text-gray-600 mb-3">
          <Icon name="Plane" size={14} className="mr-1" />
          <span>Destination: {match?.destination}</span>
        </div>
        
        <div className="flex flex-wrap gap-1 mb-4">
          {match?.interests?.slice(0, 3)?.map((interest, index) => (
            <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
              {interest}
            </span>
          ))}
          {match?.interests?.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
              +{match?.interests?.length - 3} more
            </span>
          )}
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onPass(match?.id)}
            className="flex-1"
            iconName="X"
            iconSize={16}
          >
            Pass
          </Button>
          <Button 
            variant="default" 
            size="sm" 
            onClick={handleViewProfile}
            className="flex-1"
            iconName="Eye"
            iconSize={16}
          >
            View
          </Button>
          <Button 
            variant="success" 
            size="sm" 
            onClick={() => onLike(match?.id)}
            className="flex-1"
            iconName="Heart"
            iconSize={16}
          >
            Like
          </Button>
        </div>
      </div>
      <TravelerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        traveler={match}
      />
    </div>
  );
};

export default MatchCard;