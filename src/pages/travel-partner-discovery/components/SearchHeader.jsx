import React from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const SearchHeader = ({ searchQuery, onSearchChange, sortBy, onSortChange }) => {
  const sortOptions = [
    { value: 'compatibility', label: 'Best Match' },
    { value: 'recent', label: 'Recently Active' },
    { value: 'distance', label: 'Nearest First' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'age-asc', label: 'Age: Youngest First' },
    { value: 'age-desc', label: 'Age: Oldest First' }
  ];

  return (
    <div className="bg-surface border border-border rounded-lg p-4 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
        {/* Search Input */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Icon 
              name="Search" 
              size={20} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
            />
            <Input
              type="search"
              placeholder="Search by name, location, or interests..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e?.target?.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Sort Options */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center text-sm text-muted-foreground">
            <Icon name="ArrowUpDown" size={16} className="mr-2" />
            <span>Sort by:</span>
          </div>
          <div className="min-w-[180px]">
            <Select
              options={sortOptions}
              value={sortBy}
              onChange={onSortChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchHeader;