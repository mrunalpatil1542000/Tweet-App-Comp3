import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Container, Grid, Header, Image } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import MyTweetsList from "./MyTweetsList";

const ProfileDashboard = () => {
	const { userStore, tweetStore } = useStore();
	const { user } = userStore;
	const {
		loadAllTweets,
		selectTweet,
		tweetRegistry,
		selectedTweet,
		loadingInitial,
	} = tweetStore;
	useEffect(() => {
		if (tweetStore.tweetRegistry.size <= 1 || tweetStore.editMode)
			tweetStore.loadAllTweets();
	}, [
		tweetRegistry.size,
		tweetStore.editMode,
		tweetStore.loading,
		loadAllTweets,
		loadingInitial,
		selectedTweet,
		selectTweet,
	]);
	if (tweetStore.loadingInitial || tweetStore.loading)
		return <LoadingComponent content="Loading my tweets...." />;
	return (
		<Container>
			<Grid>
				<Grid.Column width={4}>
					<Image src="/assets/user.png" size="massive" avatar spaced="right" />
				</Grid.Column>
				<Grid.Column width={12}>
					<Header sub className="large text" color="teal">
						{user?.firstName} {user?.lastName}
					</Header>
					<Container>
						<br />
						<div className="medium text">Email: {user?.email}</div>
						<br />
						<div className="medium text">Contact: {user?.contactNumber}</div>
					</Container>
				</Grid.Column>
			</Grid>
			<br />
			<br />
			<Grid>
				<Grid.Column width={16}>
					<MyTweetsList />
				</Grid.Column>
			</Grid>
		</Container>
	);
};

export default observer(ProfileDashboard);
