import { format } from "date-fns";
import { observer } from "mobx-react-lite";
import { Segment, Grid, Icon } from "semantic-ui-react";
import { Tweet } from "../../../app/models/Tweet";
interface Props {
	tweet: Tweet;
}

export default observer(function TweetDetailedInfo({ tweet }: Props) {
	return (
		<Segment.Group>
			<Segment attached="top">
				<Grid>
					<Grid.Column width={1}>
						<Icon size="large" color="teal" name="info" />
					</Grid.Column>
					<Grid.Column width={15}>
						<p>{tweet.subject}</p>
					</Grid.Column>
				</Grid>
			</Segment>
			<Segment attached>
				<Grid verticalAlign="middle">
					<Grid.Column width={1}>
						<Icon name="calendar" size="large" color="teal" />
					</Grid.Column>
					<Grid.Column width={15}>
						<span>{format(Date.parse(tweet.datePosted), "dd MMM yyyy")}</span>
					</Grid.Column>
				</Grid>
			</Segment>
			<Segment attached>
				<Grid verticalAlign="middle">
					<Grid.Column width={1}>
						<Icon name="mail outline" size="large" color="teal" />
					</Grid.Column>
					<Grid.Column width={11}>
						<span>{tweet.user?.email}</span>
					</Grid.Column>
				</Grid>
			</Segment>
		</Segment.Group>
	);
});
