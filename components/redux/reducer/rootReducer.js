import { 
    LOGIN_USER, 
    REGISTER_USER, 
    ADD_SEGMENT_CHARACTERISTICS, 
    ADD_COLORGRAM,
    USER_INFO_FROM_ASYNC_STORAGE,
    ADD_CENTER_SEGMENT
} from "../action/types"

let initialState = {
    username: "",
    email: "",
    countOfDiagrams: 0,
    listOfDiagrams: [],
    diagrams: {
        mainSegment: {
            color: ""
        },
        anotherSegments: [
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
                color: "#808080"
            },
            {
                catagory: "",
                problem: "",
                emotion: "",
                color: "#808080"
            },
            {
                catagory: "",
                problem: "",
                emotion: "",
                color: "#808080"
            },
            {
                catagory: "",
                problem: "",
                emotion: "",
                color: "#808080"
            },
            {
                catagory: "",
                problem: "",
                emotion: "",
                color: "#808080"
            },
            {
                catagory: "",
                problem: "",
                emotion: "",
                color: "#808080"
            },
            {
                catagory: "",
                problem: "",
                emotion: "",
                color: "#808080"
            },
    
            {
                catagory: "",
                problem: "",
                emotion: "",
                color: "#808080"
            },
            {
                catagory: "",
                problem: "",
                emotion: "",
                color: "#808080"
            },
            {
                catagory: "",
                problem: "",
                emotion: "",
                color: "#808080"
            },
            {
                catagory: "",
                problem: "",
                emotion: "",
                color: "#808080"
            },
            {
                catagory: "",
                problem: "",
                emotion: "",
                color: "#808080"
            },
            {
                catagory: "",
                problem: "",
                emotion: "",
                color: "#808080"
            },
            {
                catagory: "",
                problem: "",
                emotion: "",
                color: "#808080"
            },
            {
                catagory: "",
                problem: "",
                emotion: "",
                color: "#808080"
            },
    
            {
                catagory: "",
                problem: "",
                emotion: "",
                color: "#808080"
            },
            {
                catagory: "",
                problem: "",
                emotion: "",
                color: "#808080"
            },
            {
                catagory: "",
                problem: "",
                emotion: "",
                color: "#808080"
            }
        ]
    }
}

export const rootReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOGIN_USER: 
            return {
                ...state, 
                email: action.payload.email,
                username: action.payload.username,
                countOfDiagrams: action.payload.countOfDiagrams
            }
        case REGISTER_USER: 
            return {
                ...state, 
                username: action.payload.username,
                email: action.payload.email
            }
        case USER_INFO_FROM_ASYNC_STORAGE: 
            return {
                ...state,
                username: action.payload.username,
                email: action.payload.email,
                // Список готовых цветограмм, список 
            }
        case ADD_SEGMENT_CHARACTERISTICS: 
            return {
                ...state,
                anotherSegments: [...state.diagrams.anotherSegments, state.diagrams.anotherSegments.map((item, index) => {
                    if (index === action.payload.id) {
                        item.catagory = action.payload.catagory
                        item.problem = action.payload.problem
                        item.emotion = action.payload.emotion
                        item.color = action.payload.color
                    }
                }) ]
            }
        case ADD_CENTER_SEGMENT: 
            return {
                ...state, 
                mainSegment: {
                    ...mainSegment,
                    color: action.payload.color
                }
            }
        case ADD_COLORGRAM: 
            return {
                ...state,
                listOfDiagrams: [...state.listOfDiagrams, {
                    mainSegment: action.payload.mainSegment,
                    anotherSegments: action.payload.anotherSegments
                }]
            }
        default: return state
    }
}