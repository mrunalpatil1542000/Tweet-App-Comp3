import { observer } from "mobx-react-lite";
import { Grid, Item, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import UsersListItem from "./UsersListItem";

const UsersList = () => {
	const { userStore } = useStore();
	const { users } = userStore;
	return (
		<Segment>
			<Grid container columns={3}>
				{users &&
					users.map((user) => {
						return <UsersListItem key={user.loginId} user={user} />;
					})}
			</Grid>
		</Segment>
	);
};

export default observer(UsersList);
