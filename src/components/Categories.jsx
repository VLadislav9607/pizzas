import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectFilter, setActiveIndex } from '../redux/slices/filterSlice'


const Categories = ({ onChangeCategory }) => {

  const dispatch = useDispatch();
  const { activeIndex } = useSelector(selectFilter);

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
