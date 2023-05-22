import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AlertDialog(props) {
    const handleClose = (value) => {
        if(value){
            props.deleteAction()
        }
        props.setConfirm(false)
    }

    return (
        <Dialog
            open={props.confirm}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            >
            <DialogTitle>
                Eliminar Artículo
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    ¿Desea eliminar el artículo seleccionado?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => handleClose(true)}>Aceptar</Button>
                <Button onClick={() => handleClose(false)}>Cancelar</Button>
            </DialogActions>
        </Dialog>
    );
}