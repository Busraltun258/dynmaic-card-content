import React, { useState, useEffect } from 'react';
import { Typography, CardMedia, Box } from '@mui/material';

interface ImageUploadProps {
  onImageUpload: (image: string | null) => void;
  reset: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUpload, reset }) => {
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    if (reset) {
      setImage(null);
    }
  }, [reset]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImage(result);
        onImageUpload(result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <input
        accept="image/*"
        type="file"
        style={{ display: 'none' }}
        id="image-upload-input"
        onChange={handleImageUpload}
      />
      <label htmlFor="image-upload-input">
        <CardMedia
          component="div"
          sx={{
            height: 200,
            backgroundColor: 'rgba(210, 180, 140, 0.5)',
            display: 'flex',
            flexDirection: 'column',
            margin: '6px',
            borderRadius: '10px',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            overflow: 'hidden',
          }}
        >
          {image ? (
            <Box
              component="img"
              src={image}
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          ) : (
            <>
              <Box>
                <Typography variant="h5" component="div">
                  +
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="textSecondary">
                  Upload Image
                </Typography>
              </Box>
            </>
          )}
        </CardMedia>
      </label>
    </div>
  );
};

export default ImageUpload;
