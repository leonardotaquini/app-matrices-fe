import { FormMatriz } from "./components/FormMatriz";
import { useForm } from "./hooks/UseForm";
import { useEffect, useState } from "react";
function App() {
  const [data, setdata] = useState({
    filas: 0,
    columnas: 0,
    filas2: 0,
    columnas2: 0,
  });
  const { values, handleInputChange, reset } = useForm({
    filas: '',
    columnas: '',
    filas2: '',
    columnas2: '',
  });
  useEffect(() => {
    reset();
  }, [data]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
    if(values.filas === '' || values.columnas === '' || values.filas2 === '' || values.columnas2 === ''){
      return alert('Ingrese un valor valido');
    };
    if (values.filas < 0 || values.columnas < 0 || values.filas2 < 0 || values.columnas2 < 0) {
      return alert('Ingrese un valor valido');
    }

    setdata(values);
 
  };
  return (

      <main className="container d-flex justify-content-center align-content-center flex-column">
        <h1 className="text-center">Operaciones  de Matrices</h1>
        <form onSubmit={handleSubmit} className="row  justify-content-center  align-content-center">
          <div className="col-6 mb-3">
            <h3>Matriz A</h3>
            <label htmlFor="fila" className="form-label">
              Filas de la Matriz
            </label>
            <input
              type="number"
              name="filas"
              placeholder="filas"
              className="form-control"
              value={values.filas}
              {...values}
              onChange={handleInputChange}
            />
            <label htmlFor="columna" className="form-label">
              Columnas de la matriz
            </label>
            <input
              type="number"
              name="columnas"
              placeholder="columnas"
              className="form-control"
              value={values.columnas}
              {...values}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-6 mb-3">
            <h3>Matriz B</h3>
            <label htmlFor="fila" className="form-label">
              Filas de la Matriz
            </label>
            <input
              type="number"
              name="filas2"
              placeholder="filas"
              className="form-control"
              value={values.filas2}
              {...values}
              onChange={handleInputChange}
            />
            <label htmlFor="columna" className="form-label">
              Columnas de la matriz
            </label>
            <input
              type="number"
              name="columnas2"
              placeholder="columnas"
              className="form-control"
              value={values.columnas2}
              {...values}
              onChange={handleInputChange}
            />
          </div>
          <div className="text-center">
            <button className="btn btn-primary">Generar matriz</button>
          </div>
        </form>
        <div>
          {data.filas > 0 && data.columnas > 0 && (
            <>
              <FormMatriz
               data={data}
              />
            </>
          )}
        </div>
      </main>
    
  );
}

export default App;
