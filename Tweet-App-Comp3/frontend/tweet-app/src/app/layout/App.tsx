import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Route, useLocation } from "react-router-dom";
import { Container } from "semantic-ui-react";
import HomePage from "../../features/home/HomePage";
import TweetDetails from "../../features/tweets/details/TweetDetails";
import TweetsDashboard from "../../features/tweets/dashboard/TweetsDashboard";
import UsersDashboard from "../../features/users/list/UsersDashboard";
import LoginForm from "../../features/users/entry/LoginForm";
import PostMyTweet from "../../features/users/profile/PostMyTweet";
import ModalContainer from "../common/modal/ModalContainer";
import { useStore } from "../stores/store";
import LoadingComponent from "./LoadingComponent";
import NavBar from "./NavBar";
import ProfilePage from "../../features/users/profile/ProfilePage";
import ForgotPassword from "../../features/users/entry/ForgotPassword";

function App() {
	const { commonStore, userStore } = useStore();
	const location = useLocation();
	useEffect(() => {
		if (commonStore.token) {
			userStore.getUser().finally(() => commonStore.setAppLoaded());
		} else {
			commonStore.setAppLoaded();
		}
	}, [commonStore, userStore]);

	if (!commonStore.appLoaded)
		return <LoadingComponent content="Loading app..." />;

	return (
		<>
			<ModalContainer />
			<Route exact path="/" component={HomePage}></Route>
			<Route
				path={"/(.+)"}
				render={() => (
					<>
						<NavBar />
						<Container style={{ marginTop: "7em" }}>
							<Route exact path="/login" component={LoginForm} />
							<Route exact path="/forgotPassword" component={ForgotPassword} />
							<Route exact path="/tweets" component={TweetsDashboard} />
							<Route path="/details/:id" component={TweetDetails} />
							<Route exact path="/allUsers" component={UsersDashboard} />
							<Route path="/profiles/:username" component={ProfilePage} />
							<Route
								key={location.key}
								path={["/post-tweet", "/update-tweet/:id"]}
								component={PostMyTweet}
							/>
						</Container>
					</>
				)}
			/>
		</>
	);
}

export default observer(App);
