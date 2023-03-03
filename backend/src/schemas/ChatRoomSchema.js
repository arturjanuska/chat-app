/* eslint-disable indent */
/* eslint-disable no-tabs */
const mongoose = require('mongoose');

const { Schema } = mongoose;

const MessageSchema = new Schema({
	messId: {
		type: String,
		required: false,
	},
	users: {
		type: Array,
		required: true,
	},
	message: {
		type: String,
		required: false,
	},
});

module.exports = mongoose.model('mobileChatMessages', MessageSchema);
