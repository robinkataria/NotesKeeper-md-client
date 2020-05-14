import todosActionTypes  from './todos.type'

const setTodosArray = array=>({
    type:todosActionTypes.SET_TODOS_ARRAY,
    payload:array
})

const setTodoList = todolist=>({
    type:todosActionTypes.SET_TODOLIST,
    payload:todolist
})

export {setTodosArray,setTodoList}