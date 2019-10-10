const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    date: String,
    approved: Boolean,
    user: { 
        type: mongoose.Schema.Types.ObjectId, // Salva apenas o id do usuário que fez a criação do spot
        ref: 'User'
    },
    spot: { 
        type: mongoose.Schema.Types.ObjectId, // Salva apenas o id do usuário que fez a criação do spot
        ref: 'Spot'
    }
});

module.exports = mongoose.model('Booking', BookingSchema);