import { setLogged, setUsers } from '../store/appStore';
import { getReq, postReq } from '../utils/http';

export const getUsersThunk = (nick) => async (dispatch) => {
	const result = await getReq('allUsers');
	const filteredUsers = result.data.filter((user) => user.nick !== nick);
	const sortedUsers = filteredUsers.sort((a, b) => a.nick.localeCompare(b.nick));
	dispatch(setUsers(sortedUsers));
};

export const changePhotoThunk = (data) => async (dispatch) => {
	const result = await postReq(data, 'changePhoto');
	if (!result.error) {
		dispatch(setLogged(result.data));
	}
};

export const deleteAccThunk = (user) => async (dispatch) => {
	const result = await postReq(user, 'deleteAccount');
	dispatch(setLogged(null));
};
