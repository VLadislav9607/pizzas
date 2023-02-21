import React, { useEffect } from 'react';


import Categories from '../components/Categories';
import Pizza from '../components/Pizza';
import Sort from '../components/Sort';
import Skeleton from '../components/Skeleton';

const Home = () => {

   const [data, setData] = React.useState([]);
   const [isLoaded, setIsLoaded] = React.useState(true);
   const [categoryId, setCategoryId] = React.useState();
   const [sortType, setSortType] = React.useState('rating');

   useEffect(() => {
      setIsLoaded(true);


      fetch(`https://63f255ebf28929a9df58a99e.mockapi.io/dataPizzas?${
         categoryId > 0 ? `category=${categoryId}` : ''}&sortBy=${sortType}&order=desc`)
         .then(res => res.json())
         .then(data => {
            setData(data);
            setIsLoaded(false);

         });
   }, [categoryId, sortType]);



   return (
      <>
         <div class="content__top">
            <Categories onChangeCategory={(id) => setCategoryId(id)} />
            <Sort onChangeSort={(forFetch) => setSortType(forFetch)} />
         </div>
         <h2 class="content__title">Все пиццы</h2>
         <div class="content__items">
            {isLoaded ?
               [...new Array(6)].map((_, i) => <Skeleton key={i} />)
               : data.map(item => {
                  return <Pizza
                     key={item.id}
                     pizza={item}

                  />
               })}
         </div>
      </>
   )
}

export default Home;