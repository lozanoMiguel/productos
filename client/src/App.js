import './App.css';
import MostrarProductos from './components/MostrarProductos';
import AgregarProducto from './components/AgregarProducto';
import Estadisticas from './components/Estadisticas';
import Barras from './components/Barras';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <h1 className='title'>Productos</h1>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ <MostrarProductos /> }/>
          <Route path='/add' element={ <AgregarProducto /> } />
          <Route path='/stats' element={ <Estadisticas /> } />
          <Route path= '/bar' element = { <Barras /> }/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
