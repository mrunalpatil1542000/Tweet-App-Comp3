import { createContext, useContext } from "react";
import CommonStore from "./commonStore";
import ModalStore from "./modalStore";
import ProfileStore from "./profileStore";
import TweetStore from "./tweetStore";
import UserStore from "./userStore";

interface Store {
	userStore: UserStore;
	commonStore: CommonStore;
	modalStore: ModalStore;
	tweetStore: TweetStore;
	profileStore: ProfileStore;
}

export const store: Store = {
	userStore: new UserStore(),
	commonStore: new CommonStore(),
	modalStore: new ModalStore(),
	tweetStore: new TweetStore(),
	profileStore: new ProfileStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
	return useContext(StoreContext);
}
