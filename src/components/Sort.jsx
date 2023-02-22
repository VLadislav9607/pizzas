import React from 'react';
import sortIcon from './../assets/img/sort-icon.svg'

const Sort = ({ onChangeSort }) => {

  const [openSort, setOpenSort] = React.useState(false);

  const [sortChecked, setSortChecked] = React.useState({ name: 'Популярності ↓', forFetch: 'rating' })

  const sortData = [
    { name: 'Популярності ↓', forFetch: 'rating' },
    { name: 'Популярності ↑', forFetch: 'rating↑' },
    { name: 'Ціні ↓', forFetch: 'price' },
    { name: 'Ціні ↑', forFetch: 'price↑' },
    { name: 'Алфавіту ↓', forFetch: 'title' },
    { name: 'Алфавіту ↑', forFetch: 'title↑' }

  ];

  const onSort = (obj) => {
    setSortChecked(obj)
    onChangeSort(obj.forFetch)
  }

  return (
    <div class="sort" onClick={() => setOpenSort(!openSort)}>
      <div class="sort__label" >
        <img className={openSort && 'sort__icon__active'} src={sortIcon}/>
        <b>Сортувати по:</b>
        <span>{sortChecked.name}</span>
      </div>
      <div class={`sort__popup ${openSort && 'sort__active'}`}>
        <ul>
          {sortData.map(obj => {
            return <li
              key={obj.name}
              className={sortChecked.name === obj.name ? 'active' : ''}
              onClick={() => onSort(obj)}

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
