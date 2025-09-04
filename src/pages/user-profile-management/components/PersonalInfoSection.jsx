import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const PersonalInfoSection = ({ formData, onFormChange, errors }) => {
  const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' }
  ];

  const ageOptions = Array.from({ length: 56 }, (_, i) => ({
    value: (i + 18)?.toString(),
    label: `${i + 18} years old`
  }));

  const occupationOptions = [
    { value: 'software_engineer', label: 'Software Engineer' },
    { value: 'doctor', label: 'Doctor' },
    { value: 'teacher', label: 'Teacher' },
    { value: 'business_owner', label: 'Business Owner' },
    { value: 'consultant', label: 'Consultant' },
    { value: 'designer', label: 'Designer' },
    { value: 'marketing', label: 'Marketing Professional' },
    { value: 'finance', label: 'Finance Professional' },
    { value: 'other', label: 'Other' }
  ];

  const languageOptions = [
    { value: 'english', label: 'English' },
    { value: 'spanish', label: 'Spanish' },
    { value: 'french', label: 'French' },
    { value: 'german', label: 'German' },
    { value: 'italian', label: 'Italian' },
    { value: 'portuguese', label: 'Portuguese' },
    { value: 'mandarin', label: 'Mandarin' },
    { value: 'japanese', label: 'Japanese' },
    { value: 'korean', label: 'Korean' },
    { value: 'arabic', label: 'Arabic' }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="First Name"
          type="text"
          placeholder="Enter your first name"
          value={formData?.firstName}
          onChange={(e) => onFormChange('firstName', e?.target?.value)}
          error={errors?.firstName}
          required
        />
        
        <Input
          label="Last Name"
          type="text"
          placeholder="Enter your last name"
          value={formData?.lastName}
          onChange={(e) => onFormChange('lastName', e?.target?.value)}
          error={errors?.lastName}
          required
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Select
          label="Gender"
          options={genderOptions}
          value={formData?.gender}
          onChange={(value) => onFormChange('gender', value)}
          error={errors?.gender}
          required
        />
        
        <Select
          label="Age"
          options={ageOptions}
          value={formData?.age}
          onChange={(value) => onFormChange('age', value)}
          error={errors?.age}
          required
        />
      </div>
      <Input
        label="Email Address"
        type="email"
        placeholder="your.email@example.com"
        value={formData?.email}
        onChange={(e) => onFormChange('email', e?.target?.value)}
        error={errors?.email}
        required
        disabled
        description="Email cannot be changed after registration"
      />
      <Input
        label="Phone Number"
        type="tel"
        placeholder="+1 (555) 123-4567"
        value={formData?.phone}
        onChange={(e) => onFormChange('phone', e?.target?.value)}
        error={errors?.phone}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Current City"
          type="text"
          placeholder="New York, NY"
          value={formData?.city}
          onChange={(e) => onFormChange('city', e?.target?.value)}
          error={errors?.city}
          required
        />
        
        <Select
          label="Occupation"
          options={occupationOptions}
          value={formData?.occupation}
          onChange={(value) => onFormChange('occupation', value)}
          error={errors?.occupation}
          searchable
        />
      </div>
      <Select
        label="Languages Spoken"
        options={languageOptions}
        value={formData?.languages}
        onChange={(value) => onFormChange('languages', value)}
        multiple
        searchable
        description="Select all languages you can communicate in"
      />
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Bio <span className="text-error">*</span>
        </label>
        <div className="relative">
          <textarea
            placeholder="Tell potential travel partners about yourself, your travel style, and what you're looking for in a travel companion..."
            value={formData?.bio}
            onChange={(e) => onFormChange('bio', e?.target?.value)}
            rows={4}
            maxLength={500}
            className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
          />
          <div className="absolute bottom-2 right-2 text-xs text-muted-foreground">
            {formData?.bio?.length}/500
          </div>
        </div>
        {errors?.bio && (
          <p className="mt-1 text-sm text-error">{errors?.bio}</p>
        )}
      </div>
      <div className="bg-muted/50 p-4 rounded-lg">
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-success/10 rounded-full flex items-center justify-center">
              <Icon name="Shield" size={16} className="text-success" />
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium text-foreground">Verification Status</h4>
            <p className="text-sm text-muted-foreground">
              Email verified • Phone pending • ID verification recommended
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoSection;