import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
  fab: {
    position: 'fixed',
    bottom: theme.spacing(3),
    right: theme.spacing(3),
    backgroundColor:'#343a40',
    zIndex:300,
    color:'white',
    '&:hover': {
        backgroundColor:'black',
        color:'white',
    }
  }
}));



export default function AddButton({setopen}){

    const classes = useStyles()

    return (
            <Fab classes={{root:classes.fab}} onClick={()=>setopen(true)}>
                <AddIcon color='inherit' />
            </Fab>
    )
}