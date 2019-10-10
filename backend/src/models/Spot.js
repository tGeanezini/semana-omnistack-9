const mongoose = require('mongoose');

const SpotSchema = new mongoose.Schema({
    thumbnail: String,
    company: String,
    price: Number,
    techs: [String],
    user: { 
        type: mongoose.Schema.Types.ObjectId, // Salva apenas o id do usuário que fez a criação do spot
        ref: 'User'
    }
}, {
    toJSON: {
        virtuals: true,
    }
});

SpotSchema.virtual('thumbnail_url').get(function() {
    return `http://192.168.0.105:3333/files/${this.thumbnail}`
});

module.exports = mongoose.model('Spot', SpotSchema);