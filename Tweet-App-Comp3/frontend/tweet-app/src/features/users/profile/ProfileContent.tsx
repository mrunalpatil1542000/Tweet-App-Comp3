import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Tab } from "semantic-ui-react";
import { User } from "../../../app/models/User";
import { useStore } from "../../../app/stores/store";
import AboutUser from "./AboutUser";
import GetAllTweetsOfUser from "./GetAllTweetsOfUser";
import ProfilePhotos from "./ProfilePhotos";
interface Props {
	profile: User;
}
const ProfileContent = ({ profile }: Props) => {
	const panes = [
		{ menuItem: "About", render: () => <AboutUser /> },
		{ menuItem: "Photos", render: () => <ProfilePhotos profile={profile} /> },
		{
			menuItem: "Tweets",
			render: () => <GetAllTweetsOfUser username={profile.email} />,
		},
	];
	const { tweetStore } = useStore();
	const {
		loadAllTweets,
		selectTweet,
		tweetRegistry,
		selectedTweet,
		loadingInitial,
	} = tweetStore;
	useEffect(() => {
		if (tweetStore.tweetRegistry.size <= 1 || tweetStore.editMode)
			tweetStore.loadAllTweets();
	}, [
		tweetRegistry.size,
		tweetStore.editMode,
		tweetStore.loading,
		loadAllTweets,
		loadingInitial,
		selectedTweet,
		selectTweet,
	]);
	return (
		<Tab
			menu={{ fluid: true, vertical: true }}
			menuPosition="right"
			panes={panes}
		/>
	);
};

export default observer(ProfileContent);
