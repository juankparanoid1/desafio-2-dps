import AsyncStorage from '@react-native-async-storage/async-storage';


export const login = async (user) => {
    try {
        const loginStore = await AsyncStorage.getItem('users');
        if (loginStore) {
            const registerUsers =  JSON.parse(loginStore);
            const userExists = registerUsers?.find(u => (u.username === user.username || u.email === user.username) && u.password === user.password);
            return userExists;
        }
        return null;
    } catch (error) {
        console.log(error);
    }
};

export const usersList = async () => {
    try {
        const loginStore = await AsyncStorage.getItem('users');
        if (loginStore) {
            return JSON.parse(loginStore);
        }
        return [];
    } catch (error) {
        console.log(error);
    }
}

export const register = async (user) => {
    try {
        const exists = await login(user);
        if(!exists){
            const users = await usersList();
            if(users){
                const newUser = [...users, user];
                await AsyncStorage.setItem('users', JSON.stringify(newUser));
            }
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}