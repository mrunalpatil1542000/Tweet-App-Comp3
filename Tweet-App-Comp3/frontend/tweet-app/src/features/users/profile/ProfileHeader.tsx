import { observer } from "mobx-react-lite";
import { Grid, Header, Item, Segment } from "semantic-ui-react";
import { User } from "../../../app/models/User";

interface Props {
	profile: User | null;
}

const ProfileHeader = ({ profile }: Props) => {
	return (
		<Segment>
			{profile && (
				<Grid.Column width={12}>
					<Item.Group>
						<Item>
							<Item.Image
								avatar
								size="small"
								src={
									profile.photos.length === 0
										? "/assets/user.png"
										: profile.image
								}
							/>
							<Item.Content verticalAlign="middle">
								<Header
									as="h1"
									content={`${profile.firstName.toUpperCase()} ${profile.lastName.toUpperCase()}`}
								/>
							</Item.Content>
						</Item>
					</Item.Group>
				</Grid.Column>
			)}
		</Segment>
	);
};

export default observer(ProfileHeader);
