import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import appStore from "./store/appStore";
import { configureStore } from "@reduxjs/toolkit";
import MainNavigation from "./navigation/MainNavigation";

const store = configureStore({
	reducer: {
		appStore,
	},
});

export default function App() {
	return (
		<Provider store={store}>
			<MainNavigation></MainNavigation>
		</Provider>
	);
}
