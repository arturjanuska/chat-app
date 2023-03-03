import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';

const MessageItem = ({ message }) => {
	const { logged } = useSelector((state) => state.appStore);

	return (
		<View style={[styles.messageContainer, { alignItems: message.users[0] === logged.nick ? 'flex-end' : 'flex-start' }]}>
			<Text style={message.users[0] === logged.nick ? styles.loggedMessage : styles.userMessage}>{message.message}</Text>
		</View>
	);
};

export default MessageItem;

const styles = StyleSheet.create({
	messageContainer: {
		padding: 8,
	},
	userMessage: {
		backgroundColor: 'white',
		maxWidth: '90%',
		padding: 8,
		borderBottomLeftRadius: 5,
		borderBottomRightRadius: 5,
		borderTopRightRadius: 5,
		color: 'black',
		fontSize: 16,
	},
	loggedMessage: {
		backgroundColor: 'white',
		maxWidth: '90%',
		padding: 8,
		borderBottomLeftRadius: 5,
		borderBottomRightRadius: 5,
		borderTopLeftRadius: 5,
		color: 'black',
		fontSize: 16,
	},
});
