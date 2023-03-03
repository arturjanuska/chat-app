import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import { setMessages, setRoomData } from '../../store/appStore';
const socket = io.connect('http://192.168.1.176:5000');

const UserCard = ({ user, openChat }) => {
	const { logged, users, roomData } = useSelector((state) => state.appStore);
	const dispatch = useDispatch();

	const chat = () => {
		socket.emit('handleRoom', [logged.nick, user.nick]);
		socket.on('roomOpened', (data) => {
			dispatch(setRoomData(data));
			dispatch(setMessages(data.roomMessages));
		});
		openChat();
	};

	return (
		<View style={styles.loggedProfileContainer}>
			<View style={styles.statusIndicator}></View>
			<View style={styles.imageContainer}>
				<Image
					source={{ uri: user.profileImage }}
					style={[{ width: 80, height: 80 }, styles.profileImage]}
				/>
			</View>
			<View style={{ gap: 12 }}>
				<Text style={{ fontSize: 24, color: 'white' }}>{user.nick}</Text>
				<View style={styles.profileButtonContainer}>
					<TouchableOpacity
						style={styles.button}
						onPress={chat}
					>
						<Text style={{ color: 'white' }}>Message</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
};

export default UserCard;

const styles = StyleSheet.create({
	button: {
		paddingVertical: 6,
		paddingHorizontal: 12,
		borderRadius: 5,
		backgroundColor: '#1F1E21',
	},
	loggedProfileContainer: {
		justifyContent: 'flex-start',
		alignItems: 'center',
		flexDirection: 'row',
		width: '100%',
		padding: 5,
		height: 100,
		marginBottom: 10,
	},
	imageContainer: {
		display: 'flex',
		width: '35%',
		alignItems: 'flex-start',
	},
	profileImage: {
		borderRadius: 25,
	},
	profileButtonContainer: {
		flexDirection: 'row',
		gap: 10,
	},
	statusIndicator: {
		borderWidth: 1,
		width: 14,
		height: 14,
		borderRadius: 50,
		marginHorizontal: 10,
		backgroundColor: 'red',
	},
});
