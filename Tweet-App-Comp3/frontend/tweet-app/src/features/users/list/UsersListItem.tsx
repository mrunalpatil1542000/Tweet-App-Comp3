import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { Button, Card, Grid, Header, Icon, Image } from "semantic-ui-react";
import { User } from "../../../app/models/User";
import { useStore } from "../../../app/stores/store";

interface Props {
	user: User;
}

const UsersListItem = ({ user }: Props) => {
	const { profileStore } = useStore();
	const { profile } = profileStore;
	return (
		<>
			<Grid.Column>
				<Card>
					<Card.Header>
						{profile?.email === user.email ? (
							<Image src={profile.image || "/assets/user.png"} />
						) : (
							<Image src={user.image || "/assets/user.png"} />
						)}
					</Card.Header>
					<Card.Content>
						<Card.Description textAlign="center">
							<Header
								sub
								size="huge"
								as="h1"
								color="teal"
								content={`${user.firstName} ${user.lastName}`}
							/>
						</Card.Description>
					</Card.Content>
					<Button color="yellow" as={Link} to={`/profiles/${user.email}`}>
						Visit profile<Icon className="angle double right"></Icon>
					</Button>
				</Card>
			</Grid.Column>
		</>
	);
};

export default observer(UsersListItem);
