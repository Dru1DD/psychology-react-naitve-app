import React, { createContext, useReducer } from 'react'


const initialState = {
    user: {
        username: "",
        email: "",
        countOfCreatedDiagrams: 0
    }
}
export const AuthContext = createContext({
    
})

export const AppReducer = (state, action) => {
    switch(action.type) {
        case 'LOGIN_USER': 
            return {
                ...state, 
                user: action.payload
            }
        case 'REGISTER_USER': 
            return {
                ...state, 
                user: action.payload
            }
    }
}

export const AppProvider = (props) => {
    const [state, dispatch] = useReducer(AppReducer, initialState)

    return (
        <AuthContext.Provider
            value={{user: state.user, dispatch}}
        >
            {props.children}
        </AuthContext.Provider>
    )
}