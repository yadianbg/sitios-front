import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

export function CustomTable(props) {
    console.log("HERE")
    return (
        <TableContainer component={Paper} sx={{minWidth: 200}}>
            <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {
                            props.header.map((row) => (
                                <TableCell key={row['header']} component="th" align="right" scope="row" >
                                    {row.header}
                                </TableCell>
                            ))
                        }
                        <TableCell component="th" scope="row" align="center">
                            Acciones
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.data.map((row) => (
                        <TableRow
                            key={row['id']}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >
                            {props.header.map((fields) => (
                                <TableCell key={row[fields.field]} component="td" scope="row" align="right">
                                    {row[fields.field]}
                                </TableCell>
                            ))}
                            <TableCell component="td" scope="row" align="center">
                                <Box>
                                    <Button onClick={() => props.editFunction(row['id'])}>Editar</Button>
                                    <Button onClick={() => props.deleteFunction(row['id'])}>Eliminar</Button>
                                    {props.seeFunction && <Button onClick={() => props.seeFunction(row['id'])}>Ver</Button>}
                                </Box>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default Table;