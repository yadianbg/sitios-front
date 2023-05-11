import React, {useEffect, useState} from 'react';
import {Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import {ProvinciaService} from "../../service/provincia.service";

function ProvinciaForm(props) {
    const [id, setId] = useState('')
    const [codigo, setCodigo] = useState('')
    const [nombre, setNombre] = useState('')

    useEffect(() => {
        if(props.data.id != ''){
            setId(props.data.id)
            setCodigo(props.data.codigo)
            setNombre(props.data.nombre)
        }
    }, [])

    const createProvincia = () => {
        const data = {
            id: props.data.id ? props.data.id : id,
            codigo: codigo,
            nombre: nombre
        }
        if(props.data.id == '') {
            ProvinciaService.create(data)
        } else {
            ProvinciaService.update(data)
            props.clean()
        }
        props.reloadData()
        hide()
    }

    const clear = () => {
        setId('')
        setCodigo('')
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
                <Typography component={'h6'}> Crear Provincia </Typography>
            </DialogTitle>
            <DialogContent>
                <TextField id="standard-basic" label="Id" variant="standard" value={id}
                           onChange={(e) => setId(e.target.value.trim())}/>
            </DialogContent>
            <DialogContent>
                <TextField id="standard-basic" label="Código" variant="standard" value={codigo}
                           onChange={(e) => setCodigo(e.target.value.trim())}/>
            </DialogContent>
            <DialogContent>
                <TextField id="standard-basic" label="Nombre" variant="standard" value={nombre}
                           onChange={(e) => setNombre(e.target.value.trim())}/>
            </DialogContent>
            <DialogActions>
                <Box>
                    <Button disabled={id.trim() == '' || codigo.trim() == '' || nombre.trim() == ''} onClick={() => createProvincia()}>Aceptar</Button>
                    <Button onClick={() => hide()}>Cancelar</Button>
                </Box>
            </DialogActions>
        </Dialog>
    );
}

export default ProvinciaForm;