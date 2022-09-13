import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Button, Header, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { CreateTweet } from "../../../app/models/Tweet";
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyTextArea from "../../../app/common/form/MyTextArea";
import * as Yup from "yup";
import { history } from "../../..";
import { useParams } from "react-router-dom";

const PostMyTweet = () => {
	const { userStore, tweetStore } = useStore();
	const { loading, selectTweet } = tweetStore;
	const [tweet, setTweet] = useState<CreateTweet>({
		id: 0,
		tag: "",
		subject: "",
	});
	const { id } = useParams<{ id: string }>();
	useEffect(() => {
		if (id) {
			selectTweet(+id).then((t) => {
				var updated: CreateTweet = {
					id: t?.id || 0,
					tag: t?.tag,
					subject: t?.subject || "",
				};
				setTweet(updated);
			});
		}
	}, [id, selectTweet]);

	const validationSchema = Yup.object({
		tag: Yup.string().optional(),
		subject: Yup.string().required("This is a required field"),
	});

	const handleFormSubmit = (tweet: CreateTweet) => {
		if (tweet.id) {
			tweetStore
				.updateTweet(userStore.user?.email!, tweet.id, tweet)
				.then(() => history.push("/profiles/" + userStore.user?.email!));
		} else {
			tweetStore
				.createTweet(userStore.user?.email!, tweet)
				.then(() => history.push("/profiles/" + userStore.user?.email!));
		}
	};

	return (
		<Segment clearing>
			<Formik
				enableReinitialize
				validationSchema={validationSchema}
				initialValues={tweet}
				onSubmit={(values) => handleFormSubmit(values)}
			>
				{({ isValid, isSubmitting, handleSubmit }) => (
					<Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
						<Header as="h2" content="Post tweet" color="teal" />
						<MyTextInput name="tag" placeholder="Enter tag...." />
						<MyTextArea
							rows={3}
							name="subject"
							placeholder="Enter subject..."
						/>
						<Button
							type="submit"
							content="submit"
							disabled={!isValid || isSubmitting}
							floated="right"
							color="green"
							loading={loading}
						/>
					</Form>
				)}
			</Formik>
		</Segment>
	);
};

export default observer(PostMyTweet);
