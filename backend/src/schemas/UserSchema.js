/* eslint-disable indent */
/* eslint-disable no-tabs */
const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
	id: {
		type: String,
		required: false,
	},
	nick: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	profileImage: {
		type: String,
		required: false,
		default: 'https://images-ext-2.discordapp.net/external/4Whw1T9tnEZqQHWAe_r4mjZ21gIjiPpz0azU4f5bPVA/%3Fw%3D2000/https/img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?width=676&height=676',
	},
});

module.exports = mongoose.model('mobileChatUsers', UserSchema);
