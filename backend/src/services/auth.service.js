import pool from '../config/db.js';

export const loginUser = async (correo) => {

  const query = `
    SELECT
      u.id,
      u.nombres,
      u.apellidos,
      u.correo,
      u.password_hash,
      u.estado,
      r.nombre AS rol
    FROM users u
    INNER JOIN roles r
      ON u.rol_id = r.id
    WHERE u.correo = $1
  `;

  const result = await pool.query(query, [correo]);

  return result.rows[0];
};