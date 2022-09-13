import { Formik, Form } from "formik";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Button } from "semantic-ui-react";
import MyTextArea from "../../../app/common/form/MyTextArea";
import { useStore } from "../../../app/stores/store";

const TweetDetailedChatForm = () => {
	const { userStore, tweetStore } = useStore();
	useEffect(() => {
		if (tweetStore.commentsRegistry.size <= 1 && tweetStore.loadComment) {
			tweetStore.loadComments();
		}
	}, [
		tweetStore.commentsRegistry.size,
		tweetStore.loadComments,
		tweetStore.loading,
		tweetStore.loadingInitial,
		tweetStore.loadComment,
	]);

	return (
		<Formik
			onSubmit={(values, { resetForm }) =>
				tweetStore
					.postAComment(values, userStore.user!, tweetStore.selectedTweet?.id!)
					.then(() => resetForm())
			}
			initialValues={{ message: "" }}
		>
			{({ isSubmitting, isValid }) => (
				<Form className="ui form">
					<MyTextArea placeholder={"message"} name={"message"} rows={2} />
					<Button
						loading={isSubmitting}
						disabled={isSubmitting || !isValid}
						content="Add Reply"
						labelPosition="left"
						icon="edit"
						primary
						floated="right"
						type="submit"
					/>
				</Form>
			)}
		</Formik>
	);
};

export default observer(TweetDetailedChatForm);
