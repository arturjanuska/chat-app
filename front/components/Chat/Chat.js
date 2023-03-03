import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, useWindowDimensions, SafeAreaView, Keyboard } from 'react-native';
import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';
import MessageItem from './MessageItem';
import { setMessages } from '../../store/appStore';
const socket = io.connect('http://192.168.1.176:5000');

const Chat = () => {
	const { roomData, logged, messages } = useSelector((state) => state.appStore);
	const dispatch = useDispatch();

	const { height } = useWindowDimensions();

	const [keyboardHeight, setKeyboardHeight] = useState(0);
	const [keyboardShown, setKeyboardShown] = useState(false);
	const [message, setMessage] = useState('');

	useEffect(() => {
		const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (e) => {
			setKeyboardHeight(e.endCoordinates.height);
			setKeyboardShown(true);
		});
		const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
			setKeyboardHeight(0);
			setKeyboardShown(false);
		});

		return () => {
			keyboardDidShowListener.remove();
			keyboardDidHideListener.remove();
		};
	}, []);

	const sendMessage = () => {
		const data = {
			from: logged.nick,
			to: roomData.roomFor.secondUser,
			message,
		};
		socket.emit('sendMessage', data);
		setMessage('');
		socket.on('messages', (data) => {
			dispatch(setMessages(data));
		});
	};

	return (
		<View style={[{ flex: 1 }, styles.container]}>
			{roomData && (
				<SafeAreaView style={{ flex: 1 }}>
					<ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
						<Text style={[styles.text, { marginVertical: 10 }]}>Chat with {roomData.roomFor.secondUser}</Text>
						{roomData.roomMessages && (
							<View style={{ marginBottom: 15 }}>
								{messages.map((mess, i) => (
									<MessageItem
										message={mess}
										key={i}
									/>
								))}
							</View>
						)}
					</ScrollView>
					<View style={[styles.inputContainer, { bottom: keyboardShown ? 10 : 35 }]}>
						<TextInput
							style={styles.chatInput}
							value={message}
							onChangeText={(text) => setMessage(text)}
						/>
						<TouchableOpacity
							style={styles.sendButton}
							onPress={sendMessage}
						>
							<Text style={[styles.text, { fontWeight: 'bold' }]}>SEND</Text>
						</TouchableOpacity>
					</View>
				</SafeAreaView>
			)}
		</View>
	);
};

export default Chat;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#171717',
		position: 'relative',
	},
	text: {
		color: 'white',
		fontSize: 18,
		textAlign: 'center',
	},

	inputContainer: {
		flexDirection: 'row',
		// marginBottom: 50,
	},
	chatInput: {
		flex: 0.8,
		backgroundColor: '#38485A',
		color: 'white',
		borderRadius: 5,
		paddingVertical: 10,
		paddingHorizontal: 15,
		marginRight: 10,
	},
	sendButton: {
		flex: 0.2,
		backgroundColor: '#396FA6',
		justifyContent: 'center',
		alignItems: 'center',
		paddingVertical: 5,
		borderTopRightRadius: 5,
		borderBottomRightRadius: 5,
	},
});
