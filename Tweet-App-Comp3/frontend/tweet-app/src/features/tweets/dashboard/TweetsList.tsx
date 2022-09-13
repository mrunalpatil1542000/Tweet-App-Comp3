import { observer } from "mobx-react-lite";
import { Fragment, useEffect } from "react";
import { Header, Item, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import TweetListItem from "./TweetListItem";

const TweetsList = () => {
	const { tweetStore } = useStore();
	const { groupedTweets } = tweetStore;

	return (
		<>
			{groupedTweets.map(([group, tweets]) => {
				return (
					<Fragment key={group}>
						<Header sub color="teal">
							{group}
						</Header>
						<Segment>
							<Item.Group divided>
								{tweets.map((tweet) => {
									return <TweetListItem key={tweet.id} tweet={tweet} />;
								})}
							</Item.Group>
						</Segment>
					</Fragment>
				);
			})}
		</>
	);
};

export default observer(TweetsList);
