import pool from '../config/db.js';

export const getDashboardStats = async () => {
  const query = `
    SELECT
      (SELECT COUNT(*) FROM estudiantes) AS total_estudiantes,
      (SELECT COUNT(*) FROM estudiantes WHERE estado = 'activo') AS estudiantes_activos,
      (SELECT COUNT(*) FROM estudiantes WHERE estado = 'inactivo') AS estudiantes_inactivos,
      (SELECT COUNT(*) FROM docentes) AS total_docentes,
      (SELECT COUNT(*) FROM users) AS total_usuarios
  `;

  const result = await pool.query(query);

  return result.rows[0];
};