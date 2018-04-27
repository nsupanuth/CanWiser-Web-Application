const loginToken = (username,token,role) => {
    console.log("Login token on action.js")
    return (dispatch) => {

        dispatch({  
            type : 'LOGINTOKEN',
            payload : {
                username : username,
                token : token,
                role : role
            }
        })
    }
}

const facebookLoginAuthen = (res) => {

    console.log(res)

    // dispatch ({
    //     type : 'USER_LOGIN',
    //     payload : {
    //         facebookID : res.id,
    //         name : res.name
    //     }
    // })
}

export { loginToken,facebookLoginAuthen }   

