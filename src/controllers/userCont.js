const Transcation = require('../models/transcation');
const Balance = require('../models/balance');

module.exports = {
  getDashboardPage: async (req, res) => {
    try {
      // Get all transactions (your existing code)
      const transcations = await Transcation.find().sort({ createdAt: -1 });

      // Fetch the most recent balance
      const balanceRecord = await Balance.findOne().sort({ lastUpdated: -1 });
      const finalBalance = balanceRecord || await Balance.create({ balance: 0.00 });

      // Prepare context object for the EJS
      const context = {
        balance: finalBalance.balance
      };

      // Render the EJS with both transactions and context
      return res.render('./user/dashboard.ejs', { transcations, context });

    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  },

    getHomePage: async (req, res) => {
        try {

            return res.render('./user/home.ejs');

        } catch (error) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}