import React from 'react';
import debounce from 'lodash.debounce';
import MainContext from '../context';

import searchIcon from '../assets/img/search.svg';
import closeSearch from '../assets/img/clear__search.svg';

const Search = () => {

  const [inputValue, setInputValue] = React.useState('');
  const { setSearchPizza } = React.useContext(MainContext);

  const inputRef = React.useRef();

  const onClickClear = () => {
    setSearchPizza('');
    setInputValue('')
    inputRef.current.focus();
  }

  const updateInput = React.useCallback(
    debounce(str => {
      setSearchPizza(str)
    }, 250),
    [],
  );

  const onChangeInput = (e) => {
    setInputValue(e.target.value);
    updateInput(e.target.value);
  }

  return (
    <div className='header__search'>
      <img className='search__icon' src={searchIcon} alt="search__icon" />
      {inputValue &&
        <button onClick={() => onClickClear()} className='clear__search'><img src={closeSearch} alt="clear__search" /></button>}
      <input
        ref={inputRef}
        type='text'
        placeholder='Пошук...'
        value={inputValue}
        onChange={(e) => onChangeInput(e)} />
    </div>
  )
}

export default Search
