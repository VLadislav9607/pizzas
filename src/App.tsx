import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Found404 from './pages/Found404';
import Cart from './pages/Cart';
import './scss/app.scss';

function App () {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='*' element={<Found404 />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default App;
