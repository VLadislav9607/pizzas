import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSortChecked, SortType } from '../redux/slices/filterSlice';
import { RootState } from '../redux/store';
import sortIcon from './../assets/img/sort-icon.svg';

const sortData: SortType[] = [
  { name: 'Популярності ↓', forFetch: 'rating' },
  { name: 'Популярності ↑', forFetch: 'rating↑' },
  { name: 'Ціні ↓', forFetch: 'price' },
  { name: 'Ціні ↑', forFetch: 'price↑' },
  { name: 'Алфавіту ↓', forFetch: 'title' },
  { name: 'Алфавіту ↑', forFetch: 'title↑' }
];

const Sort: React.FC = React.memo(() => {
  const dispatch = useDispatch();
  const sort = useSelector((state: RootState) => state.filter.sortType);
  const [openSort, setOpenSort] = React.useState(false);
  const sortRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      let pathClick = event.composedPath();

      if (!pathClick.includes(sortRef.current!)) {
        setOpenSort(false)
      }
    };

    document.body.addEventListener('click', handleClickOutside)

    return () => {
      document.body.removeEventListener('click', handleClickOutside)
    }
  }, []);

  return (
    <div
      className="sort"
      ref={sortRef}
      onClick={() => setOpenSort(!openSort)}>
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
})

export default Sort;
