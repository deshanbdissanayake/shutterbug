const signUp = async (fullName, email, password, confPassword) => {
    const data = {
        "status": "success",
        "message": [
            "Your account has been successfully registered."
        ],
        data: {}
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
            "status": "info",
            "message": [
                "Please validate your email address to continue."
            ],
            data: {}
        };
    }else{ // if email validation passed
        if(username == "test@test.com" && password == "1234"){
            data = {
                "status": "success",
                "message": [
                    "Login Success."
                ],
                data: {
                    "token": "ABcd12343443Xffdfs-dadaddhfgfhgah4545-234324gghgfdfghfdsff"
                }
            }
        }else{
            data = {
                "status": "error",
                "message": [
                    "Invalid username or password."
                ],
                data: {}
            }
        }
    }

    return data;
}

const forgotPassword = async (email) => {
    const data = {
        "status": "success",
        "message": [
            "Please check your email inbox for OTP code."
        ],
        data: {}
    };

    return data;
}

export { signUp, signIn, forgotPassword }