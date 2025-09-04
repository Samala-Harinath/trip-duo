import React, { useState, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const CostEstimator = ({ 
  tripData = {}, 
  itinerary = [], 
  selectedActivities = [],
  onCostUpdate 
}) => {
  const [costBreakdown, setCostBreakdown] = useState({
    accommodation: 0,
    transportation: 0,
    activities: 0,
    food: 0,
    miscellaneous: 0
  });
  
  const [splitOption, setSplitOption] = useState('equal');
  const [currency, setCurrency] = useState('INR');

  const currencyOptions = [
    { value: 'INR', label: 'INR (₹)', description: 'Indian Rupee' },
    { value: 'USD', label: 'USD ($)', description: 'US Dollar' },
    { value: 'EUR', label: 'EUR (€)', description: 'Euro' },
    { value: 'GBP', label: 'GBP (£)', description: 'British Pound' }
  ];

  const splitOptions = [
    { value: 'equal', label: 'Split Equally', description: 'Divide all costs equally' },
    { value: 'individual', label: 'Individual Expenses', description: 'Each person pays their own' },
    { value: 'custom', label: 'Custom Split', description: 'Custom percentage split' }
  ];

  // Mock cost calculation based on trip data
  useEffect(() => {
    const calculateCosts = () => {
      const days = tripData?.startDate && tripData?.endDate 
        ? Math.ceil((new Date(tripData.endDate) - new Date(tripData.startDate)) / (1000 * 60 * 60 * 24))
        : 7;

      let accommodationCost = 0;
      let transportationCost = 15000; // Base transportation cost for Indian travel (flights/trains)
      let activitiesCost = 0;
      let foodCost = 0;
      let miscellaneousCost = 0;

      // Calculate accommodation cost based on type and budget (in INR)
      switch (tripData?.accommodation) {
        case 'luxury':
          accommodationCost = days * 15000; // 5-star hotels
          break;
        case 'hotel':
          accommodationCost = days * 5000;  // 3-4 star hotels
          break;
        case 'boutique':
          accommodationCost = days * 8000;  // Heritage/boutique hotels
          break;
        case 'airbnb':
          accommodationCost = days * 3500;  // Airbnb/service apartments
          break;
        case 'hostel':
          accommodationCost = days * 1000;  // Hostels/budget hotels
          break;
        default:
          accommodationCost = days * 4000;  // Mid-range accommodation
      }

      // Calculate activities cost
      const activityCosts = {
        'hiking': 1500,           // Hiking in places like Himalayas
        'water-sports': 3000,     // Water sports in Goa/Andaman
        'museums': 500,           // Museum entry fees
        'food-tours': 2000,       // Local food tours
        'spa': 4000,             // Ayurvedic spa treatments
        'nightlife': 2500,       // Club entry and drinks
        'shopping': 5000,        // Shopping at local markets/malls
        'cycling': 1000,         // City cycling tours
        'temples': 200,          // Temple visits (some are free)
        'beaches': 0,            // Public beaches
        'local-tours': 2500,     // City/village tours
        'cooking-class': 2000,   // Indian cooking classes
        'heritage-walk': 1500,   // Heritage site walks
        'yoga-class': 1000,      // Yoga sessions
        'handicraft': 1500,      // Handicraft workshops
        'desert-safari': 3500,   // Desert safaris in Rajasthan
        'boat-ride': 1200,       // River/backwater rides
        'dance-show': 2000,      // Cultural dance shows
        'markets': 500           // Local market visits
      };

      activitiesCost = selectedActivities?.reduce((total, activityId) => {
        return total + (activityCosts?.[activityId] || 50);
      }, 0);

      // Add itinerary activity costs
      const itineraryCost = itinerary?.reduce((total, day) => {
        return total + day?.activities?.reduce((dayTotal, activity) => {
          return dayTotal + (parseFloat(activity?.estimatedCost) || 0);
        }, 0);
      }, 0);

      activitiesCost += itineraryCost;

      // Calculate food cost based on budget (in INR)
      switch (tripData?.budget) {
        case 'luxury':
          foodCost = days * 3000;  // High-end restaurants and fine dining
          break;
        case 'mid-range':
          foodCost = days * 1500;  // Mix of restaurants and local eateries
          break;
        case 'budget':
          foodCost = days * 800;   // Local restaurants and street food
          break;
        default:
          foodCost = days * 1200;  // Average Indian food budget
      }

      // Miscellaneous costs (10% of total)
      const subtotal = accommodationCost + transportationCost + activitiesCost + foodCost;
      miscellaneousCost = Math.round(subtotal * 0.1);

      const newCostBreakdown = {
        accommodation: accommodationCost,
        transportation: transportationCost,
        activities: activitiesCost,
        food: foodCost,
        miscellaneous: miscellaneousCost
      };

      setCostBreakdown(newCostBreakdown);
      
      if (onCostUpdate) {
        onCostUpdate(newCostBreakdown);
      }
    };

    calculateCosts();
  }, [tripData, itinerary, selectedActivities, onCostUpdate]);

  const getTotalCost = () => {
    return Object.values(costBreakdown)?.reduce((total, cost) => total + cost, 0);
  };

  const getCostPerPerson = (companionCount = 2) => {
    const total = getTotalCost();
    switch (splitOption) {
      case 'equal':
        return total / companionCount;
      case 'individual':
        return total; // Each person pays full amount for their choices
      case 'custom':
        return total * 0.5; // Assuming 50% split for demo
      default:
        return total / companionCount;
    }
  };

  const formatCurrency = (amount) => {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
    return formatter?.format(amount);
  };

  const getCostCategoryIcon = (category) => {
    const icons = {
      accommodation: 'Bed',
      transportation: 'Plane',
      activities: 'MapPin',
      food: 'UtensilsCrossed',
      miscellaneous: 'MoreHorizontal'
    };
    return icons?.[category] || 'DollarSign';
  };

  const getCostCategoryColor = (category) => {
    const colors = {
      accommodation: 'var(--color-primary)',
      transportation: 'var(--color-secondary)',
      activities: 'var(--color-accent)',
      food: 'var(--color-success)',
      miscellaneous: 'var(--color-muted-foreground)'
    };
    return colors?.[category] || 'var(--color-muted-foreground)';
  };

  const getPercentage = (amount) => {
    const total = getTotalCost();
    return total > 0 ? Math.round((amount / total) * 100) : 0;
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
          <Icon name="Calculator" size={20} color="var(--color-success)" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-card-foreground">Cost Estimator</h2>
          <p className="text-sm text-muted-foreground">
            Real-time cost breakdown for your trip
          </p>
        </div>
      </div>
      {/* Currency and Split Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Select
          label="Currency"
          options={currencyOptions}
          value={currency}
          onChange={setCurrency}
        />
        <Select
          label="Cost Splitting"
          options={splitOptions}
          value={splitOption}
          onChange={setSplitOption}
        />
      </div>
      {/* Total Cost Summary */}
      <div className="bg-primary/5 rounded-lg p-6 mb-6 border border-primary/20">
        <div className="text-center">
          <div className="text-3xl font-bold text-primary mb-2">
            {formatCurrency(getTotalCost())}
          </div>
          <p className="text-sm text-muted-foreground mb-4">Total Estimated Cost</p>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-lg font-semibold text-card-foreground">
                {formatCurrency(getCostPerPerson())}
              </div>
              <p className="text-xs text-muted-foreground">Per Person</p>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-card-foreground">
                {Math.ceil(getTotalCost() / 100)} days
              </div>
              <p className="text-xs text-muted-foreground">Daily Average</p>
            </div>
          </div>
        </div>
      </div>
      {/* Cost Breakdown */}
      <div className="space-y-4">
        <h3 className="font-medium text-card-foreground flex items-center">
          <Icon name="PieChart" size={16} className="mr-2" />
          Cost Breakdown
        </h3>

        {Object.entries(costBreakdown)?.map(([category, amount]) => (
          <div key={category} className="flex items-center justify-between p-4 bg-surface rounded-lg border border-border">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" 
                   style={{ backgroundColor: `${getCostCategoryColor(category)}20` }}>
                <Icon 
                  name={getCostCategoryIcon(category)} 
                  size={16} 
                  color={getCostCategoryColor(category)} 
                />
              </div>
              <div>
                <span className="font-medium text-card-foreground capitalize">
                  {category?.replace(/([A-Z])/g, ' $1')?.trim()}
                </span>
                <div className="text-xs text-muted-foreground">
                  {getPercentage(amount)}% of total
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <div className="font-semibold text-card-foreground">
                {formatCurrency(amount)}
              </div>
              <div className="text-xs text-muted-foreground">
                {formatCurrency(amount / 2)} per person
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Cost Optimization Tips */}
      <div className="mt-6 p-4 bg-accent/5 rounded-lg border border-accent/20">
        <h4 className="font-medium text-card-foreground mb-3 flex items-center">
          <Icon name="Lightbulb" size={16} className="mr-2 text-accent" />
          Cost Optimization Tips
        </h4>
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-start space-x-2">
            <Icon name="ArrowRight" size={12} className="mt-1 text-accent" />
            <span>Book train tickets through IRCTC 120 days in advance for best rates</span>
          </div>
          <div className="flex items-start space-x-2">
            <Icon name="ArrowRight" size={12} className="mt-1 text-accent" />
            <span>Travel during off-season (avoid peak festival times like Diwali)</span>
          </div>
          <div className="flex items-start space-x-2">
            <Icon name="ArrowRight" size={12} className="mt-1 text-accent" />
            <span>Use state tourism board packages for better deals</span>
          </div>
          <div className="flex items-start space-x-2">
            <Icon name="ArrowRight" size={12} className="mt-1 text-accent" />
            <span>Mix luxury hotels with budget homestays for authentic experiences</span>
          </div>
          <div className="flex items-start space-x-2">
            <Icon name="ArrowRight" size={12} className="mt-1 text-accent" />
            <span>Consider local transport options like auto-rickshaws for city travel</span>
          </div>
        </div>
      </div>
      {/* Action Buttons */}
      <div className="flex space-x-3 mt-6">
        <Button
          variant="outline"
          iconName="Download"
          iconPosition="left"
          className="flex-1"
        >
          Export Estimate
        </Button>
        <Button
          variant="outline"
          iconName="Share"
          iconPosition="left"
          className="flex-1"
        >
          Share with Companion
        </Button>
      </div>
    </div>
  );
};

export default CostEstimator;