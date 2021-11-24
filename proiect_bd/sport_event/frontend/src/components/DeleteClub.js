import React, {useEffect, useState} from 'react';
import axiosInstance from '../axios';
//MaterialUI
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Header from "./Header";

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
	selectEmpty: {
    marginTop: theme.spacing(2),
  },
	formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
	textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));


export default function SignUp() {

	const handleSubmit = (e) => {
		e.preventDefault();
        let url = 'clubs/delete/';
		axiosInstance
			.delete(url, {
			})
			.then((res) => {
				window.location.assign("/home");
			});
	};


	const classes = useStyles();

	return (
		<Container>
			<Header />
		<Container component="main" maxWidth="xs">

			<CssBaseline />
			<div className={classes.paper}>
				<Typography component="h1" variant="h5">
				</Typography>
				<form className={classes.form} noValidate>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<div color="red">
								IMPORTANT!!!
								DELETING YOUR CLUB WILL DELETE ALL THE REQUESTS AND ALL THE EVENTS!
							</div>
						</Grid>
					</Grid>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="red"
						className={classes.submit}
						onClick={handleSubmit}
					>
						Delete
					</Button>
				</form>
			</div>
		</Container>
			</Container>
	);
}