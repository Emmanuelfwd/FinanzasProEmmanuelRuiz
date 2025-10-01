import React from "react";

const GastosTipoList = ({ gastosTipo = [], onDelete }) => {
  return (
    <ul className="list-group">
      {gastosTipo.map((gasto) => (
        <li
          key={gasto.id} // ID seguro generado con agregarGastoTipoSeguro
          className="list-group-item d-flex justify-content-between align-items-center"
        >
          {gasto.nombre}
          <button
            className="btn btn-sm btn-danger"
            onClick={() => onDelete(gasto.id)}
          >
            Eliminar
          </button>
        </li>
      ))}
    </ul>
  );
};

export default GastosTipoList;
