import React, { useEffect, useState } from 'react';
import Posts from './Club';
import PostLoadingComponent from "./PostLoading";
import axiosInstance from "../axios";
import Header from "./Header";
import {Container} from "@material-ui/core";

function App() {
	const PostLoading = PostLoadingComponent(Posts);
	const [appState, setAppState] = useState({
		loading: false,
		posts: null,
	});

	useEffect(() => {
		axiosInstance.get('clubs/').then((res) => {
			const allPosts = res.data;
			setAppState({ loading: false, posts: allPosts });
			console.log(res.data);
		});
	}, [setAppState]);
	return (
		<Container>
			<Header />
		<div className="App">
			<h1>Clubs</h1>
			<PostLoading isLoading={appState.loading} posts={appState.posts} />
		</div>
			</Container>
	);

}
export default App;