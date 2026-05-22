import pool from '../config/db.js';

export const getUsers = async () => {

  const query = `
    SELECT 
      u.id,
      u.nombres,
      u.apellidos,
      u.correo,
      r.nombre AS rol
    FROM users u
    INNER JOIN roles r
      ON u.rol_id = r.id
    ORDER BY u.created_at DESC
  `;

  const result = await pool.query(query);

  return result.rows;
};

export const createUser = async (userData) => {

  const {
    id,
    rol_id,
    nombres,
    apellidos,
    dni,
    correo,
    telefono,
    password_hash,
    estado
  } = userData;

  const query = `
    INSERT INTO users (
      id,
      rol_id,
      nombres,
      apellidos,
      dni,
      correo,
      telefono,
      password_hash,
      estado,
      created_at
    )
    VALUES (
      $1,$2,$3,$4,$5,$6,$7,$8,$9,NOW()
    )
    RETURNING *
  `;

  const values = [
    id,
    rol_id,
    nombres,
    apellidos,
    dni,
    correo,
    telefono,
    password_hash,
    estado
  ];

  const result = await pool.query(query, values);

  return result.rows[0];
  
  };

  export const getUserById = async (id) => {

  const query = `
    SELECT 
      u.id,
      u.nombres,
      u.apellidos,
      u.correo,
      r.nombre AS rol
    FROM users u
    INNER JOIN roles r
      ON u.rol_id = r.id
    WHERE u.id = $1
  `;

  const result = await pool.query(query, [id]);

  return result.rows[0];
};

export const updateUser = async (id, userData) => {

  const {
    rol_id,
    nombres,
    apellidos,
    telefono,
    estado
  } = userData;

  const query = `
    UPDATE users
    SET
      rol_id = $1,
      nombres = $2,
      apellidos = $3,
      telefono = $4,
      estado = $5
    WHERE id = $6
    RETURNING *
  `;

  const values = [
    rol_id,
    nombres,
    apellidos,
    telefono,
    estado,
    id
  ];

  const result = await pool.query(query, values);

  return result.rows[0];
};

export const deleteUser = async (id) => {

  const query = `
    DELETE FROM users
    WHERE id = $1
    RETURNING *
  `;

  const result = await pool.query(query, [id]);

  return result.rows[0];
};