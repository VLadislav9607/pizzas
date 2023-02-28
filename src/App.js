import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import Cart from './pages/Cart';
import Home from './pages/Home';
import Found404 from './pages/Found404';

import './scss/app.scss';

function App() {

  // mongoose.connect(
  //   'mongodb+srv://vlad960706:<vlad2x>@pizzadata.oeo7pec.mongodb.net/?retryWrites=true&w=majority'
  // ).then(() => console.log('DB ok'))
  //   .catch((error) => console.log('DB error', error));

  const [cartData, setCartData] = React.useState([]);

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/cart' element={<Cart cartData={cartData} />} />
            <Route path='*' element={<Found404 />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default App;
