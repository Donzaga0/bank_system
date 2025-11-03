const Transcation = require('../models/transcation');

module.exports = {
    getAdminDashboardPage: async (req, res) => {
        try {
            
            return res.render('./admin/admindashboard.ejs', {res})

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

            const data = { description, amount, date, type, status, balance};
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
    }
}