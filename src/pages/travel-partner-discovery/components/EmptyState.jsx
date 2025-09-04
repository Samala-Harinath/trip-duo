import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmptyState = ({ hasFilters, onClearFilters, onBrowseAll }) => {
  if (hasFilters) {
    return (
      <div className="text-center py-16">
        <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
          <Icon name="Search" size={32} className="text-muted-foreground" />
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-2">No matches found</h3>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          We couldn't find any travel partners matching your current filters. Try adjusting your search criteria or clearing filters to see more options.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            variant="outline"
            onClick={onClearFilters}
            iconName="X"
            iconPosition="left"
          >
            Clear Filters
          </Button>
          <Button
            variant="primary"
            onClick={onBrowseAll}
            iconName="Users"
            iconPosition="left"
          >
            Browse All Partners
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="text-center py-16">
      <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
        <Icon name="Users" size={32} className="text-primary" />
      </div>
      <h3 className="text-xl font-semibold text-foreground mb-2">Welcome to Partner Discovery</h3>
      <p className="text-muted-foreground mb-6 max-w-md mx-auto">
        Start exploring potential travel companions by using the search and filter options above. Find your perfect travel match today!
      </p>
      <Button
        variant="primary"
        onClick={onBrowseAll}
        iconName="Compass"
        iconPosition="left"
      >
        Start Exploring
      </Button>
    </div>
  );
};

export default EmptyState;