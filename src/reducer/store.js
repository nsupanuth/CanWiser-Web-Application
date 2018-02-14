import { createStore,combineReducers,applyMiddleware,compose } from 'redux'
import  thunk from 'redux-thunk'

const initialState = {
  loginToken : '',
  role : '',
  username : ''
}

const reducer = (state = initialState,action) => {

  switch (action.type) {
      case 'LOGINTOKEN':
          return { ...state, 
                    loginToken : action.payload.token,
                    username : action.payload.username,
                    role : action.payload.role
                 }                                        
  }   

  return state
}


export default createStore(
 reducer,
 window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
 compose(
   applyMiddleware(thunk)
 )  
)
