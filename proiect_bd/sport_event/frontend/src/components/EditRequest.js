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
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
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
	const  [role,updateRole] = React.useState("");
	const [primary,updatePrimary] = React.useState(0);
	const [appState, setAppState] = useState({
		loading: false,
		posts: null,
	});
	useEffect(() => {
		axiosInstance.get('/clubs/requests/').then((res) => {
			const allPosts = res.data;
			setAppState({ loading: false, posts: allPosts });
			const Options = allPosts.map(d => ({
				"id": d.id,
				"user_id": d.user_id,
				"club_id":d.club_id,
			}));
			updateOptions(Options);
			console.log(res.data);
		});
	}, [setAppState]);
	const initialFormData = Object.freeze({
		selectOptions : options,
		primary: primary,
		option:role,
	});

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
		console.log(event.target.value);
  };

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log();
        let url = 'clubs/update/'+primary+'/';
		axiosInstance
			.patch(url, {
			    status:role
			})
			.then((res) => {
				window.location.assign("/");
			});
	};

	const Role = (e) => {
	updateRole(e.target.value);
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
          Select Request
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
				 {name.user_id?.first_name+" "+name.club_id?.name}
            </option>
          ))}
        </Select>
      </FormControl>
						</Grid>
						<FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">Option</InputLabel>
        <Select
          labelId="option"
          id="option"
          value={initialFormData.option}
          onChange={Role}
          label="option"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={1}>Member</MenuItem>
			<MenuItem value={2}>Denied</MenuItem>
        </Select>
      </FormControl>
					</Grid>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="blue"
						className={classes.submit}
						onClick={handleSubmit}
					>
						Update Request
					</Button>
				</form>
			</div>
		</Container>
			</Container>
	);
}