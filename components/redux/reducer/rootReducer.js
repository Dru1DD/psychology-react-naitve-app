import { 
    LOGIN_USER, 
    REGISTER_USER, 
    ADD_SEGMENT_CHARACTERISTICS, 
    ADD_COLORGRAM,
    USER_INFO_FROM_ASYNC_STORAGE,
    ADD_CENTER_SEGMENT,
    CHANGE_TEXT_COLOR,
    CHANGE_FIRST_DIAG_SEGMENT,
    LOAD_DEFAULT_DIAG
} from "../action/types"

let initialState = {
    username: "",
    email: "",
    countOfDiagrams: 0,
    listOfDiagrams: [],
    diagrams: {
        mainSegment: {
            problem: "",
            color: "#ffffff",
            colorWithoutProblem: ""
        },
        anotherSegments: [
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
    },
    textColor: "black"
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
            let segment = state.diagrams.anotherSegments.map((item, index) => {
                    if (index === action.payload.id) {
                        item.catagory = action.payload.catagory
                        item.problem = action.payload.problem
                        item.emotion = action.payload.emotion
                        item.color = action.payload.color
                    }
                }) 
            return {
                ...state,
                anotherSegments: [...state.diagrams.anotherSegments, segment]
            }
        case ADD_CENTER_SEGMENT: 
            return {
                ...state, 
                diagrams: {
                    ...state.diagrams,
                    mainSegment: {
                        color: action.payload.mainSegment.color,
                        problem: action.payload.mainSegment.problem,
                        colorWithoutProblem: action.payload.mainSegment.colorWithoutProblem
                    }
                }
            }
        case ADD_COLORGRAM: 
            return {
                ...state,
                listOfDiagrams: [...state.listOfDiagrams, {
                    mainSegment: {
                        color: action.payload.mainSegment.color,
                        problem: action.payload.mainSegment.problem,
                        colorWithoutProblem: action.payload.mainSegment.colorWithoutProblem
                    },
                    anotherSegments: action.payload.anotherSegments
                }]
            }
        case CHANGE_TEXT_COLOR: 
            return {
                ...state,
                textColor: action.payload.textColor
            }
        case CHANGE_FIRST_DIAG_SEGMENT:
            let newDiagramsList = []
            state.diagrams.anotherSegments.map((item, index) => {
                if (index === 0) {
                   newDiagramsList.push({
                        catagory: action.payload.anotherSegments.catagory,
                        problem: action.payload.anotherSegments.problem,
                        emotion: action.payload.anotherSegments.emotion,
                        color: action.payload.anotherSegments.color
                   })
                }
                newDiagramsList.push({
                    catagory: "",
                    problem: "",
                    emotion: "",
                    color: "#808080"
                })
            })
            return {
                ...state,
                diagrams: {
                    mainSegment: {
                        color: action.payload.color,
                        problem: action.payload.problem,
                        colorWithoutProblem: action.payload.colorWithoutProblem
                    },
                    anotherSegments: newDiagramsList
                }
            }
        case LOAD_DEFAULT_DIAG:
            let defaultDiagList = {
                mainSegment: {
                    color: "#ffffff",
                    problem: ""
                },
                anotherSegments: []
            }

            state.diagrams.anotherSegments.map((item) => {
                defaultDiagList.anotherSegments.push({
                    catagory: "",
                    problem: "",
                    emotion: "",
                    color: "#808080"
                })
            })
            return {
                ...state,
                diagrams: defaultDiagList
            }

        default: return state
    }
}