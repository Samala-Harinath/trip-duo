import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const TravelerModal = ({ isOpen, onClose, traveler }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-2xl font-semibold text-gray-900">Traveler Profile</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <Icon name="X" size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Profile Header */}
          <div className="flex items-start gap-6 mb-6">
            <div className="w-32 h-32 rounded-full overflow-hidden flex-shrink-0">
              <Image
                src={traveler?.photo}
                alt={traveler?.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-2xl font-semibold text-gray-900">{traveler?.name}</h3>
                <span className="text-lg text-gray-500">{traveler?.age} years</span>
              </div>
              <div className="flex items-center text-gray-600 mb-2">
                <Icon name="MapPin" size={16} className="mr-2" />
                <span>{traveler?.location}</span>
              </div>
              <div className="px-3 py-1 rounded-full text-sm font-medium inline-block"
                style={{
                  backgroundColor: traveler?.compatibilityScore >= 80 ? 'rgb(220 252 231)' : 
                                 traveler?.compatibilityScore >= 60 ? 'rgb(219 234 254)' : 
                                 'rgb(254 243 199)',
                  color: traveler?.compatibilityScore >= 80 ? 'rgb(22 163 74)' : 
                         traveler?.compatibilityScore >= 60 ? 'rgb(37 99 235)' : 
                         'rgb(217 119 6)'
                }}
              >
                {traveler?.compatibilityScore}% Match
              </div>
            </div>
          </div>

          {/* Travel Details */}
          <div className="mb-6">
            <h4 className="text-lg font-semibold mb-3">Travel Plans</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center text-gray-600 mb-1">
                  <Icon name="Calendar" size={16} className="mr-2" />
                  <span className="font-medium">Travel Dates</span>
                </div>
                <p>{traveler?.travelDates}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center text-gray-600 mb-1">
                  <Icon name="Plane" size={16} className="mr-2" />
                  <span className="font-medium">Destination</span>
                </div>
                <p>{traveler?.destination}</p>
              </div>
            </div>
          </div>

          {/* Interests */}
          <div className="mb-6">
            <h4 className="text-lg font-semibold mb-3">Interests</h4>
            <div className="flex flex-wrap gap-2">
              {traveler?.interests?.map((interest, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              variant="success"
              className="flex-1"
              iconName="Heart"
              iconSize={18}
            >
              Like Profile
            </Button>
            <Button
              variant="outline"
              className="flex-1"
              iconName="MessageCircle"
              iconSize={18}
            >
              Send Message
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelerModal;