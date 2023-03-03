import { View, Text, StyleSheet, TouchableOpacity, useWindowDimensions, FlatList, Image, ScrollView } from 'react-native';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLogged } from '../../store/appStore';
import UserCard from './UserCard';

const Main = ({ navigation }) => {
	const { width } = useWindowDimensions();

	const { logged, users } = useSelector((state) => state.appStore);
	const dispatch = useDispatch();

	const goToRegister = () => {
		navigation.navigate('Register');
	};
	const goToLogin = () => {
		navigation.navigate('Login');
	};

	const goToSettings = () => {
		navigation.navigate('Settings');
	};

	const logOut = () => {
		dispatch(setLogged(null));
	};

	const openChat = () => {
		navigation.navigate('Chat');
	};

	return (
		<View style={styles.container}>
			{!logged ? (
				<View style={styles.buttonContainer}>
					<TouchableOpacity
						style={styles.button}
						onPress={goToRegister}
					>
						<Text style={{ color: 'white' }}>Sign up</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.button}
						onPress={goToLogin}
					>
						<Text style={{ color: 'white' }}>Login</Text>
					</TouchableOpacity>
				</View>
			) : (
				<View style={styles.topSide}>
					<View>
						<Text style={{ fontSize: 18, color: '#979797', paddingTop: 10, paddingLeft: 10 }}>Your profile</Text>
					</View>
					<View style={styles.loggedProfileContainer}>
						<View style={styles.imageContainer}>
							<Image
								source={{ uri: logged.profileImage }}
								style={[{ width: 80, height: 80 }, styles.profileImage]}
							/>
						</View>
						<View style={{ gap: 12 }}>
							<Text style={{ fontSize: 24, color: 'white' }}>{logged.nick}</Text>
							<View style={styles.profileButtonContainer}>
								<TouchableOpacity
									style={styles.button}
									onPress={goToSettings}
								>
									<Text style={{ color: 'white' }}>Settings</Text>
								</TouchableOpacity>
								<TouchableOpacity
									style={styles.button}
									onPress={logOut}
								>
									<Text style={{ color: 'white' }}>Log out</Text>
								</TouchableOpacity>
							</View>
						</View>
					</View>
				</View>
			)}
			<View style={{ width: '100%' }}>
				<Text style={{ fontSize: 18, color: '#979797', paddingTop: 10, paddingLeft: 20, textAlign: 'left' }}>Users</Text>
			</View>
			{users && logged && (
				<ScrollView style={styles.listContainer}>
					{users.map((user) => (
						<UserCard
							key={user.id}
							user={user}
							openChat={openChat}
						/>
					))}
				</ScrollView>
			)}
		</View>
	);
};

export default Main;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#3A3A3A',
		alignItems: 'center',
		justifyContent: 'flex-start',
	},
	buttonContainer: {
		marginTop: 10,
		marginRight: 10,
		width: '100%',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-end',
		gap: 10,
		marginBottom: 20,
	},
	button: {
		paddingVertical: 6,
		paddingHorizontal: 12,
		borderRadius: 5,
		backgroundColor: '#1F1E21',
	},
	loggedProfileContainer: {
		backgroundColor: '#2D2D2D',
		justifyContent: 'flex-start',
		alignItems: 'center',
		flexDirection: 'row',
		width: '100%',
		padding: 5,
		height: 100,
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
	topSide: {
		backgroundColor: '#2D2D2D',
		width: '100%',
		paddingLeft: 10,
	},
	listContainer: {
		width: '100%',
		paddingVertical: 5,
		margin: 1,
	},
});
