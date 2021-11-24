import React, { useEffect, useState } from 'react';
import Posts from './Member';
import PostLoadingComponent from "./PostLoading";
import axiosInstance from "../axios";
import Header from "./Header";

function App() {
	const PostLoading = PostLoadingComponent(Posts);
	const [appState, setAppState] = useState({
		loading: false,
		posts: null,
	});

	useEffect(() => {
		axiosInstance.get('clubs/members/').then((res) => {
			const allPosts = res.data;
			setAppState({ loading: false, posts: allPosts });
			console.log(res.data);
		});
	}, [setAppState]);
	return (
		<div className="App">
			<Header />
			<h1>Club Members</h1>
			<PostLoading isLoading={appState.loading} posts={appState.posts} />
		</div>
	);

}
export default App;