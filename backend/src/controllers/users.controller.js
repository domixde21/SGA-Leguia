import { getUsers, createUser, getUserById, updateUser, deleteUser} from '../services/users.service.js';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

export const getAllUsers = async (req, res) => {

  try {

    const users = await getUsers();

    res.json({
      success: true,
      data: users
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      error: error.message
    });

  }
};

export const createNewUser = async (req, res) => {

  const hashedPassword = await bcrypt.hash(req.body.password_hash, 10);

  try {

    const userData = {
      id: uuidv4(),
      ...req.body,
      password_hash: hashedPassword
    };

    const user = await createUser(userData);

    res.status(201).json({
      success: true,
      data: user
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      error: error.message
    });

  }
};

export const getUser = async (req, res) => {

  try {

    const { id } = req.params;

    const user = await getUserById(id);

    res.json({
      success: true,
      data: user
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      error: error.message
    });

  }
};

export const updateExistingUser = async (req, res) => {

  try {

    const { id } = req.params;

    const updatedUser = await updateUser(id, req.body);

    res.json({
      success: true,
      data: updatedUser
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      error: error.message
    });

  }
};

export const deleteExistingUser = async (req, res) => {

  try {

    const { id } = req.params;

    const deletedUser = await deleteUser(id);

    res.json({
      success: true,
      data: deletedUser
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      error: error.message
    });

  }
};