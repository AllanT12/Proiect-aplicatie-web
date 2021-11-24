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
	const  [options,updateOptions] = React.useState([]);
	const [primary,updatePrimary] = React.useState(1);
	const [appState, setAppState] = useState({
		loading: false,
		posts: null,
	});
	useEffect(() => {
		axiosInstance.get('clubs/').then((res) => {
			const allPosts = res.data;
			setAppState({ loading: false, posts: allPosts });
			const Options = allPosts.map(d => ({
				"id": d.id,
				"name": d.name
			}));
			updateOptions(Options);
			console.log(res.data);
		});
	}, [setAppState]);
	const initialFormData = Object.freeze({
		selectOptions : options,
	});

	const [formData, updateFormData] = useState(initialFormData);

const handleChangeMultiple = (event) => {
		updatePrimary(event.target.value);
  };

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(formData);
        let url = 'clubs/join/'+primary+'/';
		axiosInstance
			.post(url, {
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
							<FormControl className={classes.formControl}>
        <InputLabel shrink htmlFor="select-multiple-native">
          Select Club
        </InputLabel>
        <Select
          native
          value={primary}
          onChange={handleChangeMultiple}
          inputProps={{
            id: 'select-multiple-native1',
          }}
        >
{options.map((name) => (
            <option key={name.id} value={name.id}>
				 {name.name}
            </option>
          ))}
        </Select>
      </FormControl>
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
						Join Club!
					</Button>
				</form>
			</div>
		</Container>
			</Container>
	);
}