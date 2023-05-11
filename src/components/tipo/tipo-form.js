import React, {useEffect, useState} from 'react';
import {Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import {TipoService} from "../../service/tipo.service";

function TipoForm(props) {
    const [id, setId] = useState('')
    const [nombre, setNombre] = useState('')

    useEffect(() => {
        if(props.data.id != ''){
            setId(props.data.id)
            setNombre(props.data.nombre)
        }
    }, [])

    const createTipo = () => {
        const data = {
            id: props.data.id ? props.data.id : id,
            nombre: nombre
        }
        if(props.data.id == '') {
            TipoService.create(data)
        } else {
            TipoService.update(data)
            props.clean()
        }
        props.reloadData()
        hide()
    }

    const clear = () => {
        setId('')
        setNombre('')
    }

    const hide = () => {
        clear()
        props.setDialogState(false)
    }

    return (
        <Dialog open={props.dialogState} breakpoints={{'960px': '75vw'}}
                style={{width: '50vw'}}
                onHide={() => hide()}>
            <DialogTitle>
                <Typography component={'h6'}> {props.data.id != '' ? 'Modificar' : 'Crear'} Tipo </Typography>
            </DialogTitle>
            <DialogContent>
                <TextField id="standard-basic" label="Id" variant="standard" value={id}
                           onChange={(e) => setId(e.target.value.trim())}/>
            </DialogContent>
            <DialogContent>
                <TextField id="standard-basic" label="Nombre" variant="standard" value={nombre}
                           onChange={(e) => setNombre(e.target.value.trim())}/>
            </DialogContent>
            <DialogActions>
                <Box>
                    <Button disabled={id.trim() == '' || nombre.trim() == ''} onClick={() => createTipo()}>Aceptar</Button>
                    <Button onClick={() => hide()}>Cancelar</Button>
                </Box>
            </DialogActions>
        </Dialog>
    );
}

export default TipoForm;