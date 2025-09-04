import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ActivityFeed = ({ activities }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'profile_view':
        return 'Eye';
      case 'new_match':
        return 'Heart';
      case 'trip_update':
        return 'Plane';
      case 'message':
        return 'MessageCircle';
      case 'invitation':
        return 'Mail';
      default:
        return 'Bell';
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'profile_view':
        return 'text-blue-600 bg-blue-50';
      case 'new_match':
        return 'text-red-600 bg-red-50';
      case 'trip_update':
        return 'text-green-600 bg-green-50';
      case 'message':
        return 'text-purple-600 bg-purple-50';
      case 'invitation':
        return 'text-amber-600 bg-amber-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const activityTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - activityTime) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div className="bg-white rounded-xl shadow-soft border border-gray-100 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {activities?.map((activity) => (
          <div key={activity?.id} className="flex items-start space-x-3">
            <div className={`p-2 rounded-full ${getActivityColor(activity?.type)}`}>
              <Icon name={getActivityIcon(activity?.type)} size={16} />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2">
                {activity?.userPhoto && (
                  <div className="w-6 h-6 rounded-full overflow-hidden">
                    <Image 
                      src={activity?.userPhoto} 
                      alt={activity?.userName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <p className="text-sm text-gray-900">
                  <span className="font-medium">{activity?.userName}</span> {activity?.message}
                </p>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {formatTimeAgo(activity?.timestamp)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityFeed;