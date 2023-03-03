/* eslint-disable max-len */
/* eslint-disable indent */
/* eslint-disable no-tabs */
const uid = require('uid-safe');
const MessageSchema = require('../schemas/ChatRoomSchema');

module.exports = (io) => {
	io.on('connect', (socket) => {
		socket.on('handleRoom', async (data) => {
			console.log('data ===', data);
			const firstUser = data[0];
			const secondUser = data[1];

			const allMessages = await MessageSchema.find();

			const roomMessages = allMessages.filter((mess) => (mess.users[0] === firstUser && mess.users[1] === secondUser) || (mess.users[0] === secondUser && mess.users[1] === firstUser));

			const dataToSend = {
				roomFor: {
					firstUser,
					secondUser,
				},
				roomMessages,
			};
			socket.emit('roomOpened', dataToSend);
		});
		socket.on('sendMessage', async (data) => {
			console.log(data);
			const id = await uid(10);
			const newMess = new MessageSchema({
				messId: id,
				users: [data.from, data.to],
				message: data.message,
			});
			await newMess.save();
			const allMessages = await MessageSchema.find();

			const roomMessages = allMessages.filter((mess) => (mess.users[0] === data.from && mess.users[1] === data.to) || (mess.users[0] === data.to && mess.users[1] === data.from));
			console.log('roomMessages ===', roomMessages);
			socket.emit('messages', roomMessages);
		});
	});
};
