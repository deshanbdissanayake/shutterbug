import AsyncStorage from '@react-native-async-storage/async-storage';

const setAsync = async (name, value) => {
    try{
        await AsyncStorage.setItem(name, JSON.stringify(value));
        return true;
    }catch(error){
        console.log('error at set async: ', error)
        return false;
    }
}

const getAsync = async (name) => {
    try {
        const value = await AsyncStorage.getItem(name);
        if (value !== null) {
            return JSON.parse(value);
        }else{
            return false;
        }
    } catch (error) {
        console.log('error at get async: ', error)
        return false;
    }
}

const removeAsync = async (name) => {
    try {
        await AsyncStorage.removeItem(name);
        return true;
    } catch (error) {
        console.log('error at get async: ', error)
        return false;
    }
}

export { setAsync, getAsync, removeAsync }