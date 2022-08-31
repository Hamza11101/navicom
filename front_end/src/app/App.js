import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Grid } from '@mui/material'
import { TextField } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import userService from '../services/user.services';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: 'none',
    boxShadow: 'none',
    p: 4,
};

export default function App() {
    const reglementTable = ["Espèce", "chèque", "Traite", "Virement", "Retenu"]
    const [Valuesreg, setValues] = React.useState([]);
    const [average, setAverage] = React.useState(0);

    const [number, setNumber] = React.useState(0);
    const [montant, setMontant] = React.useState(0);
    const getMultipleRandom = (arr, num) => {
        const shuffled = [...arr].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, num);
    }
    const handleCalcu = () => {
        setValues(getMultipleRandom(reglementTable, number))
        setTable(true)
        setAverage(montant / number)
    }

    const [open, setOpen] = React.useState(false);
    const [table, setTable] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    }
    const validationSchema = Yup.object().shape({
        Name: Yup.string()
            .required("Required"),


    });

    const formik = useFormik({
        initialValues: {
            Name: "",
        },

        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log(values);
            const data = {
                Name: values.Name,
                montant: montant,
                type:Valuesreg,
                date:Date.now()
            };
            userService.saveAll(data).then(response => {
                handleClose();
            }).catch(error => {
                console.log(error);

            })
        },

    });
    return (
        <Paper sx={{ backgroundColor: 'rgb(255, 255, 255)', color: 'rgba(0, 0, 0, 0.87)', overflow: 'hidden', borderRadius: '6px', boxShadow: 'rgb(50 50 93 / 2%) 0px 2px 5px -1px, rgb(0 0 0 / 5%) 0px 1px 3px -1px', mb: '24px' }}>

            <Card sx={{ minWidth: 275, padding: "16px 16px 24px 16px" }}>
                <Typography sx={{ margin: '0px 0px 0.35em', fontSize: '1rem', fontWeight: 500, lineHeight: "1.25" }} variant="h6" gutterBottom component="h6">
                    Tableau des utilisateurs
                </Typography>
                <Button onClick={handleOpen} type='button' size='medium' sx={{ textTransform: 'none', backgroundColor: 'rgb(55, 111, 208)', ":hover": { backgroundColor: "rgb(38, 77, 145)" }, margin: '12px 0px 0px', fontSize: '0.8125rem' }} variant="contained">Ajouter</Button>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={open}>
                        <Box sx={style}>

                            <form onSubmit={formik.handleSubmit}>
                                <Grid container spacing={2} sx={{ mt: '-24px', ml: '-24px', width: 'calc(100% + 24px)' }}>
                                    <Grid item sx={{ paddingLeft: '24px!important', paddingTop: '24px!important' }} md={5}  >
                                        <TextField InputProps={{ style: { fontSize: "13px" } }} name="nbr"
                                            value={number}
                                            onChange={(e) => setNumber(e.target.value)}
                                            InputLabelProps={{ style: { fontSize: "13px" } }} fullWidth sx={{ margin: "8px 0px" }} id="nbr" label="Nombre de règlements" variant="outlined" />
                                    </Grid>
                                    <Grid item sx={{ paddingLeft: '24px!important', paddingTop: '24px!important' }} md={5} >
                                        <TextField InputProps={{ style: { fontSize: "13px" } }} name="montant"
                                            value={montant}
                                            onChange={(e) => setMontant(e.target.value)}

                                            InputLabelProps={{ style: { fontSize: "13px" } }} fullWidth sx={{ margin: "8px 0px" }} id="montant" label="Montant" variant="outlined" />
                                    </Grid>
                                    <Grid item sx={{ paddingLeft: '24px!important', paddingTop: '24px!important' }} md={2} >
                                        <Button onClick={handleCalcu} size='medium' sx={{ textTransform: 'none', backgroundColor: 'rgb(55, 111, 208)', ":hover": { backgroundColor: "rgb(38, 77, 145)" }, margin: '12px 0px 0px', fontSize: '0.8125rem' }} variant="contained">Générer</Button>
                                    </Grid>
                                </Grid>
                                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                                    {Valuesreg.map((val, index) => {
                                        return (
                                            table ?
                                                <ListItem key={index}>
                                                    <ListItemText primary={val} secondary={average} />
                                                </ListItem>
                                                : undefined)
                                    })}
                                </List>
                                <TextField InputProps={{ style: { fontSize: "13px" } }} name="Name"
                                            value={formik.values.Name}
                                            onChange={formik.handleChange}
                                            InputLabelProps={{ style: { fontSize: "13px" } }} fullWidth sx={{ margin: "8px 0px" }} id="Name" label="Name" variant="outlined" />
                                <Button type='submit' size='medium' sx={{ textTransform: 'none', backgroundColor: 'rgb(55, 111, 208)', ":hover": { backgroundColor: "rgb(38, 77, 145)" }, margin: '12px 0px 0px', fontSize: '0.8125rem' }} variant="contained">Submit</Button>
                            </form>
                        </Box>
                    </Fade>
                </Modal>
                <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>User Name</TableCell>
                                <TableCell align="center"></TableCell>
                                <TableCell align="center"></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow
                                sx={{ borderBottom: '1px solid rgb(224, 224, 224)' }}>
                                <TableCell component="th" scope="row">

                                </TableCell>
                                <TableCell align="center" >

                                </TableCell>
                            </TableRow>

                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>
        </Paper>
    )
}
