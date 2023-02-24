import React from 'react'

const Categories = ({ onChangeCategory }) => {

  const [activeIndex, setActiveIndex] = React.useState(0);

  const categoriesList = ["Всі", "М'ясні", "Вегетаріанські", "Гриль", "Гострі", "Закриті",];

  const onCategory = (index) => {
    setActiveIndex(index);
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
            className={activeIndex === index && 'active'}
          >
            {item}
          </li>
        })}
      </ul>
    </div>
  )
}

export default Categories;
