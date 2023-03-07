import React from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../redux/store';
import { setCategoryId, setPageAction, selectFilter } from '../redux/slices/filterSlice'
import { fetchPizzas, selectPizzas } from '../redux/slices/pizzasSlice'

import Categories from '../components/Categories';
import Pizza from '../components/Pizza';
import Sort from '../components/Sort';
import Skeleton from '../components/Skeleton';

const Found404 = React.lazy(() => import('./Found404'));
const Pagination = React.lazy(() => import('@mui/material/Pagination'));

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const { categoryId, sortType, pageAction, searchPizza } = useSelector(selectFilter);
  const { pizzas, status } = useSelector(selectPizzas);

  React.useEffect(() => {
    (async () => {
      const order = sortType.forFetch.includes('↑') ? 'asc' : 'desc';
      const category = categoryId > 0 ? `category=${categoryId}` : '';
      const search = searchPizza ? `search=${categoryId}` : '';
      const sort = sortType.forFetch.replace('↑', '');

      dispatch(fetchPizzas({ order, category, search, sort, pageAction: String(pageAction) }));
    })();

  }, [categoryId, sortType.forFetch, pageAction]);

  const onChangeCategory = React.useCallback((id: number) => dispatch(setCategoryId(id)), []);

  const skeleton = [...new Array(6)].map((_, i) => <Skeleton key={i} />);
  const pizzasRender = pizzas.filter((obj: any) => obj.title.toLowerCase().includes(searchPizza)).map((pizza: any) => <Pizza key={pizza.id} {...pizza} />);

  if (status === 'error') {
    return <Found404 />;
  }

  return (
    <>
      <div className="content__top">
        <Categories onChangeCategory={onChangeCategory} />
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
