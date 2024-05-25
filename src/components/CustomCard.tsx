import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Box, TextField, Button } from '@mui/material';
import ImageUpload from './ImageUpload';

interface CustomCardProps {
  onAddCard: (title: string, description: string, image: string | null) => Promise<void>;
}

const CustomCard: React.FC<CustomCardProps> = ({ onAddCard }) => {
  const [isEditing, setIsEditing] = useState<{ title: boolean; description: boolean }>({
    title: false,
    description: false,
  });
  const [title, setTitle] = useState('New Title');
  const [description, setDescription] = useState('New description');
  const [image, setImage] = useState<string | null>(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [resetImage, setResetImage] = useState(false);

  useEffect(() => {
    if (title.trim() !== '' && description.trim() !== '' && image !== null) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [title, description, image]);

  const handleEditClick = (field: 'title' | 'description') => {
    setIsEditing({ ...isEditing, [field]: true });
  };

  const handleImageUpload = (image: string | null) => {
    setImage(image);
  };

  const handleSave = async () => {
    if (!isButtonDisabled) {
      await onAddCard(title, description, image);
      setTitle('');
      setDescription('');
      setImage(null);
      setResetImage(true);
      setTimeout(() => setResetImage(false), 0);
    }
  };

  return (
    <Box sx={{ width: '100%', maxWidth: '345px', position: 'relative', margin: 'auto' }}>
      <Box
        sx={{
          position: 'absolute',
          top: '-14px',
          left: '-1px',
          backgroundColor: 'white',
          padding: '4px 16px',
          border: '1px solid black',
          borderRadius: '8px 8px 0 0',
          boxShadow: 1,
          transform: 'translateY(-50%)',
          zIndex: 1,
        }}
      >
        <Typography variant="body2" color="textSecondary">
          New Title
        </Typography>
      </Box>
      <Card sx={{ width: 345, height: 600, borderRadius: '16px', border: '1px solid black', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <CardContent>
          {isEditing.title ? (
            <TextField
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              autoFocus
              fullWidth
              placeholder="New title"
            />
          ) : (
            <Typography variant="h6" color="textSecondary" onClick={() => handleEditClick('title')}>
              {title}
            </Typography>
          )}
          <Box mt={2}>
            {isEditing.description ? (
              <TextField
                value={description}
                multiline
                rows={5}
                onChange={(e) => setDescription(e.target.value)}
                autoFocus
                fullWidth
                placeholder="Description"
              />
            ) : (
              <Typography variant="body2" color="textSecondary" onClick={() => handleEditClick('description')}>
                {description}
              </Typography>
            )}
          </Box>
        </CardContent>
        <Box flexGrow={1} />
        <Box mt={2}>
          <ImageUpload onImageUpload={handleImageUpload} reset={resetImage} />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: '16px' }}>
          <Button
            variant="contained"
            disabled={isButtonDisabled}
            onClick={handleSave}
            sx={{
              backgroundColor: isButtonDisabled ? 'gray' : 'green',
              color: isButtonDisabled ? 'darkgray' : 'black',
              '&:hover': {
              backgroundColor: isButtonDisabled ? 'gray' : 'green',
              },
              width: '40px',
              height: '40px',
              minWidth: '40px',
              minHeight: '40px',
              borderRadius: '8px',
            }}
          />
        </Box>
      </Card>
    </Box>
  );
};

export default CustomCard;
