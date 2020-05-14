import todosActionTypes from './todos.type'

const INITIAL_STATE= {
todosArray:[],
todoList:{
    list_name:null,
    items:[]
}
}

const todosReducer = (state=INITIAL_STATE,action)=>{
    switch(action.type){
        case todosActionTypes.SET_TODOS_ARRAY : return ({...state,todosArray:action.payload})
        case todosActionTypes.SET_TODOLIST: return ({...state,todoList:action.payload})
        default : return state
    }
}

export default todosReducer

