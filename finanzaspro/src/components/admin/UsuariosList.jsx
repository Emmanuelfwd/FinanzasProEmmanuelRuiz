import React, { useState } from "react";

const UsuariosList = ({ usuarios, onDelete, onUpdate }) => {
  const [editUser, setEditUser] = useState(null);
  const [form, setForm] = useState({});

  const startEdit = (u) => {
    setEditUser(u.id);
    setForm({ ...u });
  };

  const handleSave = () => {
    onUpdate(form);
    setEditUser(null);
  };

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h5 className="card-title">Usuarios Registrados</h5>
        <ul className="list-group">
          {usuarios.map((u) => (
            <li key={u.id} className="list-group-item">
              {editUser === u.id ? (
                <div className="d-flex flex-column gap-2">
                  <input className="form-control" value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} />
                  <input className="form-control" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                  <input className="form-control" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
                  <select className="form-select" value={form.userType} onChange={(e) => setForm({ ...form, userType: e.target.value })}>
                    <option value="client">Client</option>
                    <option value="admin">Admin</option>
                  </select>
                  <div>
                    <button className="btn btn-sm btn-success me-2" onClick={handleSave}>Guardar</button>
                    <button className="btn btn-sm btn-secondary" onClick={() => setEditUser(null)}>Cancelar</button>
                  </div>
                </div>
              ) : (
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <strong>{u.nombre}</strong> ({u.email}) - <span className="badge bg-info">{u.userType || "client"}</span>
                  </div>
                  <div>
                    <button className="btn btn-sm btn-outline-primary me-2" onClick={() => startEdit(u)}>Editar</button>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => onDelete(u.id)}>Eliminar</button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UsuariosList;
