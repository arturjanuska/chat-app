import { View, Text, TextInput, StyleSheet, useWindowDimensions, Button, SafeAreaView } from 'react-native';
import React, { useRef, useState } from 'react';
import axios from 'axios';
import { postReq } from '../../utils/http';

const Register = ({ navigation }) => {
	const { width } = useWindowDimensions();

	const [nick, setNick] = useState('');
	const [password, setPassword] = useState('');
	const [repeatPassword, setRepeatPassword] = useState('');

	const handleForm = async () => {
		const userData = {
			nick,
			passOne: password,
			passTwo: repeatPassword,
		};
		if ((nick !== '' && password !== '') || password === repeatPassword) {
			const result = await postReq(userData, 'register');
			if (!result.error) {
				navigation.navigate('Login');
			}
		}
	};

	return (
		<SafeAreaView style={styles.container}>
			<TextInput
				style={styles.input}
				placeholder='Nick...'
				onChangeText={setNick}
				value={nick}
			/>
			<TextInput
				style={styles.input}
				placeholder='Password...'
				onChangeText={setPassword}
				value={password}
				secureTextEntry={true}
			/>
			<TextInput
				style={styles.input}
				placeholder='Repeat Password...'
				onChangeText={setRepeatPassword}
				value={repeatPassword}
				secureTextEntry={true}
			/>
			<View style={styles.buttonContainer}>
				<Button
					style={styles.button}
					title='Go to login'
					color='#323232'
					onPress={() => {
						navigation.navigate('Main');
						navigation.navigate('Login');
					}}
				/>
				<Button
					style={styles.button}
					title='Register'
					color='#323232'
					onPress={handleForm}
				/>
			</View>
		</SafeAreaView>
	);
};

export default Register;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#494949',
		alignItems: 'center',
		justifyContent: 'flex-start',
		paddingTop: 20,
		gap: 15,
	},
	input: {
		width: '80%',
		borderWidth: 1,
		borderColor: 'white',
		padding: 5,
		borderRadius: 5,
		paddingLeft: 20,
		backgroundColor: '#A2A2A2',
	},
	button: {
		width: '70%',
		paddingHorizontal: 10,
	},
	buttonContainer: {
		flexDirection: 'row',
		gap: 30,
	},
});
