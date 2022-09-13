import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import TweetsList from "./TweetsList";

const TweetsDashboard = () => {
	const { tweetStore } = useStore();
	useEffect(() => {
		if (tweetStore.tweetRegistry.size <= 1) tweetStore.loadAllTweets();
	}, [
		tweetStore.tweetRegistry.size,
		tweetStore.loadingInitial,
		tweetStore.loading,
		tweetStore.loadAllTweets,
		tweetStore.selectedTweet,
	]);

	if (tweetStore.loadingInitial || tweetStore.loading)
		return <LoadingComponent content="Loading tweets" />;
	return (
		<Grid>
			<Grid.Column width="10">
				<TweetsList />
			</Grid.Column>
		</Grid>
	);
};

export default observer(TweetsDashboard);
