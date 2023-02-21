import React from 'react';

const Sort = ({ onChangeSort }) => {

  const [openSort, setOpenSort] = React.useState(false);

  const [sortChecked, setSortChecked] = React.useState({ name: 'Популярності', forFetch: 'rating' })

  const sortData = [
    { name: 'Популярності', forFetch: 'rating' },
    { name: 'Ціні', forFetch: 'price' },
    { name: 'Алфавіту', forFetch: 'title' }
  ];

  const onSort = (obj) => {
    setSortChecked(obj)
    onChangeSort(obj.forFetch)
  }

  return (
    <div class="sort" onClick={() => setOpenSort(!openSort)}>
      <div class="sort__label" >
        <svg
          className={openSort && 'sort__icon__active'}
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
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