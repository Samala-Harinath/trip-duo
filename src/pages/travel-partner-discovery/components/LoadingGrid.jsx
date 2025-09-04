import React from 'react';

const LoadingGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)]?.map((_, index) => (
        <div key={index} className="bg-surface border border-border rounded-lg overflow-hidden animate-pulse">
          {/* Image Skeleton */}
          <div className="h-64 bg-muted"></div>
          
          {/* Content Skeleton */}
          <div className="p-4">
            {/* Name and Age */}
            <div className="flex items-center justify-between mb-3">
              <div className="space-y-2">
                <div className="h-5 bg-muted rounded w-32"></div>
                <div className="h-4 bg-muted rounded w-24"></div>
              </div>
              <div className="h-6 bg-muted rounded-full w-16"></div>
            </div>
            
            {/* Travel Info */}
            <div className="space-y-2 mb-4">
              <div className="h-4 bg-muted rounded w-full"></div>
              <div className="h-3 bg-muted rounded w-3/4"></div>
            </div>
            
            {/* Interests */}
            <div className="flex space-x-2 mb-4">
              <div className="h-6 bg-muted rounded-full w-16"></div>
              <div className="h-6 bg-muted rounded-full w-20"></div>
              <div className="h-6 bg-muted rounded-full w-14"></div>
            </div>
            
            {/* Stats */}
            <div className="flex justify-between mb-4">
              <div className="h-3 bg-muted rounded w-20"></div>
              <div className="h-3 bg-muted rounded w-24"></div>
            </div>
            
            {/* Buttons */}
            <div className="flex space-x-2">
              <div className="h-8 bg-muted rounded flex-1"></div>
              <div className="h-8 bg-muted rounded flex-1"></div>
              <div className="h-8 bg-muted rounded w-8"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingGrid;