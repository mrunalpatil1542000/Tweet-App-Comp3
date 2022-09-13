import { Header, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";

const AboutUser = () => {
	const {
		userStore: { user },
	} = useStore();
	return (
		<Segment>
			<Header icon={"user"} as="h3" content={`About ${user?.firstName}`} />
			<hr />
			<p>
				Full Name: {user?.firstName} {user?.lastName}
			</p>
			<p>Contact No.: {user?.contactNumber}</p>
			<p>Email :{user?.email}</p>
		</Segment>
	);
};

export default AboutUser;
