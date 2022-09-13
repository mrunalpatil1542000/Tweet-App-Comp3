import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { Button, Container, Header, Icon, Segment } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import ForgotPassword from "../users/entry/ForgotPassword";
import LoginForm from "../users/entry/LoginForm";
import RegisterForm from "../users/entry/RegisterForm";

const HomePage = () => {
	const { modalStore, userStore } = useStore();
	console.log(userStore.isLoggedIn);
	return (
		<Segment inverted textAlign="center" vertical className="masthead">
			<Container text>
				<Header as="h1" inverted>
					<Icon name="twitter" size="massive" style={{ marginBottom: 12 }} />
					TweetApp
				</Header>
				{userStore.isLoggedIn && !userStore.loggedOut ? (
					<>
						<Header as="h2" inverted content="Welcome to TweetApp" />
						<Button as={Link} to="/tweets" size="huge" inverted>
							Go to tweets!
						</Button>
					</>
				) : (
					<>
						<Button
							onClick={() => modalStore.openModal(<LoginForm />)}
							to="/login"
							size="huge"
							inverted
						>
							Login!
						</Button>
						<Button
							onClick={() => modalStore.openModal(<RegisterForm />)}
							to="/register"
							size="huge"
							inverted
						>
							Register!
						</Button>
						<Button
							onClick={() => modalStore.openModal(<ForgotPassword />)}
							to="/forgotpassword"
							size="huge"
							inverted
						>
							Reset Password
						</Button>
					</>
				)}
			</Container>
		</Segment>
	);
};

export default observer(HomePage);
