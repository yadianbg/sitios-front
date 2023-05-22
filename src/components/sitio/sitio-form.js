import React, {useEffect, useState} from 'react';
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, Select, TextField, FormControlLabel, Checkbox} from "@mui/material";
import dayjs from 'dayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {TipoService} from "../../service/tipo.service";
import {ProvinciaService} from "../../service/provincia.service";
import {SitioService} from "../../service/sitio.service";
import {MenuItem} from '@material-ui/core';

function SitioForm(props) {
    const [nombre, setNombre] = useState('')
    const [direccion, setDireccion] = useState('')
    const [capacidad, setCapacidad] = useState('')
    const [fechaApertura, setFechaApertura] = useState('')
    const [disponible, setDisponible] = useState('')
    const [foto, setFoto] = useState('')
    const [tipo, setTipo] = useState('')
    const [provincia, setProvincia] = useState('')
    const [dbTipo, setDbTipo] = useState([])
    const [dbProvincia, setDbProvincia] = useState([])
    const [localImage, setLocalImage] = useState('')
    const [initialImage, setInitialImage] = useState('')
    const [error, setError] = useState({
        nombre: false,
        direccion: false,
        capacidad: false,
        fechaApertura: false,
        disponible: false,
        foto: false,
        tipo: false,
        provincia: false,
    })

    useEffect(() => {
        if(props.data.id != ''){
            setNombre(props.data.nombre)
            setDireccion(props.data.direccion)
            setCapacidad(props.data.capacidad)
            setFechaApertura(props.data.fechaApertura)
            setDisponible(props.data.disponible)
            setFoto(props.data.foto)
            setTipo(props.data.tipo)
            setProvincia(props.data.provincia)
            setLocalImage(props.data.foto)
            setInitialImage(props.data.foto)
        }

        TipoService.get().then((response) => setDbTipo(response.data))
        ProvinciaService.get().then((response) => setDbProvincia(response.data))
    }, [])

    const create = () => {
        if(props.data.id == '') {
            const obj = {
                nombre: nombre,
                direccion: direccion,
                capacidad: capacidad,
                fechaApertura: fechaApertura,
                disponible: disponible,
                foto: foto,
                tipo: tipo,
                provincia: provincia,
            }
            SitioService.create(obj).then(() => props.reloadData())
        } else {
            const obj = {
                id: props.data.id,
                nombre: nombre,
                direccion: direccion,
                capacidad: capacidad,
                fechaApertura: fechaApertura,
                disponible: disponible,
                tipo: tipo,
                provincia: provincia,
            }
            if (initialImage != foto) {
                obj['foto'] = foto
            }
            SitioService.update(obj).then(() => props.reloadData())
            props.clean()
        }
        hide()
    }

    const clear = () => {
        setNombre('')
        setDireccion('')
        setCapacidad('')
        setFechaApertura('')
        setDisponible('')
        setFoto('')
        setTipo('')
        setProvincia('')
        setDbTipo([])
        setDbProvincia([])
        setLocalImage('')
        setInitialImage('')
    }

    const hide = () => {
        clear()
        props.setDialogState(false)
    }

    const stopDropPropagation = (e) => {
        e.stopPropagation()
        e.preventDefault()
    }

    const handleDrop = (e) => {
        stopDropPropagation(e);
        setFoto(e.dataTransfer.files[0])
        setLocalImage(URL.createObjectURL(e.dataTransfer.files[0]))
    }

    return (
        <Dialog open={props.dialogState} breakpoints={{'960px': '75vw'}}
                style={{width: '50vw'}}
                onHide={() => hide()}>
            <DialogTitle>
                <Typography component={'h6'}> {props.data.id == '' ? 'Crear' : 'Editar'} Sitio </Typography>
            </DialogTitle>
            <DialogContent sx={{'display': 'flex', 'flexDirection': 'column', 'gap': 5, 'width': '500px'}}>
                <TextField required id="nombre" label="Nombre" variant="standard" value={nombre}
                           onChange={(e) => setNombre(e.target.value.trim())} />
                <TextField id="direccion" label="Dirección" variant="standard" value={direccion}
                           onChange={(e) => setDireccion(e.target.value.trim())} />
                <TextField required id="capacidad" label="Capacidad" variant="standard" type="number" value={capacidad}
                           error={error.capacidad}
                           InputLabelProps={{
                            shrink: true,
                           }}
                           onInput={(e) => {
                                if (!(+e.target.value)) {
                                    setError({...error, capacidad: true})
                                } else {
                                    setError({...error, capacidad: false})
                                }
                            }}
                            onChange={(e) => setCapacidad(e.target.value)} />
                <div style={{'width': '100%', 'height': '200px', 'border': 'solid blue 1px'}}
                     onDrag={(e) => stopDropPropagation(e)}
                     onDrop={(e) => {
                         handleDrop(e)
                     }}
                     onDragOver={(e) => stopDropPropagation(e)}>
                    {localImage
                        ? <img src={localImage} width={200} height={200} draggable={false}/>
                        : <Typography component={"h4"}>Arrastre la foto aquí</Typography>}
                </div>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker id="fechaApertura" label="Fecha Apertura" variant="standard"
                        value={props.data.id != '' ? dayjs(fechaApertura) : dayjs(Date.now())}
                        onChange={(e) => setFechaApertura(e)} />
                </LocalizationProvider>
                <FormControlLabel
                    control={
                        <Checkbox name="disponible" checked={disponible}
                            onChange={(e) => setDisponible(e.target.checked)} />
                    }
                    label="Disponible"
                />
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="tipo-label">Tipo</InputLabel>
                    <Select
                        labelId="tipo-label"
                        id="tipo"
                        value={tipo}
                        label="Tipo"
                        variant="standard"
                        onChange={(e) => setTipo(e.target.value)}>
                        {dbTipo.map((dat) => (<MenuItem key={dat.id} value={dat.id}>{dat.nombre}</MenuItem>))}
                    </Select>
                </FormControl>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="provincia-label">Provincia</InputLabel>
                    <Select
                        labelId="provincia-label"
                        id="provincia"
                        value={provincia}
                        label="Provincia"
                        variant="standard"
                        onChange={(e) => setProvincia(e.target.value)}>
                        {dbProvincia.map((dat) => (<MenuItem key={dat.id} value={dat.id}>{dat.nombre}</MenuItem>))}
                    </Select>
                </FormControl>
            </DialogContent>            
            <DialogActions>
                <Box>
                    <Button disabled={nombre == '' || capacidad == ''} onClick={() => create()}>Aceptar</Button>
                    <Button onClick={() => hide()}>Cancelar</Button>
                </Box>
            </DialogActions>
        </Dialog>
    );
}

export default SitioForm;