import React from 'react';
import Icon from '../../../components/AppIcon';

const StatsOverview = ({ stats }) => {
  const statItems = [
    {
      label: 'Profile Views',
      value: stats?.profileViews,
      icon: 'Eye',
      color: 'text-blue-600 bg-blue-50',
      change: stats?.profileViewsChange
    },
    {
      label: 'New Matches',
      value: stats?.newMatches,
      icon: 'Heart',
      color: 'text-red-600 bg-red-50',
      change: stats?.newMatchesChange
    },
    {
      label: 'Active Trips',
      value: stats?.activeTrips,
      icon: 'Plane',
      color: 'text-green-600 bg-green-50',
      change: stats?.activeTripsChange
    },
    {
      label: 'Messages',
      value: stats?.messages,
      icon: 'MessageCircle',
      color: 'text-purple-600 bg-purple-50',
      change: stats?.messagesChange
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {statItems?.map((item, index) => (
        <div key={index} className="bg-white rounded-xl shadow-soft border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{item?.label}</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{item?.value}</p>
              {item?.change !== undefined && (
                <p className={`text-xs mt-1 flex items-center ${
                  item?.change >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  <Icon 
                    name={item?.change >= 0 ? 'TrendingUp' : 'TrendingDown'} 
                    size={12} 
                    className="mr-1" 
                  />
                  {Math.abs(item?.change)}% from last week
                </p>
              )}
            </div>
            <div className={`p-3 rounded-full ${item?.color}`}>
              <Icon name={item?.icon} size={20} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsOverview;