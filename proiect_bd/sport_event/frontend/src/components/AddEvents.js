import React, {useEffect, useState} from 'react';
import axiosInstance from '../axios';
//MaterialUI
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
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
	const  [options2,updateOptions2] = React.useState([]);
	const [selectedTime, setSelectedTime] = React.useState(new Date('2014-08-18T21:11:54'));
	const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));
	const [primary,updatePrimary] = React.useState(1);
	const [club,updateClub] = React.useState(1);
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
		axiosInstance.get('/clubs/').then((res) => {
			const allPosts = res.data;
			const Options = allPosts.map(d => ({
				"id": d.id,
				"name": d.name
			}));
			updateOptions2(Options);
			console.log(res.data);
		});
	}, [setAppState]);
	const initialFormData = Object.freeze({
		selectOptions : options,
		selectOptions2 : options2,
		club: club,
		name: '',
		description: '',
		location: '',
		sport:primary,
		Date: selectedDate,
        Time: selectedTime,
	});
const handleTimeChange = (time) => {
    setSelectedTime(time);
  };
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
		updateClub(event.target.value);
  };

let mesaj = document.getElementById("mesaje");

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(moment(formData.Time).format('HH:MM:SS.kkkkkk'));
		if(formData.name.toString() !== '' && formData.description.toString() !== '' && formData.location.toString() !== '') {
			axiosInstance
				.post(`events/`, {
					club: initialFormData.club,
					name: formData.name,
					description: formData.description,
					location: formData.location,
					sport: initialFormData.sport,
					Date: moment(selectedDate).format('YYYY-MM-DD'),
					Time: moment(selectedTime).format('HH:MM:SS.kkkkkk'),
				})
				.then((res) => {
					console.log(res);
					console.log(res.data);
					window.location.assign("/home");
				});
		}else {
			mesaj.style.color="red";
			mesaj.innerText="Please fill all the fields"
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
					Create Event
				</Typography>
				<form className={classes.form} noValidate>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="name"
								label="Name"
								name="name"
								autoComplete="name"
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="description"
								label="Description"
								name="description"
								autoComplete="description"
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="location"
								label="Location"
								name="location"
								autoComplete="location"
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<FormControl className={classes.formControl}>
        <InputLabel shrink htmlFor="select-multiple-native">
			Sport
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
				 {name.type}
            </option>
          ))}
        </Select>
      </FormControl>
							<FormControl className={classes.formControl}>
        <InputLabel shrink htmlFor="select-multiple-native">
			Club
        </InputLabel>
        <Select
          native
          value={club}
          onChange={handleChangeMultiple2}
          inputProps={{
            id: 'select-multiple-native1',
          }}
        >
{options2.map((name) => (
            <option key={name.id} value={name.id}>
				 {name.name}
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
          label="Date"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
		  <KeyboardTimePicker
          margin="normal"
          id="time-picker"
          label="Time"
          value={selectedTime}
          onChange={handleTimeChange}
          KeyboardButtonProps={{
            'aria-label': 'change time',
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
						Make New Event!
					</Button>
				</form>
				<Grid>
				<div id="mesaje">

				</div>
				</Grid>
			</div>
		</Container>
			</Container>
	);
}