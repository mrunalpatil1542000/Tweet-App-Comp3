import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { Button, Header } from "semantic-ui-react";
import MyTextInput from "../../../app/common/form/MyTextInput";
import { useStore } from "../../../app/stores/store";
import * as Yup from "yup";

const LoginForm = () => {
	const { userStore } = useStore();
	const validationSchema = Yup.object({
		username: Yup.string().email().required("This is a required field"),
		password: Yup.string().required("This is a required field"),
	});
	return (
		<Formik
			enableReinitialize
			validationSchema={validationSchema}
			initialValues={{ username: "", password: "" }}
			onSubmit={(values) => userStore.login(values)}
		>
			{({ handleSubmit, isSubmitting, isValid }) => (
				<Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
					<Header
						as="h2"
						content="Login to TweetApp"
						color="teal"
						textAlign="center"
					/>
					<MyTextInput name="username" placeholder="username" />
					<MyTextInput name="password" type="password" placeholder="password" />
					<Button
						loading={isSubmitting}
						positive
						content="Login"
						type="submit"
						fluid
						disabled={!isValid}
					/>
				</Form>
			)}
		</Formik>
	);
};

export default observer(LoginForm);
