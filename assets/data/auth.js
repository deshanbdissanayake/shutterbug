import AsyncStorage from "@react-native-async-storage/async-storage";

const signUp = async (firstName, lastName, email, password, confPassword) => {
    try {
        // Input validation
        if (!firstName || !email || !password || !confPassword) {
            throw new Error("Please fill in all fields.");
        }

        if (password !== confPassword) {
            throw new Error("Passwords do not match.");
        }

        const currentLocation = JSON.parse(await AsyncStorage.getItem("shutterbug-currentLocation"));
        const notifyToken = await AsyncStorage.getItem("shutterbug-notifyToken");
        const deviceData = JSON.parse(await AsyncStorage.getItem("shutterbug-deviceData"));
        
        if (!currentLocation || !notifyToken || !deviceData) {
            throw new Error("Unable to retrieve necessary data from AsyncStorage.");
        }

        const formData = new FormData();

        const postData = {
            "first_name": firstName,
            "last_name": lastName,
            "email": email,
            "password": password,
            "conf_password": confPassword,
            "location": currentLocation,
            "notify_token": notifyToken,
            "device_data": deviceData,
        }

        formData.append("token", "SHUTTERBUG-USER-TOKEN-TEMPORARY");
        formData.append("endpoint", "registerAppUser");
        formData.append("data", JSON.stringify(postData));

        const response = await fetch('https://shutterbug.introps.com/Api/get', {
            'method': 'POST',
            'body': formData,
        });

        if (response.ok) {
            const responseData = await response.json();

            await AsyncStorage.setItem("shutterbug-emailToVerify", email);
            await AsyncStorage.setItem("shutterbug-temporaryPassword", password);
            console.log(responseData)
            return responseData;
        } else {
            throw new Error("Endpoint error.");
        }
    } catch (error) {
        console.error("Signup Error:", error.message);
        return {
            "stt": "error",
            "msg": [error.message],
            "data": {}
        };
    }
}


const signIn = async (username, password) => {

    if(username == "invalid@test.com"){
        var emailValiation = false;
    }else{
        var emailValiation = true;
    }

    var data = {};
    
    if(!emailValiation){ // if email valiation failed
        data = {
            "stt": "info",
            "msg": [
                "Please validate your email address to continue."
            ],
            "data": {}
        };
    }else{ // if email validation passed
        if(username == "test@test.com" && password == "1234"){
            data = {
                "stt": "success",
                "msg": [
                    "Login Success."
                ],
                "data": {
                    "token": "ABcd12343443Xffdfs-dadaddhfgfhgah4545-234324gghgfdfghfdsff"
                }
            }
        }else{
            data = {
                "stt": "error",
                "msg": [
                    "Invalid username or password."
                ],
                "data": {}
            }
        }
    }

    return data;
}

const forgotPassword = async (email) => {
    const data = {
        "stt": "success",
        "msg": [
            "Please check your email inbox for OTP code."
        ],
        "data": {}
    };

    return data;
}

export { signUp, signIn, forgotPassword }