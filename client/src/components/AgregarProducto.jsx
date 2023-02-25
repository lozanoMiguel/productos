import React, { useState, useEffect } from "react";
import Axios from 'axios';
import { useNavigate } from "react-router-dom";

function AgregarProducto(){


  //Para añadir un nuevo producto
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [stock, setStock] = useState('');
  const [categoria, setCategoria] = useState('Indumentaria');
  const [categoriaLista, setCategoriaLista] = useState([]);

  //Navegar al home luego de algun proceso
  const navigate = useNavigate();

  //Añade la fecha actual al producto ingresado
  const current = new Date();
  const date = `${current.getFullYear()}-${current.getMonth()+1}-${current.getDate()}`;

  const getNumberCategory = () =>{
    let valor;
    if(categoria === 'indumentaria'){
      valor = 1;
    }else if(categoria === 'alimentacion'){
      valor = 2;
    }else if(categoria === 'material deportivo'){
      valor = 3;
    }else{
      valor = 7;
    }
    return valor;
  }

  const add = (e) =>{
    e.preventDefault();
    Axios.post('http://localhost:8000/api/addProduct',
    {id_categoria: getNumberCategory(), nombre: nombre, precio: precio, fecha_ingreso: date, stock: stock});
    navigate('/');
    console.log(categoria)
  }

  useEffect(()=>{
    Axios.get('http://localhost:8000/api/getCategorys')
    .then((response)=>{
      setCategoriaLista(response.data);
    })
  }, [categoriaLista]);

  return  <div className="container">
            <form onSubmit={ add }>
              <div className="form-group">
                <label htmlFor="inputNombre">Nombre</label>
                <input type="text" className="form-control" name="nombre" id="nombre" aria-describedby="Nombre" placeholder="Nombre"
                  onChange={(e)=>{
                      setNombre(e.target.value)
                  }}></input>
              </div>
              <div className="form-group mt-3">
                <label htmlFor="inputPrecio">Precio</label>
                <input type="number" className="form-control" name="precio" id="precio" placeholder="Precio"
                  onChange={(e)=>{
                    setPrecio(e.target.value)
                  }}></input>
              </div>
              <div className="form-group mt-3">
                <label htmlFor="inputPrecio">Stock</label>
                <input type="number" className="form-control" name="stock" id="precio" placeholder="Stock"
                  onChange={(e)=>{
                    setStock(e.target.value)
                  }}></input>
              </div>
              <div className="form-group mt-2 col-md-4 offset-4">
                <label htmlFor="inputState">Categoría</label>
                <select defaultValue={true} id="inputState" name="categoria" className="form-control mt-1"
                  onChange={e=>{
                    setCategoria(e.target.value)
                  }}>{
                    categoriaLista.map((value)=>(
                     <option>{value.nombre}</option>
                    ))
                  }
                </select>
              </div>
              <button type="submit" className="btn btn-primary mt-3">Agregar</button>
            </form>
          </div>
}

export default AgregarProducto;