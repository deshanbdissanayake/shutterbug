const signUp = async (fullName, email, password, confPassword) => {
    const data = {
        "stt": "success",
        "msg": [
            "Your account has been successfully registered."
        ],
        "data": {}
    };

    return data;
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