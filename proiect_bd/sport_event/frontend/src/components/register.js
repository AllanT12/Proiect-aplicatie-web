import React, {useEffect, useState} from 'react';
import axiosInstance from '../axios';
//MaterialUI
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import {
	MuiPickersUtilsProvider,
	KeyboardTimePicker,
	KeyboardDatePicker, DatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import moment from "moment";

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
	const [secondary,updateSecondary] = React.useState(1);
	const  [gender,updateGender] = React.useState('');
	const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18'));
	const  [role,updateRole] = React.useState('');
	const [appState, setAppState] = useState({
		loading: false,
		posts: null,
	});
	useEffect(() => {
		axiosInstance.get('/sport/').then((res) => {
			const allPosts = res.data;
			const Options = allPosts.map(d => ({
				"id": d.id,
				"type": d.type
			}));
			updateOptions(Options);
			console.log(res.data);
		});
	}, [setAppState]);
	const initialFormData = Object.freeze({
		selectOptions : options,
		first_name: '',
		last_name: '',
		email: '',
		password: '',
		gender: gender,
		role: role,
		primary_sport:primary,
		secondary_sport:secondary,
		BirthDate: selectedDate.toDateString(),
		height:0,
		weight:0,
	});
const handleDateChange = (date) => {
    setSelectedDate(date);
  };
	const [formData, updateFormData] = useState(initialFormData);

	const handleChange = (e) => {
		updateFormData({
			...formData,
			// Trimming any whitespace
			[e.target.name]: e.target.value.trim(),
		});
	};

const handleChangeMultiple = (event) => {
		updatePrimary(event.target.value);
  };

const handleChangeMultiple2 = (event) => {
		updateSecondary(event.target.value);
  };

	const Gender = (e) => {
		updateGender(e.target.value);
	};

	const Role = (e) => {
	updateRole(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(initialFormData);
		console.log(moment(selectedDate).format('YYYY-MM-DD'));
		if(formData.first_name.toString() !== '' && formData.last_name.toString() !== '' && formData.email.toString() !== '' && formData.password.toString() !== '') {
			axiosInstance
				.post(`user/register/`, {
					first_name: formData.first_name,
					last_name: formData.last_name,
					email: formData.email,
					password: formData.password,
					gender: initialFormData.gender,
					role: initialFormData.role,
					primary_sport: initialFormData.primary_sport,
					secondary_sport: initialFormData.secondary_sport,
					BirthDate: moment(selectedDate).format('YYYY-MM-DD'),
					height: formData.height,
					weight: formData.weight,
				})
				.then((res) => {
					console.log(res);
					console.log(res.data);
					window.location.assign("/login");
				});
		}

	};


	const classes = useStyles();

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Typography component="h1" variant="h5">
					Sign up
				</Typography>
				<form className={classes.form} noValidate>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="first_name"
								label="First Name"
								name="first_name"
								autoComplete="first_name"
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="last_name"
								label="Last Name"
								name="last_name"
								autoComplete="last_name"
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="email"
								label="Email Address"
								name="email"
								autoComplete="email"
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								name="password"
								label="Password"
								type="password"
								id="password"
								autoComplete="current-password"
								onChange={handleChange}
							/>
							</Grid>
							<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="height"
								label="height(cm)"
								name="height"
								autoComplete="height"
								onChange={handleChange}
							/>
							</Grid>

							<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="weight"
								label="weight"
								name="weight"
								autoComplete="weight"
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">Gender</InputLabel>
        <Select
          labelId="gender"
          id="gender"
          value={initialFormData.gender}
          onChange={Gender}
          label="gender"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={0}>Male</MenuItem>
          <MenuItem value={1}>Female</MenuItem>
        </Select>
      </FormControl>
							<FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">Role</InputLabel>
        <Select
          labelId="role"
          id="role"
          value={initialFormData.role}
          onChange={Role}
          label="role"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={0}>Admin</MenuItem>
          <MenuItem value={1}>Coach</MenuItem>
			<MenuItem value={2}>Athlete</MenuItem>
        </Select>
      </FormControl>
						</Grid>
						<Grid item xs={12}>
							<FormControl className={classes.formControl}>
        <InputLabel shrink htmlFor="select-multiple-native">
          Primary Sport
        </InputLabel>
        <Select
          native
          value={initialFormData.primary}
          onChange={handleChangeMultiple}
          inputProps={{
            id: 'select-multiple-native1',
          }}
        >
{options.map((name) => (
            <option key={name.id} value={name.id}>
				 {name.type}
            </option>
          ))}
        </Select>
      </FormControl>
<FormControl className={classes.formControl}>
        <InputLabel shrink htmlFor="select-multiple-native">
          Secondary Sport
        </InputLabel>
        <Select
          native
          value={initialFormData.secondary}
          onChange={handleChangeMultiple2}
          inputProps={{
            id: 'select-multiple-native',
          }}
        >
{options.map((name) => (
            <option key={name.id} value={name.id}>
				 {name.type}
            </option>
          ))}
        </Select>
      </FormControl>
						</Grid>

<MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">
        <KeyboardDatePicker
          disableToolbar
          variant="normal"
          format="dd/MM/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Birth Date"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      </Grid>
    </MuiPickersUtilsProvider>

					</Grid>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
						onClick={handleSubmit}
					>
						Sign Up
					</Button>
					<Grid container justify="flex-end">
						<Grid item>
							<Link href="/login" variant="body2">
								Already have an account? Sign in
							</Link>
						</Grid>
					</Grid>
				</form>
			</div>
		</Container>
	);
}