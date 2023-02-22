import React from 'react';
import axios from 'axios'

import MainContext from '../context';
import Categories from '../components/Categories';
import Pizza from '../components/Pizza';
import Sort from '../components/Sort';
import Skeleton from '../components/Skeleton';

const Home = () => {

  const [data, setData] = React.useState([]);
  const [isLoaded, setIsLoaded] = React.useState(true);
  const [categoryId, setCategoryId] = React.useState();
  const [sortType, setSortType] = React.useState('rating');

  const { searchPizza, setSearchPizza } = React.useContext(MainContext)


  React.useEffect(() => {
    setIsLoaded(true);

    (async () => {
      try {

        const order = sortType.includes('↑') ? 'asc' : 'desc';

        const dataPizzas = await axios.get(`https://63f255ebf28929a9df58a99e.mockapi.io/dataPizzas?${searchPizza && `search=${categoryId}`}${categoryId > 0 && `category=${categoryId}`}&sortBy=${sortType.replace('↑', '')}&order=${order}`);

        setData(dataPizzas.data);
        setIsLoaded(false);

      } catch (error) {
        alert('Помилка сервера');
        console.error(error)
      }
    })();
  }, [categoryId, sortType]);


  const skeleton = [...new Array(6)].map((_, i) => <Skeleton key={i} />);
  const pizzasRender = data
    .filter(obj => obj.title.toLowerCase().includes(searchPizza))
    .map(item => <Pizza key={item.id} pizza={item} />);

  return (
    <>
      <div class="content__top">
        <Categories onChangeCategory={(id) => setCategoryId(id)} />
        <Sort onChangeSort={(forFetch) => setSortType(forFetch)} />
      </div>
      <h2 class="content__title">Всі піци</h2>
      <div class="content__items">
        {isLoaded
          ? skeleton
          : pizzasRender}
      </div>
    </>
  )
}

export default Home;
