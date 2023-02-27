import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSortChecked } from '../redux/slices/filterSlice';

import sortIcon from './../assets/img/sort-icon.svg';

export const sortData = [
  { name: 'Популярності ↓', forFetch: 'rating' },
  { name: 'Популярності ↑', forFetch: 'rating↑' },
  { name: 'Ціні ↓', forFetch: 'price' },
  { name: 'Ціні ↑', forFetch: 'price↑' },
  { name: 'Алфавіту ↓', forFetch: 'title' },
  { name: 'Алфавіту ↑', forFetch: 'title↑' }
];

const Sort = () => {

  const dispatch = useDispatch();
  const sort = useSelector(state => state.filter.sortType);
  const [openSort, setOpenSort] = React.useState(false);
  const sortRef = React.useRef();

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      let pathClick = event.composedPath();

      if (!pathClick.includes(sortRef.current)) {
        setOpenSort(false)
      }

    };

    document.body.addEventListener('click', handleClickOutside)

    return () => {
      document.body.removeEventListener('click', handleClickOutside)
    }
  }, []);

  return (
    <div className="sort" ref={sortRef} onClick={() => setOpenSort(!openSort)}>
      <div className="sort__label" >
        <img className={openSort ? 'sort__icon__active' : ''} src={sortIcon} />
        <b>Сортувати по:</b>
        <span>{sort.name}</span>
      </div>
      <div className={`sort__popup ${openSort ? 'sort__active' : ''}`}>
        <ul>
          {sortData.map(obj => {
            return <li
              key={obj.name}
              className={sort.name === obj.name ? 'active' : ''}
              onClick={() => dispatch(setSortChecked(obj))}
            >
              {obj.name}
            </li>
          })}
        </ul>
      </div>
    </div>
  )
}

export default Sort;
