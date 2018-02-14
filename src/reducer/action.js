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

export { loginToken }   

