import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectFilter, setActiveIndex } from '../redux/slices/filterSlice'

const categoriesList = ["Всі", "М'ясні", "Вегетаріанські", "Гриль", "Гострі", "Закриті",];

type CategoriesProps = {
  onChangeCategory: (index: number) => void,
}

const Categories: React.FC<CategoriesProps> = React.memo(({ onChangeCategory }) => {
  const dispatch = useDispatch();
  const { activeIndex } = useSelector(selectFilter);

  const onCategory = (index: number) => {
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
})

export default Categories;
