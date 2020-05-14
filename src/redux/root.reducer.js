import {combineReducers} from 'redux'
import userReducer from './user/user.reducer'
import notebooksReducer  from './notebooks/notebooks.reducer'
import todosReducer from './todos/todos.reducer'

export default combineReducers({
    user:userReducer,
    notebooks:notebooksReducer,
    todos:todosReducer
})