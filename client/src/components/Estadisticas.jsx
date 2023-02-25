import Axios from "axios";
import React, { useState } from "react";
import Barras from './Barras';

function Estadisticas() {

  //useStates creados para grabar los campos necesarios para la consulta a la base datos
  const [fechaIni, setFechaIni] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [categoria, setCategoria] = useState('Indumentaria');

  //useState creado para persistir la informacion obtenida de la base de datos y con el cual se volcara en el grafico de barras
  const [productStats, setProductStats] = useState({});

  //useState creado para la visualizacion del grafico de barras una vez la consulta a la base de datos se haya hecho
  const[flag, setFlag] = useState(false);

  //funcion creada para determinar el id de la categoria para su posterior consulta a la base de datos
  const getNumberCategory = () => {
    let valor;
    if (categoria === 'Indumentaria') {
      valor = "1";
    } else if (categoria === 'Alimentación') {
      valor = "2";
    } else {
      valor = "3";
    }
    return valor;
  }

  const getStats = (e) => {
    e.preventDefault()
    Axios.get(`http://localhost:8000/api/get/${getNumberCategory()}/${fechaIni}/${fechaFin}`)
    .then((res) =>{
      setProductStats(res.data)
      setFlag(true)
    });
  }

  return <div className="container">
            <form onSubmit={ getStats }>
              <div className="form-group m-2">
                <label htmlFor="">Fecha inicio</label>
                <input className="form-control" type="text" placeholder=" yyyy-mm-dd"
                  onChange={e => {
                    setFechaIni(e.target.value)
                  }}></input>
              </div>
              <div className="form-group m-2 ">
                <label htmlFor="">Fecha fin</label>
                <input className="form-control" type="text" placeholder=" yyyy-mm-dd"
                  onChange={e => {
                    setFechaFin(e.target.value)
                  }}
                ></input>
              </div>
              <div className="form-group m-3 col-md-4 ">
                <select className="form-control" name="categoria" id="categoria"
                  onChange={e => {
                    setCategoria(e.target.value)
                  }}>
                  <option value="Indumentaria">Indumentaria</option>
                  <option value="Alimentación">Alimentación</option>
                  <option value="Material Deportivo">Material deportivo</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary mt-2">Consultar</button>
            </form>
            { flag && <Barras datos = { productStats } />}
          </div>
  }

export default Estadisticas;
