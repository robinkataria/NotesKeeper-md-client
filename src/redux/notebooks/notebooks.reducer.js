import notebooksActiontypes  from './notebooks.types'

const INITIAL_STATE={
    notebooksArray:[],
    notebook:{name:null,descritpion:null,notes:[]},
    note:{id:null,name:null,createdAt:null,data:null,notebook_name:null}
}

const notebooksReducer = (state=INITIAL_STATE,action)=>{
    switch(action.type){
        case notebooksActiontypes.SET_NOTEBOOKS_ARRAY: return({...state,notebooksArray:action.payload});
        case notebooksActiontypes.SET_NOTEBOOK: return({...state,notebook:action.payload});
        case notebooksActiontypes.SET_NOTE: return({...state,note:action.payload});
        default : return state
    }
}

export default notebooksReducer