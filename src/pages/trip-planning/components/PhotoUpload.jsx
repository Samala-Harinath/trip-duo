import React, { useState, useRef } from 'react';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const PhotoUpload = ({ photos = [], onPhotosChange, maxPhotos = 8 }) => {
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  // Mock uploaded photos for demonstration
  const mockPhotos = [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop",
      caption: "Beautiful mountain landscape",
      type: "inspiration"
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1539650116574-75c0c6d73c6e?w=300&h=200&fit=crop",
      caption: "Local street food market",
      type: "activity"
    }
  ];

  const currentPhotos = photos?.length > 0 ? photos : mockPhotos;

  const handleDrag = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (e?.type === "dragenter" || e?.type === "dragover") {
      setDragActive(true);
    } else if (e?.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setDragActive(false);
    
    if (e?.dataTransfer?.files && e?.dataTransfer?.files?.[0]) {
      handleFiles(e?.dataTransfer?.files);
    }
  };

  const handleChange = (e) => {
    e?.preventDefault();
    if (e?.target?.files && e?.target?.files?.[0]) {
      handleFiles(e?.target?.files);
    }
  };

  const handleFiles = (files) => {
    const fileArray = Array.from(files);
    const remainingSlots = maxPhotos - currentPhotos?.length;
    const filesToProcess = fileArray?.slice(0, remainingSlots);

    filesToProcess?.forEach((file) => {
      if (file?.type?.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const newPhoto = {
            id: Date.now() + Math.random(),
            url: e?.target?.result,
            caption: '',
            type: 'uploaded',
            file: file
          };
          onPhotosChange([...currentPhotos, newPhoto]);
        };
        reader?.readAsDataURL(file);
      }
    });
  };

  const removePhoto = (photoId) => {
    const updatedPhotos = currentPhotos?.filter(photo => photo?.id !== photoId);
    onPhotosChange(updatedPhotos);
  };

  const updateCaption = (photoId, caption) => {
    const updatedPhotos = currentPhotos?.map(photo =>
      photo?.id === photoId ? { ...photo, caption } : photo
    );
    onPhotosChange(updatedPhotos);
  };

  const openFileDialog = () => {
    fileInputRef?.current?.click();
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
          <Icon name="Camera" size={20} color="var(--color-accent)" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-card-foreground">Trip Photos</h2>
          <p className="text-sm text-muted-foreground">
            Add inspiration photos and planned activities ({currentPhotos?.length}/{maxPhotos})
          </p>
        </div>
      </div>
      {/* Upload Area */}
      {currentPhotos?.length < maxPhotos && (
        <div
          className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragActive 
              ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50 hover:bg-muted/30'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={handleChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          
          <div className="space-y-4">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
              <Icon name="Upload" size={24} color="var(--color-muted-foreground)" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-card-foreground mb-2">
                Upload Trip Photos
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Drag and drop your photos here, or click to browse
              </p>
              <Button
                variant="outline"
                onClick={openFileDialog}
                iconName="Plus"
                iconPosition="left"
              >
                Choose Photos
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Supports JPG, PNG, GIF up to 10MB each
            </p>
          </div>
        </div>
      )}
      {/* Photo Grid */}
      {currentPhotos?.length > 0 && (
        <div className="mt-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {currentPhotos?.map((photo) => (
              <div key={photo?.id} className="group relative bg-surface border border-border rounded-lg overflow-hidden">
                <div className="aspect-square overflow-hidden">
                  <Image
                    src={photo?.url}
                    alt={photo?.caption || 'Trip photo'}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                {/* Photo Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removePhoto(photo?.id)}
                      iconName="Trash2"
                      className="bg-white/20 hover:bg-white/30 text-white"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Edit"
                      className="bg-white/20 hover:bg-white/30 text-white"
                    />
                  </div>
                </div>

                {/* Photo Type Badge */}
                <div className="absolute top-2 left-2">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                    photo?.type === 'inspiration' ?'bg-primary/80 text-white' :'bg-accent/80 text-white'
                  }`}>
                    {photo?.type === 'inspiration' ? 'Inspiration' : 'Activity'}
                  </span>
                </div>

                {/* Caption Input */}
                <div className="p-3">
                  <input
                    type="text"
                    placeholder="Add a caption..."
                    value={photo?.caption}
                    onChange={(e) => updateCaption(photo?.id, e?.target?.value)}
                    className="w-full text-sm bg-transparent border-none outline-none text-card-foreground placeholder-muted-foreground"
                  />
                </div>
              </div>
            ))}

            {/* Add More Button */}
            {currentPhotos?.length < maxPhotos && (
              <button
                onClick={openFileDialog}
                className="aspect-square border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center hover:border-primary/50 hover:bg-muted/30 transition-colors group"
              >
                <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center mb-2 group-hover:bg-primary/10">
                  <Icon name="Plus" size={16} color="var(--color-muted-foreground)" />
                </div>
                <span className="text-xs text-muted-foreground">Add Photo</span>
              </button>
            )}
          </div>
        </div>
      )}
      {/* Photo Categories */}
      <div className="mt-6 p-4 bg-muted/30 rounded-lg">
        <h3 className="font-medium text-card-foreground mb-3">Photo Categories</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-primary rounded-full"></div>
            <span className="text-muted-foreground">Inspiration Photos</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-accent rounded-full"></div>
            <span className="text-muted-foreground">Planned Activities</span>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Use inspiration photos to show your dream destinations and activity photos for planned experiences
        </p>
      </div>
    </div>
  );
};

export default PhotoUpload;