import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Button, Header, Item, Segment, Image } from "semantic-ui-react";
import { Tweet } from "../../../app/models/Tweet";
import { useStore } from "../../../app/stores/store";
import { format } from "date-fns";

interface Props {
	tweet: Tweet;
}

export default observer(function TweetDetailedHeader({ tweet }: Props) {
	const { tweetStore, userStore } = useStore();
	const { postALike } = tweetStore;
	const { user } = userStore;

	const handleLike = (id: number) => {
		postALike(id, user!);
	};

	useEffect(() => {
		if (tweetStore.userTweetLikeRegistry.size <= 0) {
			tweetStore.loadLikeUsers();
		}
	}, [tweetStore.userTweetLikeRegistry.size, tweetStore.userTweetLikeRegistry.values.length, tweetStore.loadLikeUsers, tweetStore.loading]);

	return (
		<Segment.Group>
			<Segment>
				<Item.Group>
					<Item>
						<Item.Content>
							<Header size="huge" content={`#${tweet.tag}`} />
							<p>{format(Date.parse(tweet.datePosted), "dd MMM yyyy")}</p>
							<p>
								Hosted by{" "}
								<strong>
									{tweet.user?.firstName} {tweet.user?.lastName}
								</strong>
							</p>
						</Item.Content>
					</Item>
				</Item.Group>
			</Segment>
			<Segment clearing attached="bottom">
				<Button color="teal" icon="like" onClick={() => handleLike(tweet.id)} />
			</Segment>
		</Segment.Group>
	);
});
