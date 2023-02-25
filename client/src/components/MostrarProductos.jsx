import React, { useEffect, useState } from "react";
import {Link} from 'react-router-dom';
import Axios from 'axios';
//paquete npm para el spinner Loading
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';


function MostrarProductos(){

  const [productList, setProductList] = useState([]);
  //useState utilizado para la visualizacion del spinner loading mientras se consulta a la API
  const [flag, setFlag] = useState(false);

  useEffect((e)=>{
    mostrarP()
  }, [productList]);

  const mostrarP = async() =>{
    await Axios.get('http://localhost:8000/api/getProducts').then((response)=>{
      setProductList(response.data)
      setFlag(true);
    })
  }

  const nombreCategoria = (valor) =>{
      let nombre = '';
      if(valor === 1){
        nombre = "Indumentaria";
      }else if(valor === 2){
        nombre = 'Alimentación';
      }else{
        nombre = "Material deportivo";
      }
    return nombre;
  }

  return  <>
          { !flag &&  <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open>
                        <CircularProgress color="inherit" />
                      </Backdrop> }
          <div className="container mt-3">
            
            <div className="row">
              <div className="col">
                <table className="table">
                  <thead className="table-primary">
                    <tr>
                      <th>Nombre</th>
                      <th>Categoría</th>
                      <th>Precio</th>
                      <th>Stock</th>
                    </tr>
                  </thead>
                  <tbody>
                    { 
                      productList.map((value)=>(
                        <tr key={value.id_producto}>
                          <th>{value.nombre}</th>
                          <th>{nombreCategoria(value.id_categoria)}</th>
                          <th>€{value.precio}</th>
                          <th>{value.stock}</th>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
            <Link to={'/add'}  className="btn btn-primary m-3">Agregar producto</Link>
            <Link to={'/stats'}  className="btn btn-primary m-3">Estadisticas</Link>
          </div>
          </>
}

export default MostrarProductos;