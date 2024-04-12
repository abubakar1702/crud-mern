import users from "../model/userModel.js";

export const create = async (req, res) => {
  try {
    const userData = new users(req.body);

    const validationError = userData.validateSync();
    if (validationError) {
      return res.status(400).json({ error: validationError.errors });
    }

    const savedData = await userData.save();
    res.status(200).json(savedData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getAll = async (req, res) => {
  try {
    const allUsers = await users.find();
    if (!allUsers) {
      return res.status(404).json({ msg: "users not found" });
    }
    res.status(200).send(allUsers);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getOne = async (req, res) => {
  try {
    const id = req.params.id;
    const userExists = await users.findById(id);

    if (!userExists) {
      return res.status(500).json({ msg: "user not found!" });
    }

    res.status(200).json(userExists);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const userExists = await users.findById(id);

    if (!userExists) {
      return res.status(500).json({ msg: "user not found!" });
    }

    const updatedUser = await users.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const userExists = await users.findById(id);

    if (!userExists) {
      return res.status(500).json({ msg: "user not found!" });
    }
    await users.findByIdAndDelete(id);
    res.status(200).json({ msg: "user have been deleted sussessfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
