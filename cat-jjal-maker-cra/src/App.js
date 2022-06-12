import React from 'react';
import './App.css';
import Title from './components/Title';
import Form from './components/Form';
import MainCard from './components/MainCard';
import Favorites from './components/Favorites';


const jsonLocalStorage = {
  setItem: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  },
  getItem: (key) => {
    return JSON.parse(localStorage.getItem(key));
  },
};

const fetchCat = async (text) => {
  const OPEN_API_DOMAIN = "https://cataas.com";
  const response = await fetch(
    `${OPEN_API_DOMAIN}/cat/says/${text}?json=true`
  );
  const responseJson = await response.json();
  return `${OPEN_API_DOMAIN}/${responseJson.url}`;
};

const App = () => {
  const catList = [
    "https://cataas.com/cat/60b73094e04e18001194a309/says/react",
    "https://cataas.com//cat/5e9970351b7a400011744233/says/inflearn",
    "https://cataas.com/cat/595f280b557291a9750ebf65/says/JavaScript",
  ];

  const [counter, setCounter] = React.useState(() => {
    return jsonLocalStorage.getItem("counter");
  });

  const [mainCatImage, setMainCatImage] = React.useState(catList[0]);

  const [favorites, setFavorites] = React.useState(() => {
    return jsonLocalStorage.getItem("favorites") || [];
  });

  const alreadyFavorite = favorites.includes(mainCatImage);

  async function setInitialCat() {
    const newCat = await fetchCat("First cat");
    setMainCatImage(newCat);
  }

  React.useEffect(() => {
    setInitialCat();
  }, []);

  async function updateMainCat(value) {
    const newCat = await fetchCat(value);

    setMainCatImage(newCat);
    setCounter((prev) => {
      const nextCounter = prev + 1;
      jsonLocalStorage.setItem("counter", nextCounter);

      return nextCounter;
    });
  }

  function handleHeartClick() {
    const nextFavorites = [...favorites, mainCatImage];
    setFavorites(nextFavorites);
    jsonLocalStorage.setItem("favorites", nextFavorites);
  }

  const isTitle =
    counter === null
      ? "고양이 가라사대"
      : `${counter}번째 고양이 가라사대`;

  return (
    <div>
      <Title>{isTitle}</Title>
      <Form updateMainCat={updateMainCat} />
      <MainCard
        img={mainCatImage}
        onHeartClick={handleHeartClick}
        alreadyFavorite={alreadyFavorite}
      />
      <Favorites counter={counter} favorites={favorites} />
    </div>
  );
};

export default App;
