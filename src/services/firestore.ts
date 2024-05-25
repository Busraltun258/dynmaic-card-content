import { db } from '../firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';

interface CardData {
  id: string;
  title: string;
  description: string;
  image: string | null;
}

const addCard = async (title: string, description: string, image: string | null): Promise<CardData> => {
  try {
    const docRef = await addDoc(collection(db, 'cards'), {
      title,
      description,
      image,
    });
    return { id: docRef.id, title, description, image };
  } catch (e) {
    console.error('Error adding document: ', e);
    throw e;
  }
};

const getCards = async (): Promise<CardData[]> => {
  const cardsCol = collection(db, 'cards');
  const cardsSnapshot = await getDocs(cardsCol);
  const cardsList = cardsSnapshot.docs.map(doc => ({
    id: doc.id,
    title: doc.data().title,
    description: doc.data().description,
    image: doc.data().image,
  })) as CardData[];
  return cardsList;
};

export { addCard, getCards };
