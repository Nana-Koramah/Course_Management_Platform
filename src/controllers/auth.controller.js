const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user.model');
const Student = require('../models/student.model');
const Facilitator = require('../models/facilitator.model');
const Manager = require('../models/manager.model');

// Register a new user with role-based profile
exports.register = async (req, res) => {
  try {
    const {
      email,
      password,
      role,
      firstName,
      lastName,
      department,
      cohortId,
      classId
    } = req.body;

    // Basic validation
    if (!email || !password || !role || !firstName || !lastName) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Role-specific validations
    if (role === 'manager' && !department) {
      return res.status(400).json({ message: 'Manager registration requires department' });
    }

    if (role === 'student' && (!cohortId || !classId)) {
      return res.status(400).json({ message: 'Student registration requires cohortId and classId' });
    }

    // Check for existing user
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    // Hash password
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Create user
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role
    });

    // Create role-specific record
    if (role === 'student') {
      await Student.create({
        userId: newUser.id,
        firstName,
        lastName,
        email,
        cohortId,
        classId
      });
    } else if (role === 'facilitator') {
      await Facilitator.create({
        userId: newUser.id,
        firstName,
        lastName,
        email
      });
    } else if (role === 'manager') {
      await Manager.create({
        userId: newUser.id,
        firstName,
        lastName,
        email,
        department
      });
    } else {
      return res.status(400).json({ message: 'Invalid role specified' });
    }

    res.status(201).json({
      message: 'User registered successfully',
      userId: newUser.id
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Registration failed',
      error: error.message
    });
  }
};

// Login and return token with role-specific profile
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ where: { email } });
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Get role-specific profile
    let profile = null;
    let facilitatorId = null;
    if (user.role === 'student') {
      profile = await Student.findOne({ where: { userId: user.id } });
    } else if (user.role === 'facilitator') {
      profile = await Facilitator.findOne({ where: { userId: user.id } });
      facilitatorId = profile ? profile.id : null;  
    } else if (user.role === 'manager') {
      profile = await Manager.findOne({ where: { userId: user.id } });
    }

    // Generate token and include facilitatorId if facilitator
    const tokenPayload = {
      id: user.id,
      role: user.role,
    };

    if (user.role === 'facilitator' && facilitatorId) {
      tokenPayload.facilitatorId = facilitatorId;
    }

    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        profile
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Login failed', error: error.message });
  }
};
