import { format } from "date-fns";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { Button, Icon, Item, Segment } from "semantic-ui-react";
import { Tweet } from "../../../app/models/Tweet";
import { useStore } from "../../../app/stores/store";

interface Props {
	tweet: Tweet;
}
const TweetListItem = ({ tweet }: Props) => {
	const {
		profileStore: { profile },
	} = useStore();

	return (
		<>
			<Segment.Group>
				<Segment>
					<Item.Group>
						<Item>
							{tweet.user?.email === profile?.email ? (
								<Item.Image
									floated="left"
									size="tiny"
									circular
									src={
										profile?.photos.length === 0
											? "/assets/user.png"
											: profile?.image
									}
								/>
							) : (
								<Item.Image
									floated="left"
									size="tiny"
									circular
									src={
										tweet.user?.photos.length === 0
											? "/assets/user.png"
											: tweet.user?.image
									}
								/>
							)}
						</Item>
						<Item.Content>
							<Item.Header># {tweet.tag}</Item.Header>
							<Item.Description>
								By @{tweet.user!.firstName}.{tweet.user!.lastName}
							</Item.Description>
						</Item.Content>
					</Item.Group>
				</Segment>
				<Segment>
					<span>
						<Icon name="clock" />
						{format(Date.parse(tweet.datePosted), "dd MMM yyyy hh:mm:aa")}
					</span>
				</Segment>
				<Segment clearing>
					<span>{tweet.subject}</span>
					<Button
						floated="right"
						as={Link}
						to={`/details/${tweet.id}`}
						icon="info"
						color="blue"
					/>
				</Segment>
			</Segment.Group>
		</>
	);
};

export default observer(TweetListItem);
