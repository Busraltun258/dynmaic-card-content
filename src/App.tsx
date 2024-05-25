import React, { useState, useEffect } from 'react';
import { Box, Grid } from '@mui/material';
import { getCards, addCard } from './services/firestore';
import CustomCard from './components/CustomCard';
import CardView from './components/CardView';

interface CardData {
  id: string;
  title: string;
  description: string;
  image: string | null;
}

const App: React.FC = () => {
  const [cards, setCards] = useState<CardData[]>([]);

  useEffect(() => {
    const fetchCards = async () => {
      const fetchedCards: CardData[] = await getCards();
      setCards(fetchedCards);
    };
    fetchCards();
  }, []);

  const handleAddCard = async (title: string, description: string, image: string | null) => {
    try {
      const newCard = await addCard(title, description, image);
      setCards((prevCards) => [newCard, ...prevCards]);
    } catch (e) {
      console.error('Error adding card: ', e);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <CustomCard onAddCard={handleAddCard} />
        </Grid>
        {cards.map((card) => (
          <Grid item key={card.id} xs={12} sm={6} md={4} lg={3} mt={3}>
            <CardView title={card.title} description={card.description} image={card.image} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default App;
