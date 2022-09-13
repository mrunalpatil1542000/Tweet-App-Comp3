import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import { Container, Icon, Menu, Image, Dropdown } from "semantic-ui-react";
import { useStore } from "../stores/store";

const NavBar = () => {
	const { userStore, profileStore } = useStore();
	const { user, logout, isLoggedIn, getUser, loggedOut } = userStore;

	useEffect(() => {
		getUser();
	}, [user]);

	return (
		<Menu inverted fixed="top">
			<Container>
				<Menu.Item as={NavLink} exact to="/" header>
					<Icon name="twitter" style={{ marginRight: "10px" }} size="huge" />
					TweetApp
				</Menu.Item>
				<Menu.Item name="Tweets" as={NavLink} to="/tweets" />
				<Menu.Item name="All Users" as={NavLink} to="/allusers" />
				<Menu.Item name="Post Tweet" as={NavLink} to="/post-tweet" />
				<Menu.Item position="right">
					<Image
						src={user?.photos.length === 0 ? "/assets/user.png" : user?.image}
						avatar
						spaced="right"
					/>
					{isLoggedIn && (
						<Dropdown pointing="top left" text={user!.email}>
							<Dropdown.Menu>
								<Dropdown.Item
									text="My Profile"
									as={Link}
									to={`/profiles/${user!.email}`}
									icon="user"
								/>
								<Dropdown.Item onClick={logout} text="logout" icon="power" />
							</Dropdown.Menu>
						</Dropdown>
					)}
				</Menu.Item>
			</Container>
		</Menu>
	);
};

export default observer(NavBar);
