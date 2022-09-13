import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import TweetDetailedChat from "./TweetDetailedChatList";
import TweetDetailedHeader from "./TweetDetailedHeader";
import TweetDetailedInfo from "./TweetDetailedInfo";
import TweetDetailedSidebar from "./TweetDetailedSidebar";

const TweetDetails = () => {
	const { tweetStore, profileStore } = useStore();
	const { selectedTweet, selectTweet, loadingInitial, loadAllTweets } =
		tweetStore;
	const { id } = useParams<{ id: any }>();

	useEffect(() => {
		if (id) {
			selectTweet(id);
		}
	}, [id, selectTweet, profileStore.profile?.image]);

	if (loadingInitial || !selectedTweet) return <LoadingComponent />;

	return (
		<Grid>
			<Grid.Column width={10}>
				<TweetDetailedHeader tweet={selectedTweet} />
				<TweetDetailedInfo tweet={selectedTweet} />
				<TweetDetailedChat />
			</Grid.Column>
			<Grid.Column width={6}>
				<TweetDetailedSidebar />
			</Grid.Column>
		</Grid>
	);
};

export default observer(TweetDetails);
