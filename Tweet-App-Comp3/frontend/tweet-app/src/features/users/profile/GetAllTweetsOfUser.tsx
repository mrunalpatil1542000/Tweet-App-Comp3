import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { Segment, Header, Item, Button } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
interface Props {
	username: string;
}
const GetAllTweetsOfUser = ({ username }: Props) => {
	const { tweetStore, userStore } = useStore();
	const { givenUserTweets, deleteTweet, loading } = tweetStore;

	const handleDelete = (username: string, id: number) => {
		deleteTweet(username, id);
	};

	if (loading) return <LoadingComponent />;
	return (
		<>
			<Segment>
				<Header icon={"twitter square"} as="h2" content="All tweets:" />
				<hr />
				<Item.Group divided>
					{givenUserTweets(username).map((tweet) => {
						return (
							<Item key={tweet.id}>
								<Item.Content>
									<Item.Header># {tweet?.tag}</Item.Header>
									<Item.Description> {tweet?.subject}</Item.Description>
									<Item.Extra>
										{tweet.user?.email === userStore.user?.email && (
											<>
												<Button
													floated="right"
													as={Link}
													to={`/update-tweet/${tweet.id}`}
													icon="edit"
													color="blue"
												/>
												<Button
													floated="right"
													icon="trash"
													onClick={() =>
														handleDelete(tweet.user!.email, tweet.id)
													}
													color="red"
												/>
											</>
										)}
										<Button
											floated="right"
											icon="info"
											color="blue"
											as={Link}
											to={`/details/${tweet.id}`}
										/>
									</Item.Extra>
								</Item.Content>
							</Item>
						);
					})}
				</Item.Group>
			</Segment>
		</>
	);
};

export default observer(GetAllTweetsOfUser);
