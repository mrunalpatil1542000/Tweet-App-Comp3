import { observer } from "mobx-react-lite";
import { SyntheticEvent, useState } from "react";
import { Button, Card, Grid, Header, Image, Tab } from "semantic-ui-react";
import PhotoUploadWidget from "../../../app/common/imageUpload/PhotoUploadWidget";
import { Photo, User } from "../../../app/models/User";
import { useStore } from "../../../app/stores/store";
interface Props {
	profile: User;
}

const ProfilePhotos = ({ profile }: Props) => {
	const {
		profileStore: {
			isCurrentUser,
			uploadPhoto,
			uploading,
			loading,
			setMainPhoto,
			deletePhoto,
		},
	} = useStore();

	const [addPhotoMode, setAddPhotoMode] = useState(false);

	const [target, setTarget] = useState("");
	const handlePhotoUpload = (file: Blob) => {
		uploadPhoto(file).then(() => setAddPhotoMode(false));
	};

	const handleSetMainPhoto = (
		photo: Photo,
		e: SyntheticEvent<HTMLButtonElement>
	) => {
		setTarget(e.currentTarget.name);
		setMainPhoto(photo);
	};

	const handleDeletePhoto = (
		photo: Photo,
		e: SyntheticEvent<HTMLButtonElement>
	) => {
		setTarget(e.currentTarget.name);
		deletePhoto(photo);
	};
	return (
		<Tab.Pane>
			<Grid>
				<Grid.Column width={16}>
					<Header icon="image" floated="left" content="Photos" />
					{isCurrentUser && (
						<Button
							floated="right"
							basic
							content={addPhotoMode ? "Cancel" : "Add Photo"}
							onClick={() => setAddPhotoMode(!addPhotoMode)}
						/>
					)}
				</Grid.Column>
				<Grid.Column width={16}>
					{addPhotoMode ? (
						<PhotoUploadWidget
							uploadPhoto={handlePhotoUpload}
							loading={uploading}
						/>
					) : (
						<Card.Group itemsPerRow={5}>
							{profile.photos &&
								profile.photos.map((photo) => {
									return (
										<Card key={photo.id}>
											<Image key={photo.id} src={photo.url} />
											{isCurrentUser && (
												<Button.Group fluid widths={2}>
													<Button
														basic
														color="green"
														content="Main"
														name={"main" + photo.id}
														loading={
															target === "main" + photo.id.toString() && loading
														}
														disabled={photo.isMain}
														onClick={(e) => handleSetMainPhoto(photo, e)}
													/>
													<Button
														basic
														color="red"
														icon="trash"
														loading={target === photo.id.toString() && loading}
														onClick={(e) => handleDeletePhoto(photo, e)}
														disabled={photo.isMain}
														name={photo.id}
													/>
												</Button.Group>
											)}
										</Card>
									);
								})}
						</Card.Group>
					)}
				</Grid.Column>
			</Grid>
		</Tab.Pane>
	);
};

export default observer(ProfilePhotos);
