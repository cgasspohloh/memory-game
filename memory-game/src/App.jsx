import { useState, useEffect } from 'react';
import Header from './Components/Header';
import Card from './Components/Cards';
import Instructions from './Components/Instructions';

function fetchRandomPokemonImage() {
  return new Promise(async (resolve, reject) => {
    try {
      const randomPokemonId = Math.floor(Math.random() * 898) + 1;
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomPokemonId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch Pokémon data');
      }
      const pokemonData = await response.json();
      const imageUrl = pokemonData.sprites.other['official-artwork'].front_default;
      resolve(imageUrl);
    } catch (error) {
      reject(error);
    }
  });
}

function App() {
  const [pokemonImages, setPokemonImages] = useState([]);
  const [clickedIndexes, setClickedIndexes] = useState([]);
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  useEffect(() => {
    resetGame();
  }, []);

  const resetGame = () => {
    setCurrentScore(0);
    setClickedIndexes([]);
    fetchPokemonImages();
  };

  const fetchPokemonImages = async () => {
    try {
      const images = [];
      for (let i = 0; i < 10; i++) {
        const imageUrl = await fetchRandomPokemonImage();
        images.push({ img: imageUrl, id: i });
      }
      setPokemonImages(images);
    } catch (error) {
      console.error('Error fetching Pokémon images:', error);
    }
  };

  const handleCardClick = (id) => {
    if (clickedIndexes.includes(id)) {
      resetGame();
      return;
    }
    
    setCurrentScore(c => c + 1);
    setClickedIndexes([...clickedIndexes, id]); // Corrected here
  
    if (currentScore + 1 > bestScore) {
      setBestScore(c => c + 1);
    }
  
    if (clickedIndexes.length === pokemonImages.length) {
      resetGame();
    }
  
    const shuffledImages = [...pokemonImages];
    for (let i = shuffledImages.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledImages[i], shuffledImages[j]] = [shuffledImages[j], shuffledImages[i]];
    }
    setPokemonImages(shuffledImages);
  };
  

  return (
    <>
      <div className="bg-image"></div>
      <Header currentScore={currentScore} bestScore={bestScore} />
      <div className='card-container'>
        {pokemonImages.map((pokemon, index) => (
          <Card key={index} image={pokemon.img} onClick={() => handleCardClick(pokemon.id)} />
        ))}
      </div>
      <Instructions />
    </>
  );
}


export default App;
