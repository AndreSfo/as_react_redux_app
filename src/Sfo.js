import { Backdrop, Button, CircularProgress, Grid, IconButton, List, Paper, Snackbar, TextField, Tooltip, Typography, ListItem } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import MuiAlert from '@material-ui/lab/Alert';
import makeStyles from '@material-ui/styles/makeStyles';
import React, { useEffect, useRef } from 'react';
import { addValue, changeAction, doneAction, startAction, removeValue } from './actions/actions';
import { connect } from 'react-redux';

const useStyles = makeStyles( (theme) => {
    return {
      header : {
        padding: '20px',
        margin: '20px'
      },
      backdrop: {
        color: '#FFF'
      },
      item: {
        margin: '10px'
      },
      listItem: {
        border: 'solid 1px',
        marginBottom: '5px'
      }
    }
});

const Sfo = function Sfo(props) {
  console.log("START SFO APP", props);
  const {max, sum, form, values, saga} = props; 

  useEffect( () => {
    if (saga.waiting === 'DONE') {
      setTimeout( () => {
        props.dispatch(doneAction())
      }, 3000);
    }
  });

  const classes = useStyles();
  const inputEl = useRef(null);
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
          <Grid item className={classes.item}>
            <TextField variant={'standard'} label={"Max"} value={max} disabled />
          </Grid>
          <Grid item className={classes.item}>
            <TextField variant={'standard'} label={"Somma"} value={sum} disabled />
          </Grid>
          <Grid item className={classes.item}>
            <Button variant={'outlined'} color={'primary'} onClick={() => props.dispatch(startAction())}>Calcola</Button>
          </Grid>
        </Grid>
      </Paper>
      <Paper elevation={10} className={classes.header}>
        <Grid container>
          <Grid item xs={12} className={classes.item}>
            <TextField variant={'standard'} label={"Valore 1"} value={form.v1} onChanghe={(event) => props.dispatch(changeAction(event.target.value, 'v1'))} />
          </Grid>
          <Grid item xs={12} className={classes.item}>
            <TextField variant={'standard'} label={"Valore 2"} value={form.v2} onChanghe={(event) => props.dispatch(changeAction(event.target.value, 'v2'))} />
          </Grid>
        </Grid>
        <Grid container>
          <Grid item className={classes.item}>
            <TextField variant={'standard'} label={"VALORE"} inputRef={inputEl} />
          </Grid>
          <Grid item className={classes.item}>
            <Tooltip title="Aggiungi valore">
              <IconButton color="primary" aria-label="upload picture" component="span" onClick={() => props.dispatch(addValue(inputEl.current.value))}>
                <AddCircleIcon fontSize="large" />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={6}>
            <List>
              {values.map( (value, index) => (
                <ListItem className={classes.listItem} button key={index}>
                  <Grid xs={11}>{value}</Grid>
                  <Grid xs={1}>
                    <IconButton color="primary" aria-label="upload picture" component="span" onClick={() => props.dispatch(removeValue(index))}>
                      <RemoveCircleIcon fontSize="large" />
                    </IconButton>
                  </Grid>  
                </ListItem>
                ))}
            </List>
          </Grid>
        </Grid>

      </Paper>

    </div>
  )
};

const mapStateToProps = state => {
  return {
    max: 0,
    sum: 0,
    form: state.form,
    values: state.values,
    saga: state.sagaStatus
  }
}

export default connect(mapStateToProps)(Sfo);
