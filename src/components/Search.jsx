import React from 'react';

import MainContext from '../context';
import searchIcon from '../assets/img/search.svg';
import closeSearch from '../assets/img/clear__search.svg';


const Search = () => {

  const { searchPizza, setSearchPizza } = React.useContext(MainContext)

  return (
    <div className='header__search'>
      <img className='search__icon' src={searchIcon} alt="search__icon" />
      {searchPizza && <button onClick={() => setSearchPizza('')} className='clear__search'><img src={closeSearch} alt="clear__search" /></button>}
      <input type='text' placeholder='Пошук...' value={searchPizza} onChange={(e) => setSearchPizza(e.target.value)} />
    </div>
  )
}

export default Search
