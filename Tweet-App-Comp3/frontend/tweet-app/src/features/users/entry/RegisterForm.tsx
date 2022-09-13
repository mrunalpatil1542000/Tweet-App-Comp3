import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { Button, Header } from "semantic-ui-react";
import MyTextInput from "../../../app/common/form/MyTextInput";
import { useStore } from "../../../app/stores/store";
import * as Yup from "yup";
const RegisterForm = () => {
	const { userStore } = useStore();
	const phoneRegExp = /^\d{10}$/;

	const validationSchema = Yup.object({
		firstName: Yup.string().required("This is a required field"),
		lastName: Yup.string().required("This is a required field"),
		email: Yup.string().email().required("This is a required field"),
		password: Yup.string().required("This is a required field"),
		confirmPassword: Yup.string().required("This is a required field"),
		contactNumber: Yup.string()
			.matches(phoneRegExp, "Phone number is not valid")
			.required("This is a required field"),
	});

	return (
		<Formik
			validationSchema={validationSchema}
			initialValues={{
				firstName: "",
				lastName: "",
				email: "",
				password: "",
				confirmPassword: "",
				contactNumber: "",
			}}
			onSubmit={(values) => userStore.register(values)}
		>
			{({ handleSubmit, isSubmitting }) => (
				<Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
					<Header
						as="h2"
						content="SignUp to TweetApp"
						color="teal"
						textAlign="center"
					/>
					<MyTextInput name="firstName" placeholder="firstName" />
					<MyTextInput name="lastName" placeholder="lastName" />
					<MyTextInput name="email" placeholder="email" />
					<MyTextInput name="password" type="password" placeholder="password" />
					<MyTextInput
						name="confirmPassword"
						type="password"
						placeholder="confirmPassword"
					/>
					<MyTextInput name="contactNumber" placeholder="contactNumber" />

					<Button
						loading={isSubmitting}
						positive
						content="Register"
						type="submit"
						fluid
					/>
				</Form>
			)}
		</Formik>
	);
};

export default observer(RegisterForm);
