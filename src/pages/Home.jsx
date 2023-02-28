import React from 'react';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import errorImg from '../assets/img/error.gif';

import { useSelector, useDispatch } from 'react-redux'
import { setCategoryId, setPageAction, setFilters, selectFilter } from '../redux/slices/filterSlice'
import { fetchPizzas } from '../redux/slices/pizzasSlice'

import Categories from '../components/Categories';
import Pizza from '../components/Pizza';
import Sort, { sortData } from '../components/Sort';
import Skeleton from '../components/Skeleton';
import Found404 from './Found404';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { categoryId, sortType, pageAction, searchPizza } = useSelector(selectFilter);
  const { pizzas, status } = useSelector(state => state.pizzas);
  const isMounted = React.useRef(false);


  //Якщо був перший рендер і URL змінилась
  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        forFetch: sortType.forFetch,
        categoryId,
        pageAction,
      });

      navigate(`?${queryString}`)
    }

    isMounted.current = true;

  }, [categoryId, sortType.forFetch, pageAction]);

  //Якщо був перший рендер, то перевіряємо URL і зберігаємо в редаксі
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = sortData.find(obj => obj.forFetch === params.forFetch);
      dispatch(
        setFilters({
          ...params,
          sortType: sort,
          activeIndex: params.categoryId,

        }),
      );

    }
  }, []);

  React.useEffect(() => {
    (async () => {
      const order = sortType.forFetch.includes('↑') ? 'asc' : 'desc';
      const category = categoryId > 0 ? `category=${categoryId}` : '';
      const search = searchPizza ? `search=${categoryId}` : '';
      const sort = sortType.forFetch.replace('↑', '');

      dispatch(fetchPizzas({ order, category, search, sort, pageAction }));
    })();

  }, [categoryId, sortType.forFetch, pageAction]);

  const skeleton = [...new Array(6)].map((_, i) => <Skeleton key={i} />);
  const pizzasRender = pizzas.filter(obj => obj.title.toLowerCase().includes(searchPizza)).map(pizza => <Pizza key={pizza.id} {...pizza} />);

  if (status === 'error') {
    return <Found404 />;
  }

  return (
    <>
      <div className="content__top">
        <Categories onChangeCategory={(id) => dispatch(setCategoryId(id))} />
        <Sort />
      </div>
      <h2 className="content__title">Всі піци</h2>
      <div className="content__items">
        {status === 'loading' ? skeleton : pizzasRender}
      </div>
      <div className='pagitation'>
        <Pagination
          count={3}
          page={pageAction}
          onChange={(_, numPage) => dispatch(setPageAction(numPage))}
          color="secondary"
        />
      </div>
    </>
  )
}

export default Home;
