import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const ItineraryBuilder = ({ itinerary = [], onItineraryChange }) => {
  const [draggedItem, setDraggedItem] = useState(null);
  const [expandedDays, setExpandedDays] = useState({ 0: true });

  const addDay = () => {
    const newDay = {
      id: Date.now(),
      dayNumber: itinerary?.length + 1,
      date: '',
      activities: []
    };
    const updatedItinerary = [...itinerary, newDay];
    onItineraryChange(updatedItinerary);
    
    // Expand the new day
    setExpandedDays(prev => ({
      ...prev,
      [itinerary?.length]: true
    }));
  };

  const removeDay = (dayIndex) => {
    const updatedItinerary = itinerary?.filter((_, index) => index !== dayIndex)?.map((day, index) => ({ ...day, dayNumber: index + 1 }));
    onItineraryChange(updatedItinerary);
    
    // Update expanded days
    const newExpandedDays = {};
    Object.keys(expandedDays)?.forEach(key => {
      const dayIndex = parseInt(key);
      if (dayIndex < updatedItinerary?.length) {
        newExpandedDays[dayIndex] = expandedDays?.[key];
      }
    });
    setExpandedDays(newExpandedDays);
  };

  const addActivity = (dayIndex) => {
    const newActivity = {
      id: Date.now(),
      time: '09:00',
      title: '',
      location: '',
      description: '',
      estimatedCost: 0
    };
    
    const updatedItinerary = [...itinerary];
    updatedItinerary?.[dayIndex]?.activities?.push(newActivity);
    onItineraryChange(updatedItinerary);
  };

  const updateActivity = (dayIndex, activityIndex, field, value) => {
    const updatedItinerary = [...itinerary];
    updatedItinerary[dayIndex].activities[activityIndex][field] = value;
    onItineraryChange(updatedItinerary);
  };

  const removeActivity = (dayIndex, activityIndex) => {
    const updatedItinerary = [...itinerary];
    updatedItinerary?.[dayIndex]?.activities?.splice(activityIndex, 1);
    onItineraryChange(updatedItinerary);
  };

  const updateDayDate = (dayIndex, date) => {
    const updatedItinerary = [...itinerary];
    updatedItinerary[dayIndex].date = date;
    onItineraryChange(updatedItinerary);
  };

  const toggleDay = (dayIndex) => {
    setExpandedDays(prev => ({
      ...prev,
      [dayIndex]: !prev?.[dayIndex]
    }));
  };

  const handleDragStart = (e, dayIndex, activityIndex) => {
    setDraggedItem({ dayIndex, activityIndex });
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e?.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, targetDayIndex, targetActivityIndex) => {
    e?.preventDefault();
    
    if (!draggedItem) return;
    
    const { dayIndex: sourceDayIndex, activityIndex: sourceActivityIndex } = draggedItem;
    
    if (sourceDayIndex === targetDayIndex && sourceActivityIndex === targetActivityIndex) {
      setDraggedItem(null);
      return;
    }

    const updatedItinerary = [...itinerary];
    const draggedActivity = updatedItinerary?.[sourceDayIndex]?.activities?.[sourceActivityIndex];
    
    // Remove from source
    updatedItinerary?.[sourceDayIndex]?.activities?.splice(sourceActivityIndex, 1);
    
    // Add to target
    updatedItinerary?.[targetDayIndex]?.activities?.splice(targetActivityIndex, 0, draggedActivity);
    
    onItineraryChange(updatedItinerary);
    setDraggedItem(null);
  };

  const getTotalEstimatedCost = () => {
    return itinerary?.reduce((total, day) => {
      return total + day?.activities?.reduce((dayTotal, activity) => {
        return dayTotal + (parseFloat(activity?.estimatedCost) || 0);
      }, 0);
    }, 0);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
            <Icon name="Calendar" size={20} color="var(--color-secondary)" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-card-foreground">Itinerary Builder</h2>
            <p className="text-sm text-muted-foreground">
              {itinerary?.length} days planned • Est. cost: ₹{getTotalEstimatedCost()?.toFixed(2)}
            </p>
          </div>
        </div>
        <Button
          variant="outline"
          onClick={addDay}
          iconName="Plus"
          iconPosition="left"
        >
          Add Day
        </Button>
      </div>
      {itinerary?.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-border rounded-lg">
          <Icon name="Calendar" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-4" />
          <h3 className="text-lg font-medium text-card-foreground mb-2">No itinerary yet</h3>
          <p className="text-muted-foreground mb-4">Start building your day-by-day travel plan</p>
          <Button onClick={addDay} iconName="Plus" iconPosition="left">
            Add First Day
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {itinerary?.map((day, dayIndex) => (
            <div key={day?.id} className="border border-border rounded-lg">
              <div className="flex items-center justify-between p-4 bg-muted/30 rounded-t-lg">
                <button
                  onClick={() => toggleDay(dayIndex)}
                  className="flex items-center space-x-3 flex-1 text-left"
                >
                  <Icon 
                    name="ChevronRight" 
                    size={16} 
                    className={`transition-transform ${
                      expandedDays?.[dayIndex] ? 'rotate-90' : ''
                    }`}
                  />
                  <span className="font-medium text-card-foreground">
                    Day {day?.dayNumber}
                  </span>
                  {day?.date && (
                    <span className="text-sm text-muted-foreground">
                      {new Date(day.date)?.toLocaleDateString()}
                    </span>
                  )}
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                    {day?.activities?.length} activities
                  </span>
                </button>
                
                <div className="flex items-center space-x-2">
                  <Input
                    type="date"
                    value={day?.date}
                    onChange={(e) => updateDayDate(dayIndex, e?.target?.value)}
                    className="w-auto"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeDay(dayIndex)}
                    iconName="Trash2"
                    className="text-error hover:text-error"
                  />
                </div>
              </div>

              {expandedDays?.[dayIndex] && (
                <div className="p-4 space-y-4">
                  {day?.activities?.map((activity, activityIndex) => (
                    <div
                      key={activity?.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, dayIndex, activityIndex)}
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDrop(e, dayIndex, activityIndex)}
                      className="bg-surface border border-border rounded-lg p-4 cursor-move hover:shadow-soft transition-smooth"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <Icon name="GripVertical" size={16} color="var(--color-muted-foreground)" />
                          <Input
                            type="time"
                            value={activity?.time}
                            onChange={(e) => updateActivity(dayIndex, activityIndex, 'time', e?.target?.value)}
                            className="w-24"
                          />
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeActivity(dayIndex, activityIndex)}
                          iconName="X"
                          className="text-error hover:text-error"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                          label="Activity Title"
                          placeholder="e.g., Visit Tokyo Tower"
                          value={activity?.title}
                          onChange={(e) => updateActivity(dayIndex, activityIndex, 'title', e?.target?.value)}
                        />
                        <Input
                          label="Location"
                          placeholder="e.g., Minato City, Tokyo"
                          value={activity?.location}
                          onChange={(e) => updateActivity(dayIndex, activityIndex, 'location', e?.target?.value)}
                        />
                        <Input
                          label="Estimated Cost (₹)"
                          type="number"
                          placeholder="0.00"
                          value={activity?.estimatedCost}
                          onChange={(e) => updateActivity(dayIndex, activityIndex, 'estimatedCost', e?.target?.value)}
                        />
                        <Input
                          label="Description"
                          placeholder="Additional notes..."
                          value={activity?.description}
                          onChange={(e) => updateActivity(dayIndex, activityIndex, 'description', e?.target?.value)}
                        />
                      </div>
                    </div>
                  ))}

                  <Button
                    variant="outline"
                    onClick={() => addActivity(dayIndex)}
                    iconName="Plus"
                    iconPosition="left"
                    className="w-full"
                  >
                    Add Activity
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ItineraryBuilder;