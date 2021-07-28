const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
    title: { type: String },
    level: { type: Number },

    status: { type: Boolean },

    createdAt: { type: Date },
    createdBy: { type: String },

    updatedAt: { type: Date },
    updatedBy: { type: String },

    deletedAt: { type: Date },
    deletedBy: { type: String },
});

module.exports = mongoose.model('Role', roleSchema);
