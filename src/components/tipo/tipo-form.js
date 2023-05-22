import React, {useEffect, useState} from 'react';
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import {TipoService} from "../../service/tipo.service";

function TipoForm(props) {
    const [nombre, setNombre] = useState('')

    useEffect(() => {
        if(props.data.id != ''){
            setNombre(props.data.nombre)
        }
    }, [])

    const create = () => {
        if(props.data.id == '') {
            const obj = {
                nombre: nombre
            }
            TipoService.create(obj).then(() => props.reloadData())
        } else {
            const obj = {
                id: props.data.id,
                nombre: nombre
            }
            TipoService.update(obj).then(() => props.reloadData())
            props.clean()
        }
        hide()
    }

    const clear = () => {
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
                <Typography component={'h6'}> {props.data.id == '' ? 'Crear' : 'Editar'} Tipo </Typography>
            </DialogTitle>
            <DialogContent sx={{'display': 'flex', 'flexDirection': 'column', 'gap': 5, 'width': '500px'}}>
                <TextField id="nombre" label="Nombre" variant="standard" value={nombre}
                           onChange={(e) => setNombre(e.target.value.trim())}/>
            </DialogContent>
            <DialogActions>
                <Box>
                    <Button disabled={nombre == ''} onClick={() => create()}>Aceptar</Button>
                    <Button onClick={() => hide()}>Cancelar</Button>
                </Box>
            </DialogActions>
        </Dialog>
    );
}

export default TipoForm;