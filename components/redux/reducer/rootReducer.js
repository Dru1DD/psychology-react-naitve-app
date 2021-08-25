import { LOGIN_USER, REGISTER_USER, ADD_SEGMENT_CHARACTERISTICS, ADD_COLORGRAM } from "../action/types"

let initialState = {
    username: "",
    email: "",
    countOfDiagrams: 0,
    listOfDiagrams: [],
    diagrams: [
        {
            catagory: "",
            problem: "",
            emotion: "",
            color: ""
        },
        {
            catagory: "",
            problem: "",
            emotion: "",
            color: ""
        },
        {
            catagory: "",
            problem: "",
            emotion: "",
            color: ""
        },
        {
            catagory: "",
            problem: "",
            emotion: "",
            color: ""
        },
        {
            catagory: "",
            problem: "",
            emotion: "",
            color: ""
        },
        {
            catagory: "",
            problem: "",
            emotion: "",
            color: ""
        },
        {
            catagory: "",
            problem: "",
            emotion: "",
            color: ""
        },
        {
            catagory: "",
            problem: "",
            emotion: "",
            color: ""
        },

        {
            catagory: "",
            problem: "",
            emotion: "",
            color: ""
        },
        {
            catagory: "",
            problem: "",
            emotion: "",
            color: ""
        },
        {
            catagory: "",
            problem: "",
            emotion: "",
            color: ""
        },
        {
            catagory: "",
            problem: "",
            emotion: "",
            color: ""
        },
        {
            catagory: "",
            problem: "",
            emotion: "",
            color: ""
        },
        {
            catagory: "",
            problem: "",
            emotion: "",
            color: ""
        },
        {
            catagory: "",
            problem: "",
            emotion: "",
            color: ""
        },
        {
            catagory: "",
            problem: "",
            emotion: "",
            color: ""
        },

        {
            catagory: "",
            problem: "",
            emotion: "",
            color: ""
        },
        {
            catagory: "",
            problem: "",
            emotion: "",
            color: ""
        },
        {
            catagory: "",
            problem: "",
            emotion: "",
            color: ""
        }
    ]
}

export const rootReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOGIN_USER: 
            return {
                ...state, 
                email: action.payload.email
            }
        case REGISTER_USER: 
            return {
                ...state, 
                username: action.payload.username,
                email: action.payload.action
    
            }
        case ADD_SEGMENT_CHARACTERISTICS: 
            return {
                ...state,
                diagrams: [...state.diagrams, state.diagrams.map((item, index) => {
                    if (index === action.payload.id) {
                        item.catagory = action.payload.catagory
                        item.problem = action.payload.problem
                        item.emotion = action.payload.emotion
                        item.color = action.payload.color
                    }
                }) ]
            }
        case ADD_COLORGRAM: 
            return {
                ...state,
                listOfDiagrams: [...state.listOfDiagrams, action.payload]
            }
        default: return state
    }
}