const Transcation = require('../models/transcation');
const Balance = require('../models/balance');

module.exports = {
   getAdminDashboardPage: async (req, res) => {
    try {
      // Fetch the most recent balance record
      const balance = await Balance.findOne().sort({ lastUpdated: -1 });

      // If no balance record exists, create one with default 0.00
      if (!balance) {
        const newBalance = await Balance.create({ balance: 0.00 });
        return res.render('./admin/admindashboard.ejs', { res, context: newBalance });
      }

      // Pass the balance to the EJS template as 'context'
      return res.render('./admin/admindashboard.ejs', { res, context: balance });

    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server Error' });
    }
  },

    getAddTransPage: async (req, res) => {
        try {

            return res.render('./admin/addtrans.ejs', { res })

        } catch (error) {
            return res.status(500).json({ message: 'Server Error' });
        }
    },

    AddTranscations: async (req, res) => {
        const { description, amount, date, type, status, balance } = req.body;
        console.log(req.body);
        try {

            const descriptionPattern = /^[a-zA-Z0-9\s\-',.&@#()!]+$/;
            const amountPattern = /^\d{1,3}(?:,\d{3})*(?:\.\d{1,2})?$/;
            const datePattern = /^\d{4}-\d{2}-\d{2}$/;
            const typePattern = /^(debit|credit|check|transfer|deposit|withdrawal)$/i;
            const statusPattern = /^(pending|completed|failed|cancelled|processing|refunded)$/i;
            const balancePattern = /^-?\d{1,3}(?:,\d{3})*(?:\.\d{1,2})?$/;

            if (!descriptionPattern.test(description)) {
                throw Error('Enter a valid description');
            }

            if (!amountPattern.test(amount)) {
                throw Error('Enter a valid amount');
            }

            if (!datePattern.test(date)) {
                throw Error('Enter a valid date');
            }

            if (!typePattern.test(type)) {
                throw Error('Enter a valid type');
            }

            if (!statusPattern.test(status)) {
                throw Error('Enter a valid status');
            }

            if (!balancePattern.test(balance)) {
                throw Error('Enter a valid balance');
            }

            const data = { description, amount, date, type, status, balance };
            console.log(data);

            const newTranscation = await Transcation.create(data);
            console.log(newTranscation);

            return res.status(200).json({
                success: true,
                msg: 'Transaction added successfully',
                data: newTranscation,
                redirectURL: '/admin/dashboard'
            });

        } catch (error) {
            return res.status(500).json({ message: 'Server Error' });
        }
    },

    getManageTransPage: async (req, res) => {
        try {

            const transcations = await Transcation.find()
            return res.render('./admin/managetrans.ejs', { res, transcations })

        } catch (error) {
            return res.status(500).json({ message: 'Server Error' });
        }
    },

    deleteTransaction: async (req, res) => {
        try {
            const { id } = req.params;

            const deletedTransaction = await Transcation.findByIdAndDelete(id);

            if (!deletedTransaction) {
                return res.status(404).json({
                    success: false,
                    message: 'Transaction not found'
                });
            }

            // Redirect back to manage transactions page with success message
            res.redirect('/admin/manage-transcation?success=Transaction deleted successfully');

        } catch (error) {
            console.error('Error deleting transaction:', error);
            res.redirect('/admin/manage-transcation?error=Error deleting transaction');
        }
    },

     getProfilePage: async (req, res) => {
        try {

            return res.render('./admin/profile.ejs', { res })

        } catch (error) {
            return res.status(500).json({ message: 'Server Error' });
        }
    },

    AddBalance: async (req, res) => {
    try {
      const { amount } = req.body;
      console.log('Request body:', req.body);

      // Validate amount (allow numbers with up to 2 decimals)
      const amountPattern = /^\d+(\.\d{1,2})?$/;
      if (!amountPattern.test(amount)) {
        return res.status(400).json({ message: 'Enter a valid amount' });
      }

      // Convert amount to Number
      const numericAmount = Number(amount);

      // Check if a balance document exists
      let balanceRecord = await Balance.findOne().sort({ lastUpdated: -1 });

      if (balanceRecord) {
        // Update the existing balance
        balanceRecord.balance += numericAmount;
        balanceRecord.lastUpdated = new Date();
        await balanceRecord.save();
      } else {
        // Create a new balance document
        balanceRecord = await Balance.create({ balance: numericAmount });
      }

      console.log('Updated balance:', balanceRecord);

      return res.status(200).json({
        success: true,
        msg: 'Balance added successfully',
        data: balanceRecord,
        redirectURL: '/admin/dashboard'
      });

    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server Error' });
    }
  },

  getAddBalancePage: async (req, res) => {
    try {
        // Fetch balances from database
        const balances = await Balance.find().sort({ lastUpdated: -1 });
        
        return res.render('./admin/addbalance.ejs', { res,
            balances: balances 
        });

    } catch (error) {
        console.error('Error fetching balances:', error);
        return res.status(500).json({ message: 'Server Error' });
    }
},

deleteBalance: async (req, res) => {
    try {
        const { id } = req.params;

        const deletedBalance = await Balance.findByIdAndDelete(id);

        if (!deletedBalance) {
            return res.status(404).json({
                success: false,
                message: 'Balance not found'
            });
        }

        // Redirect back to manage balance page with success message
        res.redirect('/admin/balance?success=Balance deleted successfully');

    } catch (error) {
        console.error('Error deleting balance:', error);
        res.redirect('/admin/balance?error=Error deleting balance');
    }
}
}