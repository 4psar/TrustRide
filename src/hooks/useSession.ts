import AsyncStorage from "@react-native-async-storage/async-storage";

export const getUserFromSession = async () => {
    const user = await AsyncStorage.getItem('userProfile');
    return user ? JSON.parse(user) : null;
};

export const setDatasFromSession = async (data:any) =>{
  await AsyncStorage.setItem('userData', JSON.stringify(data.user));
  await AsyncStorage.setItem('access_token', data.accessToken);
  await AsyncStorage.setItem('refresh_token', data.refreshToken);
}

export const updateUsersInSession = async(updatedFields: Partial<any>) => {
  const userData = await AsyncStorage.getItem('userProfile');
  if (!userData) return;

  const user = JSON.parse(userData);
  const updatedUser = { ...user, ...updatedFields };

  AsyncStorage.setItem('userProfile', JSON.stringify(updatedUser));
};

export const removeFromSession = async ()=>{
    await AsyncStorage.removeItem('access_token');
    await AsyncStorage.removeItem('userData');
    await AsyncStorage.removeItem('refresh_token');
}