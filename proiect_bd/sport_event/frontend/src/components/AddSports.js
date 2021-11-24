import React, { useState } from 'react';
import axiosInstance from '../axios';
//MaterialUI
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
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
}));

export default function SignUp() {
	const initialFormData = Object.freeze({
        type:'',
	});

	const [formData, updateFormData] = useState(initialFormData);

	const handleChange = (e) => {
		updateFormData({
			...formData,
			// Trimming any whitespace
			[e.target.name]: e.target.value.trim(),
		});
	};

	let mesaj = document.getElementById("mesaje");


	const handleSubmit = (e) => {
		e.preventDefault();
		mesaj.innerText="";
		console.log(formData);
		if(formData.type.toString() !== '') {
			axiosInstance
				.post(`sport/`, {
					type: formData.type,
				})
				.then((res) => {
					console.log(res);
					console.log(res.data);
					window.location.assign("/home");
				});
		}
		else
		{
			mesaj.style.color="red";
			mesaj.innerText="Please fill all the fields";
		}
	};

	const classes = useStyles();

	return (
		<Container>
			<Header />
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Typography component="h1" variant="h5">
					Add Sport
				</Typography>
				<form className={classes.form} noValidate>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="type"
								label="Name of The Sport"
								name="type"
								autoComplete="type"
								onChange={handleChange}
							/>
						</Grid>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
						onClick={handleSubmit}
					>
						Add Sport
					</Button>
                    </Grid>
					<Grid>
						<div id="mesaje">

						</div>
					</Grid>
				</form>
			</div>
		</Container>
			</Container>
	);
}