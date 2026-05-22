import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

import { loginUser } from '../services/auth.service.js';

dotenv.config();

export const login = async (req, res) => {

  try {

    const { correo, password } = req.body;

    const user = await loginUser(correo);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'Usuario no encontrado'
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordValid) {
    return res.status(401).json({
        success: false,
        error: 'Contraseña incorrecta'
    });
    }

    const token = jwt.sign(
      {
        id: user.id,
        correo: user.correo,
        rol: user.rol
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '8h'
      }
    );

    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        nombres: user.nombres,
        apellidos: user.apellidos,
        correo: user.correo,
        rol: user.rol
      }
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      error: error.message
    });

  }
};