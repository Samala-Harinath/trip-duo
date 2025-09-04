import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const TravelHistorySection = ({ travelHistory, onAddTrip, onDeleteTrip }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTrip, setNewTrip] = useState({
    destination: '',
    startDate: '',
    endDate: '',
    description: '',
    photos: []
  });

  const handleAddTrip = () => {
    if (newTrip?.destination && newTrip?.startDate && newTrip?.endDate) {
      onAddTrip({
        ...newTrip,
        id: Date.now(),
        createdAt: new Date()?.toISOString()
      });
      setNewTrip({
        destination: '',
        startDate: '',
        endDate: '',
        description: '',
        photos: []
      });
      setShowAddForm(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const calculateDuration = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Travel History</h3>
        <Button
          variant="outline"
          onClick={() => setShowAddForm(!showAddForm)}
          iconName="Plus"
          iconPosition="left"
        >
          Add Trip
        </Button>
      </div>
      {showAddForm && (
        <div className="bg-muted/30 p-6 rounded-lg border border-border">
          <h4 className="font-medium text-foreground mb-4">Add New Trip</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="Destination"
              value={newTrip?.destination}
              onChange={(e) => setNewTrip({ ...newTrip, destination: e?.target?.value })}
              className="px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent"
            />
            <div className="grid grid-cols-2 gap-2">
              <input
                type="date"
                value={newTrip?.startDate}
                onChange={(e) => setNewTrip({ ...newTrip, startDate: e?.target?.value })}
                className="px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent"
              />
              <input
                type="date"
                value={newTrip?.endDate}
                onChange={(e) => setNewTrip({ ...newTrip, endDate: e?.target?.value })}
                className="px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent"
              />
            </div>
          </div>
          <textarea
            placeholder="Trip description and highlights..."
            value={newTrip?.description}
            onChange={(e) => setNewTrip({ ...newTrip, description: e?.target?.value })}
            rows={3}
            className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent resize-none mb-4"
          />
          <div className="flex space-x-2">
            <Button onClick={handleAddTrip}>Save Trip</Button>
            <Button variant="outline" onClick={() => setShowAddForm(false)}>Cancel</Button>
          </div>
        </div>
      )}
      <div className="space-y-4">
        {travelHistory?.length === 0 ? (
          <div className="text-center py-12 bg-muted/30 rounded-lg">
            <Icon name="MapPin" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h4 className="font-medium text-foreground mb-2">No Travel History Yet</h4>
            <p className="text-muted-foreground mb-4">
              Add your past trips to showcase your travel experience to potential partners
            </p>
            <Button variant="outline" onClick={() => setShowAddForm(true)}>
              Add Your First Trip
            </Button>
          </div>
        ) : (
          travelHistory?.map((trip) => (
            <div key={trip?.id} className="bg-surface border border-border rounded-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="font-semibold text-foreground text-lg">{trip?.destination}</h4>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                    <span className="flex items-center">
                      <Icon name="Calendar" size={14} className="mr-1" />
                      {formatDate(trip?.startDate)} - {formatDate(trip?.endDate)}
                    </span>
                    <span className="flex items-center">
                      <Icon name="Clock" size={14} className="mr-1" />
                      {calculateDuration(trip?.startDate, trip?.endDate)} days
                    </span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDeleteTrip(trip?.id)}
                  className="text-error hover:text-error hover:bg-error/10"
                >
                  <Icon name="Trash2" size={16} />
                </Button>
              </div>

              {trip?.description && (
                <p className="text-muted-foreground mb-4">{trip?.description}</p>
              )}

              {trip?.photos && trip?.photos?.length > 0 && (
                <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                  {trip?.photos?.slice(0, 6)?.map((photo, index) => (
                    <div key={index} className="aspect-square rounded-lg overflow-hidden">
                      <Image
                        src={photo}
                        alt={`${trip?.destination} photo ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}

              <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5]?.map((star) => (
                      <Icon
                        key={star}
                        name="Star"
                        size={14}
                        className={star <= (trip?.rating || 5) ? 'text-warning fill-current' : 'text-muted-foreground'}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {trip?.companionRating ? `Companion rated ${trip?.companionRating}/5` : 'Solo trip'}
                  </span>
                </div>
                <Button variant="ghost" size="sm">
                  <Icon name="Share" size={16} className="mr-2" />
                  Share
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
        <div className="flex items-start space-x-3">
          <Icon name="Trophy" size={16} className="text-primary mt-0.5" />
          <div className="text-sm">
            <p className="font-medium text-foreground mb-1">Travel Credibility</p>
            <p className="text-muted-foreground">
              Showcasing your travel history helps build trust with potential partners and demonstrates your experience as a traveler.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelHistorySection;