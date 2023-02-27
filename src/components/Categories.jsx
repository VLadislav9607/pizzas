import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveIndex } from '../redux/slices/filterSlice'


const Categories = ({ onChangeCategory }) => {

  const dispatch = useDispatch();
  const { activeIndex } = useSelector(state => state.filter);

  const categoriesList = ["Всі", "М'ясні", "Вегетаріанські", "Гриль", "Гострі", "Закриті",];

  const onCategory = (index) => {
    dispatch(setActiveIndex(index));
    onChangeCategory(index);
  }

  return (
    <div className="categories">
      <ul>
        {categoriesList.map((item, index) => {
          return <li
            onClick={() => {
              onCategory(index);
            }}
            key={item}
            className={activeIndex === index ? 'active' : ''}
          >
            {item}
          </li>
        })}
      </ul>
    </div>
  )
}

export default Categories;
