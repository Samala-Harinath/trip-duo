import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const FilterPanel = ({ filters, onFiltersChange, isOpen, onToggle, matchCount }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const destinationOptions = [
    { value: '', label: 'Any Destination' },
    { value: 'paris', label: 'Paris, France' },
    { value: 'tokyo', label: 'Tokyo, Japan' },
    { value: 'bali', label: 'Bali, Indonesia' },
    { value: 'rome', label: 'Rome, Italy' },
    { value: 'thailand', label: 'Bangkok, Thailand' },
    { value: 'spain', label: 'Barcelona, Spain' },
    { value: 'greece', label: 'Santorini, Greece' },
    { value: 'peru', label: 'Machu Picchu, Peru' },
    { value: 'iceland', label: 'Reykjavik, Iceland' },
    { value: 'morocco', label: 'Marrakech, Morocco' }
  ];

  const budgetOptions = [
    { value: '', label: 'Any Budget' },
    { value: 'budget', label: 'Budget (₹40,000-1,20,000)' },
    { value: 'mid-range', label: 'Mid-range (₹1,20,000-2,40,000)' },
    { value: 'luxury', label: 'Luxury (₹2,40,000+)' }
  ];

  const activityOptions = [
    { value: '', label: 'Any Activity' },
    { value: 'adventure', label: 'Adventure & Outdoor' },
    { value: 'cultural', label: 'Cultural & Historical' },
    { value: 'relaxation', label: 'Beach & Relaxation' },
    { value: 'nightlife', label: 'Nightlife & Entertainment' },
    { value: 'food', label: 'Food & Culinary' },
    { value: 'photography', label: 'Photography & Sightseeing' },
    { value: 'wellness', label: 'Wellness & Spa' },
    { value: 'shopping', label: 'Shopping & Markets' }
  ];

  const handleFilterChange = (key, value) => {
    const updatedFilters = { ...localFilters, [key]: value };
    setLocalFilters(updatedFilters);
    onFiltersChange(updatedFilters);
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      destination: '',
      startDate: '',
      endDate: '',
      budget: '',
      activities: '',
      minAge: '',
      maxAge: ''
    };
    setLocalFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const hasActiveFilters = Object.values(localFilters)?.some(value => value !== '');

  return (
    <>
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-6">
        <Button
          variant="outline"
          onClick={onToggle}
          iconName="Filter"
          iconPosition="left"
          className="w-full"
        >
          Filters {hasActiveFilters && `(${Object.values(localFilters)?.filter(v => v !== '')?.length})`}
        </Button>
      </div>
      {/* Filter Panel */}
      <div className={`
        lg:block bg-surface border border-border rounded-lg p-6 mb-6
        ${isOpen ? 'block' : 'hidden'}
        lg:sticky lg:top-24
      `}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Icon name="Filter" size={20} className="mr-2 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Filters</h3>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">
              {matchCount} matches
            </span>
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearFilters}
                iconName="X"
                iconSize={16}
              >
                Clear
              </Button>
            )}
          </div>
        </div>

        <div className="space-y-4">
          {/* Destination */}
          <Select
            label="Destination"
            options={destinationOptions}
            value={localFilters?.destination}
            onChange={(value) => handleFilterChange('destination', value)}
            searchable
            placeholder="Search destinations..."
          />

          {/* Travel Dates */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Start Date"
              type="date"
              value={localFilters?.startDate}
              onChange={(e) => handleFilterChange('startDate', e?.target?.value)}
              min={new Date()?.toISOString()?.split('T')?.[0]}
            />
            <Input
              label="End Date"
              type="date"
              value={localFilters?.endDate}
              onChange={(e) => handleFilterChange('endDate', e?.target?.value)}
              min={localFilters?.startDate || new Date()?.toISOString()?.split('T')?.[0]}
            />
          </div>

          {/* Budget Range */}
          <Select
            label="Budget Range"
            options={budgetOptions}
            value={localFilters?.budget}
            onChange={(value) => handleFilterChange('budget', value)}
          />

          {/* Activity Interests */}
          <Select
            label="Activity Interests"
            options={activityOptions}
            value={localFilters?.activities}
            onChange={(value) => handleFilterChange('activities', value)}
            searchable
            placeholder="Select activity type..."
          />

          {/* Age Range */}
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Min Age"
              type="number"
              placeholder="25"
              value={localFilters?.minAge}
              onChange={(e) => handleFilterChange('minAge', e?.target?.value)}
              min="18"
              max="65"
            />
            <Input
              label="Max Age"
              type="number"
              placeholder="45"
              value={localFilters?.maxAge}
              onChange={(e) => handleFilterChange('maxAge', e?.target?.value)}
              min={localFilters?.minAge || "18"}
              max="65"
            />
          </div>
        </div>

        {/* Mobile Close Button */}
        <div className="lg:hidden mt-6 pt-4 border-t border-border">
          <Button
            variant="primary"
            onClick={onToggle}
            fullWidth
          >
            View {matchCount} Matches
          </Button>
        </div>
      </div>
    </>
  );
};

export default FilterPanel;