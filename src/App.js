import React from 'react';
import { Route, Routes } from 'react-router-dom';

import MainContext from './context';
import Header from './components/Header';
import Cart from './pages/Cart';
import Home from './pages/Home';

import './scss/app.scss';

function App() {

  // mongoose.connect(
  //   'mongodb+srv://vlad960706:<vlad2x>@pizzadata.oeo7pec.mongodb.net/?retryWrites=true&w=majority'
  // ).then(() => console.log('DB ok'))
  //   .catch((error) => console.log('DB error', error));

  const [searchPizza, setSearchPizza] = React.useState('');
  const [cartData, setCartData] = React.useState([]);


  return (
    <>
      <MainContext.Provider value={{
        searchPizza,
        setSearchPizza,
      }}>
        <div class="wrapper">
          <Header />
          <div class="content">
            <div class="container">
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/cart' element={<Cart cartData={cartData}/>} />

              </Routes>
            </div>
          </div>
        </div>
      </MainContext.Provider>
    </>

  )
}

export default App;
