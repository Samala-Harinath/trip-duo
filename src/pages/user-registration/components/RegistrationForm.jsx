import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';


const RegistrationForm = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    dateOfBirth: '',
    gender: '',
    location: '',
    budgetRange: '',
    accommodationTypes: [],
    travelInterests: [],
    agreeToTerms: false,
    agreeToPrivacy: false
  });

  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState(0);

  const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' }
  ];

  const budgetOptions = [
    { value: 'budget', label: 'Budget (₹4,000-8,000/day)' },
    { value: 'mid-range', label: 'Mid-range (₹8,000-16,000/day)' },
    { value: 'luxury', label: 'Luxury (₹16,000+/day)' },
    { value: 'flexible', label: 'Flexible' }
  ];

  const accommodationOptions = [
    { value: 'hotel', label: 'Hotels' },
    { value: 'hostel', label: 'Hostels' },
    { value: 'airbnb', label: 'Airbnb/Vacation Rentals' },
    { value: 'resort', label: 'Resorts' },
    { value: 'boutique', label: 'Boutique Hotels' }
  ];

  const interestOptions = [
    { value: 'adventure', label: 'Adventure Sports' },
    { value: 'culture', label: 'Cultural Experiences' },
    { value: 'food', label: 'Food & Cuisine' },
    { value: 'nature', label: 'Nature & Wildlife' },
    { value: 'nightlife', label: 'Nightlife' },
    { value: 'photography', label: 'Photography' },
    { value: 'history', label: 'Historical Sites' },
    { value: 'beach', label: 'Beach & Water Activities' }
  ];

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex?.test(email);
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password?.length >= 8) strength += 25;
    if (/[A-Z]/?.test(password)) strength += 25;
    if (/[0-9]/?.test(password)) strength += 25;
    if (/[^A-Za-z0-9]/?.test(password)) strength += 25;
    return strength;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }

    // Real-time validation
    if (field === 'email' && value) {
      if (!validateEmail(value)) {
        setErrors(prev => ({ ...prev, email: 'Please enter a valid email address' }));
      }
    }

    if (field === 'password') {
      setPasswordStrength(calculatePasswordStrength(value));
      if (formData?.confirmPassword && value !== formData?.confirmPassword) {
        setErrors(prev => ({ ...prev, confirmPassword: 'Passwords do not match' }));
      }
    }

    if (field === 'confirmPassword') {
      if (value !== formData?.password) {
        setErrors(prev => ({ ...prev, confirmPassword: 'Passwords do not match' }));
      }
    }
  };

  const handleCheckboxChange = (field, value, checked) => {
    if (field === 'accommodationTypes' || field === 'travelInterests') {
      setFormData(prev => ({
        ...prev,
        [field]: checked 
          ? [...prev?.[field], value]
          : prev?.[field]?.filter(item => item !== value)
      }));
    } else {
      setFormData(prev => ({ ...prev, [field]: checked }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.fullName?.trim()) newErrors.fullName = 'Full name is required';
    if (!formData?.email?.trim()) newErrors.email = 'Email is required';
    else if (!validateEmail(formData?.email)) newErrors.email = 'Please enter a valid email address';
    if (!formData?.password) newErrors.password = 'Password is required';
    else if (formData?.password?.length < 8) newErrors.password = 'Password must be at least 8 characters';
    if (!formData?.confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
    else if (formData?.password !== formData?.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!formData?.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    if (!formData?.gender) newErrors.gender = 'Gender selection is required';
    if (!formData?.location?.trim()) newErrors.location = 'Location is required';
    if (!formData?.agreeToTerms) newErrors.agreeToTerms = 'You must agree to the terms of service';
    if (!formData?.agreeToPrivacy) newErrors.agreeToPrivacy = 'You must agree to the privacy policy';

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength < 25) return 'bg-red-500';
    if (passwordStrength < 50) return 'bg-orange-500';
    if (passwordStrength < 75) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength < 25) return 'Weak';
    if (passwordStrength < 50) return 'Fair';
    if (passwordStrength < 75) return 'Good';
    return 'Strong';
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Personal Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">Personal Information</h3>
        
        <Input
          label="Full Name"
          type="text"
          placeholder="Enter your full name"
          value={formData?.fullName}
          onChange={(e) => handleInputChange('fullName', e?.target?.value)}
          error={errors?.fullName}
          required
        />

        <Input
          label="Email Address"
          type="email"
          placeholder="Enter your email address"
          value={formData?.email}
          onChange={(e) => handleInputChange('email', e?.target?.value)}
          error={errors?.email}
          required
        />

        <div className="space-y-2">
          <Input
            label="Password"
            type="password"
            placeholder="Create a strong password"
            value={formData?.password}
            onChange={(e) => handleInputChange('password', e?.target?.value)}
            error={errors?.password}
            required
          />
          {formData?.password && (
            <div className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Password strength:</span>
                <span className={`font-medium ${passwordStrength >= 75 ? 'text-green-600' : passwordStrength >= 50 ? 'text-yellow-600' : 'text-red-600'}`}>
                  {getPasswordStrengthText()}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all ${getPasswordStrengthColor()}`}
                  style={{ width: `${passwordStrength}%` }}
                />
              </div>
            </div>
          )}
        </div>

        <Input
          label="Confirm Password"
          type="password"
          placeholder="Confirm your password"
          value={formData?.confirmPassword}
          onChange={(e) => handleInputChange('confirmPassword', e?.target?.value)}
          error={errors?.confirmPassword}
          required
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Date of Birth"
            type="date"
            value={formData?.dateOfBirth}
            onChange={(e) => handleInputChange('dateOfBirth', e?.target?.value)}
            error={errors?.dateOfBirth}
            required
          />

          <Select
            label="Gender"
            placeholder="Select your gender"
            options={genderOptions}
            value={formData?.gender}
            onChange={(value) => handleInputChange('gender', value)}
            error={errors?.gender}
            required
          />
        </div>

        <Input
          label="Location/City"
          type="text"
          placeholder="Enter your city or location"
          value={formData?.location}
          onChange={(e) => handleInputChange('location', e?.target?.value)}
          error={errors?.location}
          required
        />
      </div>
      {/* Travel Preferences */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">Travel Preferences</h3>
        
        <Select
          label="Budget Range"
          placeholder="Select your typical budget range"
          options={budgetOptions}
          value={formData?.budgetRange}
          onChange={(value) => handleInputChange('budgetRange', value)}
        />

        <div className="space-y-3">
          <label className="block text-sm font-medium text-foreground">
            Preferred Accommodation Types
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {accommodationOptions?.map((option) => (
              <Checkbox
                key={option?.value}
                label={option?.label}
                checked={formData?.accommodationTypes?.includes(option?.value)}
                onChange={(e) => handleCheckboxChange('accommodationTypes', option?.value, e?.target?.checked)}
              />
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <label className="block text-sm font-medium text-foreground">
            Travel Interests
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {interestOptions?.map((option) => (
              <Checkbox
                key={option?.value}
                label={option?.label}
                checked={formData?.travelInterests?.includes(option?.value)}
                onChange={(e) => handleCheckboxChange('travelInterests', option?.value, e?.target?.checked)}
              />
            ))}
          </div>
        </div>
      </div>
      {/* Terms and Privacy */}
      <div className="space-y-4 pt-4 border-t border-border">
        <Checkbox
          label="I agree to the Terms of Service"
          checked={formData?.agreeToTerms}
          onChange={(e) => handleCheckboxChange('agreeToTerms', null, e?.target?.checked)}
          error={errors?.agreeToTerms}
          required
        />

        <Checkbox
          label="I agree to the Privacy Policy"
          checked={formData?.agreeToPrivacy}
          onChange={(e) => handleCheckboxChange('agreeToPrivacy', null, e?.target?.checked)}
          error={errors?.agreeToPrivacy}
          required
        />
      </div>
      {/* Submit Button */}
      <Button
        type="submit"
        variant="default"
        size="lg"
        fullWidth
        loading={isLoading}
        iconName="UserPlus"
        iconPosition="left"
      >
        Create Account
      </Button>
    </form>
  );
};

export default RegistrationForm;