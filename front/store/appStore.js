import { createSlice } from '@reduxjs/toolkit';

export const appStore = createSlice({
	name: 'appStore',
	initialState: {
		logged: null,
		users: [],
		roomData: null,
		messages: [],
	},
	reducers: {
		setLogged: (state, action) => {
			state.logged = action.payload;
		},
		setUsers: (state, action) => {
			state.users = action.payload;
		},
		setRoomData: (state, action) => {
			state.roomData = action.payload;
		},
		setMessages: (state, action) => {
			state.messages = action.payload;
		},
	},
});

export const { setLogged, setUsers, setRoomData, setMessages } = appStore.actions;

export default appStore.reducer;
