const Transcation = require('../models/transcation');

module.exports = {
    getDashboardPage: async (req, res) => {
        try {

            const transcations = await Transcation.find()
                    return res.render('./user/dashboard.ejs', { transcations });

            
        } catch (error) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        }
}