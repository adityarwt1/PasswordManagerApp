import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveUserCredentials = async (userData: any) => {
  try {
    await AsyncStorage.setItem("userCredentials", JSON.stringify(userData));
    await AsyncStorage.setItem("isLoggedIn", "true");
    return true;
  } catch (error) {
    console.error("Error saving user credentials:", error);
    return false;
  }
};

export const getUserCredentials = async () => {
  try {
    const userData = await AsyncStorage.getItem("userCredentials");
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error("Error getting user credentials:", error);
    return null;
  }
};

export const clearUserCredentials = async () => {
  try {
    await AsyncStorage.removeItem("userCredentials");
    await AsyncStorage.removeItem("isLoggedIn");
    return true;
  } catch (error) {
    console.error("Error clearing credentials:", error);
    return false;
  }
};

export const checkLoginStatus = async () => {
  try {
    const isLoggedIn = await AsyncStorage.getItem("isLoggedIn");
    const userData = await AsyncStorage.getItem("userCredentials");

    return {
      isLoggedIn: isLoggedIn === "true",
      userData: userData ? JSON.parse(userData) : null,
    };
  } catch (error) {
    console.error("Error checking login status:", error);
    return { isLoggedIn: false, userData: null };
  }
};
