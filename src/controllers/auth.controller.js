const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const Student = require('../models/student.model');
const Facilitator = require('../models/facilitator.model');
const Manager = require('../models/manager.model');

// Register a new user with role-based profile
exports.register = async (req, res) => {
  try {
    const { email, password, role, name } = req.body;

    // Check if user already exists
    const existing = await User.findOne({ where: { email } });
    if (existing) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    // Hash password
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Create base user record
    const newUser = await User.create({
      email,
      password: hashedPassword,
      role,
    });

    // Create role-specific profile
    if (role === 'student') {
      await Student.create({ userId: newUser.id, name });
    } else if (role === 'facilitator') {
      await Facilitator.create({ userId: newUser.id, name });
    } else if (role === 'manager') {
      await Manager.create({ userId: newUser.id, name });
    } else {
      return res.status(400).json({ message: 'Invalid role' });
    }

    res.status(201).json({ message: 'User registered successfully', userId: newUser.id });
  } catch (error) {
    res.status(500).json({ message: 'Registration failed', error: error.message });
  }
};

// Login and return token with role-based profile
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ where: { email } });
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    // Fetch role-specific profile
    let profile = null;
    if (user.role === 'student') {
      profile = await Student.findOne({ where: { userId: user.id } });
    } else if (user.role === 'facilitator') {
      profile = await Facilitator.findOne({ where: { userId: user.id } });
    } else if (user.role === 'manager') {
      profile = await Manager.findOne({ where: { userId: user.id } });
    }

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        profile,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error: error.message });
  }
};
