import React, { useEffect, useRef } from 'react';
import { addValue, changeAction, doneAction, startAction } from './actions/actions';
import { Snackbar, Backdrop, CircularProgress, Paper, Typography, Grid, TextField, Button, Tooltip, IconButton, List } from '@material-ui/core';
import makeStyles from '@material-ui/styles/makeStyles';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import MuiAlert from '@material-ui/lab/Alert';

const useStyles = makeStyles( (theme) => {
    return {
      header : {
        padding: '20px',
        margin: '20px'
      },
      backdrop: {
        color: '#FFF'
      }
    }
});

const Sfo = function Sfo(props) {
  console.log("START SFO APP");
  const {max, sum, form, values, saga} = props; 

  useEffect( () => {
    if (saga.waiting === 'DONE') {
      setTimeout( () => {
        props.dispatch(doneAction())
      }, 3000);
    }
  });

  const classes = useStyles();
  const ref = useRef(null);
  return (
    <div>
      <Snackbar open={saga.waiting === 'DONE'}>
        <MuiAlert elevation={3} variant="filled" severity="success">
          Messaggio OK -> {saga.value}
        </MuiAlert>
      </Snackbar>
      <Backdrop className={classes.backdrop} open={saga.waiting === 'WAITING'}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Paper elevation={10} className={classes.header}>
        <Typography variant={'h3'}>
          TEST APP
        </Typography>
        <Grid container>
          <Grid item>
            <TextField variant={'standard'} label={"Max"} value={max} disabled />
          </Grid>
          <Grid item>
            <TextField variant={'standard'} label={"Somma"} value={sum} disabled />
          </Grid>
          <Grid item>
            <Button variant={'outlined'} color={'primary'} onClick={() => props.dispatch(startAction())}>Calcola</Button>
          </Grid>
        </Grid>
      </Paper>
      <Paper elevation={10}>
        <Grid container>
          <Grid item xs={12}>
            <TextField variant={'standard'} label={"Value 1"} value={form.v1} onChanghe={(event) => props.dispatch(changeAction(event.target.value, 'v1'))} />
          </Grid>
          <Grid item xs={12}>
            <TextField variant={'standard'} label={"Value 2"} value={form.v2} onChanghe={(event) => props.dispatch(changeAction(event.target.value, 'v2'))} />
          </Grid>
        </Grid>
        <Grid container>
          <Grid item>
            <TextField variant={'standard'} label={"VALORE"} inputRef={ref} />
          </Grid>
          <Grid item>
            <Tooltip title="Aggiungi valore">
              <IconButton color="primary" aria-label="upload picture" coponent="span" onClick={() => props.dispatch(addValue(ref.target.value))}>
                <AddCircleIcon fontSize="large" />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={6}>
            <List>
              {values.map(item => (
                {item}
                ))}
            </List>
          </Grid>
        </Grid>

      </Paper>

    </div>
  )
};

export default Sfo;
