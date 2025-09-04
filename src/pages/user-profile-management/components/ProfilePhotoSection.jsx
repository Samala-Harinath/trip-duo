import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProfilePhotoSection = ({ photos, onPhotoUpload, onPhotoDelete, onPhotoReorder }) => {
  const [draggedIndex, setDraggedIndex] = useState(null);

  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e?.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, dropIndex) => {
    e?.preventDefault();
    if (draggedIndex !== null && draggedIndex !== dropIndex) {
      onPhotoReorder(draggedIndex, dropIndex);
    }
    setDraggedIndex(null);
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e?.target?.files);
    files?.forEach(file => {
      if (file?.type?.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (event) => {
          onPhotoUpload({
            id: Date.now() + Math.random(),
            url: event?.target?.result,
            isVerified: false,
            isPrimary: photos?.length === 0
          });
        };
        reader?.readAsDataURL(file);
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Profile Photos</h3>
        <span className="text-sm text-muted-foreground">{photos?.length}/6 photos</span>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {photos?.map((photo, index) => (
          <div
            key={photo?.id}
            className="relative group aspect-square bg-muted rounded-lg overflow-hidden cursor-move"
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, index)}
          >
            <Image
              src={photo?.url}
              alt={`Profile photo ${index + 1}`}
              className="w-full h-full object-cover"
            />
            
            {photo?.isPrimary && (
              <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
                Primary
              </div>
            )}
            
            {photo?.isVerified && (
              <div className="absolute top-2 right-2 bg-success text-success-foreground rounded-full p-1">
                <Icon name="Check" size={12} />
              </div>
            )}
            
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-200 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 flex space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onPhotoDelete(photo?.id)}
                  className="bg-error text-error-foreground hover:bg-error/80"
                >
                  <Icon name="Trash2" size={16} />
                </Button>
              </div>
            </div>
            
            {index === 0 && (
              <div className="absolute bottom-2 left-2 text-xs text-white bg-black bg-opacity-50 px-2 py-1 rounded">
                Main Photo
              </div>
            )}
          </div>
        ))}
        
        {photos?.length < 6 && (
          <label className="aspect-square border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors">
            <Icon name="Plus" size={24} className="text-muted-foreground mb-2" />
            <span className="text-sm text-muted-foreground text-center">Add Photo</span>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        )}
      </div>
      <div className="bg-muted/50 p-4 rounded-lg">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={16} className="text-primary mt-0.5" />
          <div className="text-sm text-muted-foreground">
            <p className="font-medium mb-1">Photo Guidelines:</p>
            <ul className="space-y-1 text-xs">
              <li>• Upload up to 6 high-quality photos</li>
              <li>• First photo will be your main profile picture</li>
              <li>• Drag and drop to reorder photos</li>
              <li>• Verified photos get priority in matching</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePhotoSection;