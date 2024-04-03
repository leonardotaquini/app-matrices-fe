import React from 'react'

export const GenerarMatriz = ({
    matriz,
    handleInputChange,
    mName,
    
}) => {
  return (
   <div className='container'>
   {matriz.map((fila, i) => (
          <div className="row" key={i}>
            {fila.map((columna, j) => (
              <div className="col" key={j}>
                <input
                  className="form-control m-2"
                  type="number"
                  name={`${mName}:[${i}][${j}]`}
                  value={columna}
                  onChange={handleInputChange}
                />
              </div>
            ))}
          </div>
        ))}
   </div>
  )
}
