import React, { useState, useRef } from 'react';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const PhotoUpload = ({ onPhotoSelect, selectedPhoto }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const fileInputRef = useRef(null);

  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  const maxFileSize = 5 * 1024 * 1024; // 5MB

  const validateFile = (file) => {
    if (!allowedTypes?.includes(file?.type)) {
      setUploadError('Please upload a valid image file (JPEG, PNG, or WebP)');
      return false;
    }
    
    if (file?.size > maxFileSize) {
      setUploadError('File size must be less than 5MB');
      return false;
    }
    
    setUploadError('');
    return true;
  };

  const handleFileSelect = (file) => {
    if (validateFile(file)) {
      const reader = new FileReader();
      reader.onload = (e) => {
        onPhotoSelect({
          file,
          preview: e?.target?.result,
          name: file?.name
        });
      };
      reader?.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => {
    e?.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e?.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e?.dataTransfer?.files);
    if (files?.length > 0) {
      handleFileSelect(files?.[0]);
    }
  };

  const handleFileInputChange = (e) => {
    const file = e?.target?.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleRemovePhoto = () => {
    onPhotoSelect(null);
    if (fileInputRef?.current) {
      fileInputRef.current.value = '';
    }
  };

  const triggerFileInput = () => {
    fileInputRef?.current?.click();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Profile Photo</h3>
        <span className="text-sm text-muted-foreground">(Optional)</span>
      </div>
      {selectedPhoto ? (
        <div className="space-y-4">
          <div className="relative w-32 h-32 mx-auto">
            <div className="w-full h-full rounded-full overflow-hidden border-4 border-primary/20">
              <Image
                src={selectedPhoto?.preview}
                alt="Profile preview"
                className="w-full h-full object-cover"
              />
            </div>
            <button
              type="button"
              onClick={handleRemovePhoto}
              className="absolute -top-2 -right-2 w-8 h-8 bg-error text-error-foreground rounded-full flex items-center justify-center hover:bg-error/90 transition-colors shadow-lg"
            >
              <Icon name="X" size={16} />
            </button>
          </div>
          
          <div className="text-center space-y-2">
            <p className="text-sm font-medium text-foreground">{selectedPhoto?.name}</p>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={triggerFileInput}
              iconName="RefreshCw"
              iconPosition="left"
            >
              Change Photo
            </Button>
          </div>
        </div>
      ) : (
        <div
          className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            isDragOver
              ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50 hover:bg-muted/50'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="space-y-4">
            <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center">
              <Icon name="Camera" size={24} className="text-muted-foreground" />
            </div>
            
            <div className="space-y-2">
              <h4 className="text-base font-medium text-foreground">
                Add your profile photo
              </h4>
              <p className="text-sm text-muted-foreground">
                Drag and drop your photo here, or click to browse
              </p>
              <p className="text-xs text-muted-foreground">
                Supports JPEG, PNG, WebP up to 5MB
              </p>
            </div>
            
            <Button
              type="button"
              variant="outline"
              onClick={triggerFileInput}
              iconName="Upload"
              iconPosition="left"
            >
              Choose Photo
            </Button>
          </div>
        </div>
      )}
      {uploadError && (
        <div className="flex items-center space-x-2 text-error text-sm">
          <Icon name="AlertCircle" size={16} />
          <span>{uploadError}</span>
        </div>
      )}
      <input
        ref={fileInputRef}
        type="file"
        accept={allowedTypes?.join(',')}
        onChange={handleFileInputChange}
        className="hidden"
      />
    </div>
  );
};

export default PhotoUpload;