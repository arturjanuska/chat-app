import { View, Text } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Main from '../components/Main/Main';
import Register from '../components/Register/Register';
import Login from '../components/Login/Login';
import Settings from '../components/ProfileSettings/Settings';
import Chat from '../components/Chat/Chat';

const Stack = createNativeStackNavigator();

const MainNavigation = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen
					name='Main'
					component={Main}
				/>
				<Stack.Screen
					name='Register'
					component={Register}
				/>
				<Stack.Screen
					name='Login'
					component={Login}
				/>
				<Stack.Screen
					name='Settings'
					component={Settings}
				/>
				<Stack.Screen
					name='Chat'
					component={Chat}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default MainNavigation;
