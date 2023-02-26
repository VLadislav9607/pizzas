import React from 'react';
import axios from 'axios';
import Pagination from '@mui/material/Pagination';

import { useSelector, useDispatch } from 'react-redux'
import { setCategoryId } from '../redux/slices/filterSlice'

import MainContext from '../context';
import Categories from '../components/Categories';
import Pizza from '../components/Pizza';
import Sort from '../components/Sort';
import Skeleton from '../components/Skeleton';

const Home = () => {

  const dispatch = useDispatch()
  const { categoryId, sortType } = useSelector(state => state.filter);

  const [data, setData] = React.useState([]);
  const [isLoaded, setIsLoaded] = React.useState(true);
  const [pageAction, setPageAction] = React.useState(1);


  const { searchPizza, setSearchPizza } = React.useContext(MainContext)


  React.useEffect(() => {
    setIsLoaded(true);

    (async () => {
      try {

        const order = sortType.forFetch.includes('↑') ? 'asc' : 'desc';

        const dataPizzas = await axios.get(`https://63f255ebf28929a9df58a99e.mockapi.io/dataPizzas?page=${pageAction}&limit=4&${searchPizza && `search=${categoryId}`}${categoryId > 0 && `category=${categoryId}`}&sortBy=${sortType.forFetch.replace('↑', '')}&order=${order}`);

        setData(dataPizzas.data);
        setIsLoaded(false);

      } catch (error) {
        alert('Помилка сервера');
        console.error(error)
      }
    })();
  }, [categoryId, sortType.forFetch, pageAction]);


  const skeleton = [...new Array(6)].map((_, i) => <Skeleton key={i} />);
  const pizzasRender = data
    .filter(obj => obj.title.toLowerCase().includes(searchPizza))
    .map(item => <Pizza key={item.id} pizza={item} />);

  return (
    <>
      <div className="content__top">
        <Categories onChangeCategory={(id) => dispatch(setCategoryId(id))} />
        <Sort />
      </div>
      <h2 className="content__title">Всі піци</h2>
      <div className="content__items">
        {isLoaded
          ? skeleton
          : pizzasRender}
      </div>
      <div className='pagitation'>
        <Pagination
          count={3}
          page={pageAction}
          onChange={(_, numPage) => setPageAction(numPage)}
          color="secondary" />
      </div>
    </>
  )
}

export default Home;
