import { getStudents, createStudent, getStudentById, updateStudent, deactivateStudent} from '../services/students.service.js';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';

export const getAllStudents = async (req, res) => {
  try {
    const students = await getStudents();

    res.json({
      success: true,
      data: students
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

export const createNewStudent = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password_hash, 10);

    const studentData = {
      id: uuidv4(),
      rol_id: 5,
      ...req.body,
      password_hash: hashedPassword
    };

    const student = await createStudent(studentData);

    res.status(201).json({
      success: true,
      data: student
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

export const getStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const student = await getStudentById(id);

    res.json({
      success: true,
      data: student
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

export const updateExistingStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const student = await updateStudent(id, req.body);

    res.json({
      success: true,
      data: student
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

export const deactivateExistingStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const student = await deactivateStudent(id);

    res.json({
      success: true,
      message: 'Estudiante desactivado correctamente',
      data: student
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};