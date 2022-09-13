import { observer } from "mobx-react-lite";
import { Segment, Header, Comment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import TweetDetailedChatForm from "./TweetDetailedChatForm";
import { formatDistanceToNow } from "date-fns";

export default observer(function TweetDetailedChatList() {
	const {
		tweetStore,
		profileStore: { profile },
	} = useStore();
	const { loadCurrentComments } = tweetStore;
	return (
		<>
			<Segment
				textAlign="center"
				attached="top"
				inverted
				color="teal"
				style={{ border: "none" }}
			>
				<Header>{loadCurrentComments().length} comments</Header>
			</Segment>
			<Segment attached clearing>
				<Comment.Group>
					{loadCurrentComments().map((x) => {
						return (
							<Comment key={x.id}>
								{x.user.email === profile?.email ? (
									<Comment.Avatar
										src={
											profile.photos.length === 0
												? "/assets/user.png"
												: profile.image
										}
									/>
								) : (
									<Comment.Avatar
										src={
											x.user.photos!.length === 0
												? "/assets/user.png"
												: x.user.image
										}
									/>
								)}
								<Comment.Content>
									<Comment.Author as="a">
										{x.user.firstName!} {x.user.lastName!}
									</Comment.Author>
									<Comment.Metadata>
										<div>
											{formatDistanceToNow(Date.parse(x.datePosted!))} ago
										</div>
									</Comment.Metadata>
									<Comment.Text>{x.message!}</Comment.Text>
								</Comment.Content>
							</Comment>
						);
					})}

					<TweetDetailedChatForm />
				</Comment.Group>
			</Segment>
		</>
	);
});
