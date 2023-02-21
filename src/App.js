import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Cart from './pages/Cart';
import Home from './pages/Home';

import './scss/app.scss';

function App() {

  // mongoose.connect(
  //   'mongodb+srv://vlad960706:<vlad2x>@pizzadata.oeo7pec.mongodb.net/?retryWrites=true&w=majority'
  // ).then(() => console.log('DB ok'))
  //   .catch((error) => console.log('DB error', error));


  return (
    <div class="wrapper">
      <Header />
      <div class="content">
        <div class="container">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/cart' element={<Cart />} />

          </Routes>
        </div>
      </div>
    </div>
  )
}

export default App;