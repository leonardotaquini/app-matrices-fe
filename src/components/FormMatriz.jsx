import { useEffect, useState } from "react";
import { useForm } from "../hooks/UseForm";
import { GenerarMatriz } from "./GenerarMatriz";

export const FormMatriz = ({ data }) => {
  const [Result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const { handleInputChange, reset, values } = useForm(
    {
      filas: "",
      columnas: "",
      filas2: "",
      columnas2: "",
    },
  );
  const { filas, columnas, filas2, columnas2 } = data;
  const sumarMatricez = async () => {
    console.log(values)
    if (columnas !== columnas2 || filas !== filas2) {
      alert("Las matrices no son compatibles");
      setError("Las matrices no son compatibles");
      return;
    }
    try {
      const data = await fetch("https://app-matrices.onrender.com/api/sumarMatricez", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ values, filas, columnas }),
      });
      const response = await data.json();
      console.log(response);
      if (response.error) {
        setError(response.error);
        setResult(null);
        return;
      }
      setResult(response.mResult);
    } catch (error) {
      console.error(error);
    }
  };

  const multiplicarMatricez = async () => {
    if (columnas !== filas2) {
      alert("Las matrices no son compatibles");
      setError("Las matrices no son compatibles");
      return;
    }
    try {
      const data = await fetch(
        "https://app-matrices.onrender.com/api/multiplicarMatricez",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ values, filas, columnas, filas2, columnas2 }),
        }
      );
      const response = await data.json();
      console.log(response);
      if (response.error) {
        setError(response.error);
        setResult(null);
        return;
      }
      setResult(response.mResult);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    reset(data);
  }, [data]);


  const restarMatricez = async () => {
    if (columnas !== columnas2 || filas !== filas2) {
      alert("Las matrices no son compatibles");
      setError("Las matrices no son compatibles");
      return;
    }
    try {
      const data = await fetch("https://app-matrices.onrender.com/api/restarMatricez", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ values, filas, columnas }),
      });
      const response = await data.json();
      console.log(response);
      if (response.error) {
        setError(response.error);
        setResult(null);
        return;
      }
      setResult(response.mResult);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (values.filas === "" || values.columnas === "") {
      return alert("Ingrese un valor valido");
    }

    if (values.filas2 === "" || values.columnas2 === "") {
      return alert("Ingrese un valor valido");
    }
  };
  const matriz = Array.from({ length: data.filas }, () =>
    Array.from({ length: data.columnas })
  );
  const matriz2 = Array.from({ length: data.filas2 }, () =>
    Array.from({ length: data.columnas2 })
  );

  return (
    <div className="container mt-2 ">
      <form onSubmit={handleSubmit} className="row">
        <div className="col-6 border">
          <h3 className="text-center">Matriz A</h3>
          <GenerarMatriz
            matriz={matriz}
            handleInputChange={handleInputChange}
            mName={"A"}
          />
        </div>
        <div className="col-6 border">
          <h3 className="text-center">Matriz B</h3>
          <GenerarMatriz
            matriz={matriz2}
            handleInputChange={handleInputChange}
            mName={"B"}
          />
        </div>
        <div className="col-12 mt-1">
          <div className="row">
            <div className="col-4 text-center">
              <button
                className="btn btn-primary"
                onClick={sumarMatricez}
                type="button"
              >
                Sumar
              </button>
            </div>
            <div className="col-4 text-center">
              <button
                className="btn btn-primary"
                onClick={multiplicarMatricez}
                type="button"
              >
                Multiplicar
              </button>
            </div>
            <div className="col-4 text-center">
              <button
                className="btn btn-primary"
                onClick={restarMatricez}
                type="button"
              >
                Restar
              </button>
            </div>
          </div>
        </div>
      </form>

      <div className=" shadow m-3">
        {!error && Result && (
          <div className="container border p-3">
            <h3>Resultado</h3>
            {Result?.map((fila, i) => (
              <div className="row " key={i}>
                {fila.map((columna, j) => (
                  <div className="col" key={j}>
                    <input
                      className="form-control"
                      type="number"
                      name={`result:[${i}][${j}]`}
                      value={columna}
                      readOnly
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
