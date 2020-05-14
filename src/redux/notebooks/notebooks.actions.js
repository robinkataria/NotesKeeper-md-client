import notebooksActionTypes from './notebooks.types'

const setNotebooksArray = (array)=>({
    type:notebooksActionTypes.SET_NOTEBOOKS_ARRAY,
    payload:array
})

const setNotebook = notebook=>({
    type:notebooksActionTypes.SET_NOTEBOOK,
    payload:notebook
})

const setNote = (note)=>({
    type:notebooksActionTypes.SET_NOTE,
    payload:note
})

export {setNote,setNotebooksArray,setNotebook}