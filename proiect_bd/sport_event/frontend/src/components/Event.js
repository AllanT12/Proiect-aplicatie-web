import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import moment from "moment";


const useStyles = makeStyles((theme) => ({
	cardMedia: {
		paddingTop: '56.25%', // 16:9
	},
	link: {
		margin: theme.spacing(1, 1.5),
	},
	cardHeader: {
		backgroundColor:
			theme.palette.type === 'light'
				? theme.palette.grey[200]
				: theme.palette.grey[700],
	},
	postTitle: {
		fontSize: '16px',
		textAlign: 'left',
	},
	postText: {
		display: 'flex',
		justifyContent: 'left',
		alignItems: 'baseline',
		fontSize: '12px',
		textAlign: 'left',
		marginBottom: theme.spacing(2),
	},
}));



const Posts = (props) => {
	const { posts } = props;
	const [selectedDate, setSelectedDate] = React.useState(new Date());
	let [fposts, setEvents] = React.useState(posts);
  const handleDateChange = (date) => {
    //setSelectedDate(date);
    setEvents(posts?.filter(post => post?.Date === moment(date).format('YYYY-MM-DD')));
  };

	const classes = useStyles();
	if (!posts || posts.length === 0) return <p>Can not find any events, sorry</p>;
	return (
		<React.Fragment>
			<MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="dd/MM/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Search a specific date"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
	  </Grid>
		  </MuiPickersUtilsProvider>
			<Container maxWidth="md" component="main">
				<Grid container spacing={5} alignItems="flex-end">
					{fposts.map((post) => {
						return (
							// Enterprise card is full width at sm breakpoint
							<Grid item key={post.id} xs={12} md={4}>
								<Card className={classes.card}>
									<CardContent className={classes.cardContent}>
										<Typography
											gutterBottom
											variant="h6"
											component="h2"
											className={classes.postTitle}
										>
											{post?.name}
										</Typography>
                                        <div className={classes.postText}>
											<Typography color="textSecondary">
												Supported by: {post?.club.name}
											</Typography>
										</div>
										<div className={classes.postText}>
											<Typography color="textSecondary">
										{post?.description}
												</Typography>
											</div>
										<div className={classes.postText}>
											<Typography color="textSecondary">
										At {post?.location}
												</Typography>
											</div>
										<div className={classes.postText}>
											<Typography color="textSecondary">
                                                {post?.Date+'/'+post?.Time.substr(0, 5)}
												</Typography>
											</div>
									</CardContent>
								</Card>
							</Grid>
						);
					})}
				</Grid>
			</Container>
		</React.Fragment>
	);
};
export default Posts;