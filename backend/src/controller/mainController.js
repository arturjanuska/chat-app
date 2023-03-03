/* eslint-disable no-else-return */
/* eslint-disable indent */
/* eslint-disable no-tabs */
const uid = require('uid-safe');
const bcrypt = require('bcrypt');
const UserSchema = require('../schemas/UserSchema');

module.exports = {
	register: async (req, res) => {
		console.log('req.body ===', req.body);
		const { nick, passOne, passTwo } = req.body;
		if (nick !== '' || passOne === passTwo || passOne !== '') {
			const id = await uid(10);
			const hashedPass = await bcrypt.hash(passOne, 2);
			const newUser = new UserSchema({
				id,
				nick,
				password: hashedPass,
			});
			await newUser.save();
			return res.send({ error: false, message: 'User created' });
		} else {
			return res.send({ error: true, message: 'Bad credentials' });
		}
	},
	login: async (req, res) => {
		const { nick, password } = req.body;
		const user = await UserSchema.findOne({ nick });
		if (!user) return res.send({ error: true, message: 'User does not exist, register first' });
		const isPasswordCorrect = await bcrypt.compare(password, user.password);
		if (!isPasswordCorrect) return res.send({ error: true, message: 'Bad Credentials' });
		if (isPasswordCorrect) return res.send({ error: false, message: 'Logged in', data: user });
	},
	allUsers: async (req, res) => {
		const allUsers = await UserSchema.find();
		return res.send({ error: false, message: 'All users received', data: allUsers });
	},
	changePhoto: async (req, res) => {
		const { id, imageUrl } = req.body;
		await UserSchema.findOneAndUpdate(
			{ id },
			{
				$set: {
					profileImage: imageUrl,
				},
			}
		);
		const updatedUser = await UserSchema.findOne({ id });
		res.send({ error: false, message: 'Image changed', data: updatedUser });
	},
	deleteAccount: async (req, res) => {
		const { id } = req.body;
		await UserSchema.findOneAndDelete({ id });
		res.send({ error: false, message: 'Deleted', data: null });
	},
};
