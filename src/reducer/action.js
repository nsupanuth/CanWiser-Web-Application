const loginToken = (username,token,role,picture) => {
    console.log("Login token on action.js")
    return (dispatch) => {

        dispatch({  
            type : 'LOGINTOKEN',
            payload : {
                username : username,
                token : token,
                role : role,
                picture : picture
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

