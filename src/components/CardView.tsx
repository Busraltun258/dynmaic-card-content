import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

interface CardViewProps {
  title: string;
  description: string;
  image: string | null;
}

const CardView: React.FC<CardViewProps> = ({ title, description, image }) => {
  return (
    <Box sx={{ width: '100%', maxWidth: '345px', position: 'relative', margin: 'auto' }}>
      <Card sx={{ minHeight: '600px', borderRadius: '16px', border: '1px solid black', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
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
          <CardContent>
            <Typography variant="h5" component="div" color="orange">
              {title}
            </Typography>
          </CardContent>

        <CardContent>
          <Typography variant="body2" color="textSecondary">
            {description}
          </Typography>
        </CardContent>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ marginBottom: 2 }}>
          <Box sx={{ height: 200, backgroundColor: 'rgba(210, 180, 140, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden', borderRadius: '10px', margin: '6px' }}>
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
              <Typography variant="body2" color="textSecondary">No Image</Typography>
            )}
          </Box>
        </Box>
      </Card>
    </Box>
  );
};

export default CardView;
