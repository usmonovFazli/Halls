const jwt = require('jsonwebtoken');
const { findDistrictsByName , createDistrict } = require('../models/user.model');


const districts = async (req, res) => {
    try {
        const { name } = req.body;

        const existingName = await findDistrictsByName(name)
        if (existingName) return res.status(400).json({ message: 'Dstrict name already taken ' });

        const newDistrict = await createDistrict(req.body.name);

        res.status(201).json({ message: 'User created successfully', user: newDistrict });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports ={
    districts
}