const Facilitator = require('../models/facilitator.model');


const { User } = require('../models');

exports.createFacilitator = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already in use' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      email,
      password: hashedPassword,
      role: 'facilitator'
    });

    // Create facilitator record with userId
    const facilitator = await Facilitator.create({
      firstName,
      lastName,
      email,
      userId: user.id
    });

    return res.status(201).json({ message: 'Facilitator created successfully', facilitator });
  } catch (error) {
    console.error('Error creating facilitator:', error);
    return res.status(500).json({ message: 'Failed to create facilitator', error: error.message });
  }
};


exports.getFacilitators = async (req, res) => {
  try {
    const facilitators = await Facilitator.findAll();
    res.json(facilitators);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve facilitators', error: error.message });
  }
};

exports.getFacilitatorById = async (req, res) => {
  try {
    const facilitator = await Facilitator.findByPk(req.params.id);
    if (!facilitator) return res.status(404).json({ message: 'Facilitator not found' });
    res.json(facilitator);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving facilitator', error: error.message });
  }
};

exports.updateFacilitator = async (req, res) => {
  try {
    const updated = await Facilitator.update(req.body, { where: { id: req.params.id } });
    if (updated[0] === 0) return res.status(404).json({ message: 'Facilitator not found' });
    res.json({ message: 'Facilitator updated' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating facilitator', error: error.message });
  }
};

exports.deleteFacilitator = async (req, res) => {
  try {
    const deleted = await Facilitator.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ message: 'Facilitator not found' });
    res.json({ message: 'Facilitator deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting facilitator', error: error.message });
  }
};
