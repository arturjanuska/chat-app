import { View, Text, StyleSheet, Image, useWindowDimensions, TouchableOpacity, Alert, TextInput } from 'react-native';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changePhotoThunk, deleteAccThunk } from '../../thunks/thunkCreator';

const Settings = ({ navigation }) => {
	const { width } = useWindowDimensions();

	const [trigger, setTrigger] = useState(false);
	const [imageUrl, setImageUrl] = useState('');

	const { logged } = useSelector((state) => state.appStore);
	const dispatch = useDispatch();

	const changePhoto = () => {
		const data = {
			id: logged.id,
			imageUrl,
		};
		dispatch(changePhotoThunk(data));
		setTrigger(false);
		setImageUrl('');
	};

	const confirmDelete = () => {
		dispatch(deleteAccThunk(logged));
		navigation.navigate('Main');
	};

	const deleteAcc = () => {
		Alert.alert(
			'Account will be deleted',
			'Are you sure?',
			[
				{
					text: 'Yes',
					onPress: confirmDelete,
				},
				{
					text: 'Cancel',
					onPress: () => console.log('Canceled'),
				},
			],
			{
				cancelable: true,
				onDismiss: () => console.log('closed'),
			}
		);
	};

	return (
		<View style={styles.container}>
			<View style={[styles.imageContainer, { width }]}>
				<Image
					source={{ uri: logged.profileImage }}
					style={[{ width: (width / 100) * 90, height: 300 }, styles.image]}
				/>
			</View>
			<View style={styles.buttonContainer}>
				{trigger && (
					<View>
						<TextInput
							style={styles.input}
							placeholder='Image url...'
							onChangeText={(text) => setImageUrl(text)}
						></TextInput>
						<TouchableOpacity
							style={styles.button}
							onPress={changePhoto}
						>
							<View>
								<Text style={{ textAlign: 'center', color: 'white', fontSize: 16 }}>Apply</Text>
							</View>
						</TouchableOpacity>
					</View>
				)}
				<TouchableOpacity
					style={styles.button}
					onPress={() => setTrigger(!trigger)}
				>
					<View>
						<Text style={{ textAlign: 'center', color: 'white', fontSize: 16 }}>Change Profile Photo</Text>
					</View>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.button}
					onPress={deleteAcc}
				>
					<View>
						<Text style={{ textAlign: 'center', color: 'white', fontSize: 16 }}>Delete Account</Text>
					</View>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default Settings;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#2D2D2D',
	},
	imageContainer: {
		marginHorizontal: '5%',
		marginTop: 20,
	},
	image: {
		borderRadius: 10,
	},
	button: {
		borderWidth: 1,
		borderRadius: 5,
		width: '80%',
		marginHorizontal: '10%',
		marginTop: 15,
		paddingVertical: 8,
		backgroundColor: '#434343',
	},
	input: {
		borderWidth: 2,
		width: '80%',
		marginHorizontal: '10%',
		marginTop: 20,
		borderRadius: 5,
		padding: 5,
		backgroundColor: '#696969',
		paddingLeft: 20,
	},
});
