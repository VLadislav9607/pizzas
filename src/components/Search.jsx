import React from 'react';
import debounce from 'lodash.debounce';
import { useSelector, useDispatch } from 'react-redux'
import { setSearchPizza } from '../redux/slices/filterSlice'

import searchIcon from '../assets/img/search.svg';
import closeSearch from '../assets/img/clear__search.svg';

const Search = () => {

  const dispatch = useDispatch();
  const { searchPizza } = useSelector(state => state.filter);


  const inputRef = React.useRef();

  const onClickClear = () => {
    dispatch(setSearchPizza(''))
    inputRef.current.focus();
  }

  const updateInput = React.useCallback(
    debounce(str => {
      dispatch(setSearchPizza(str))
    }, 250),
    [],
  );

  const onChangeInput = (e) => {
    dispatch(setSearchPizza(e.target.value))
  }

  return (
    <div className='header__search'>
      <img className='search__icon' src={searchIcon} alt="search__icon" />
      {searchPizza &&
        <button onClick={() => onClickClear()} className='clear__search'><img src={closeSearch} alt="clear__search" /></button>}
      <input
        ref={inputRef}
        type='text'
        placeholder='Пошук...'
        value={searchPizza}
        onChange={(e) => onChangeInput(e)} />
    </div>
  )
}

export default Search
