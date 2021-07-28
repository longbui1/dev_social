const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String },
    password: { type: String },
    fullName: { type: String },
    roleId: { type: String },
    verifyAccount: { type: Boolean },

    status: { type: Boolean },

    createdAt: { type: Date },
    createdBy: { type: String },

    updatedAt: { type: Date },
    updatedBy: { type: String },

    deletedAt: { type: Date },
    deletedBy: { type: String },
});

module.exports = mongoose.model('User', userSchema);
