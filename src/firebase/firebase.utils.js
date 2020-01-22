import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
	apiKey: "AIzaSyCnBAI8M-TFbofy6qCVcwQT2VtuwfqZGTI",
	authDomain: "crwn-clothing-12a36.firebaseapp.com",
	databaseURL: "https://crwn-clothing-12a36.firebaseio.com",
	projectId: "crwn-clothing-12a36",
	storageBucket: "crwn-clothing-12a36.appspot.com",
	messagingSenderId: "943900917733",
	appId: "1:943900917733:web:40705e09f7e7a3d118b90c"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
	if (!userAuth) return;

	const userRef = firestore.doc(`users/${userAuth.uid}`);
	const snapShot = await userRef.get();

	console.log(snapShot);

	if (!snapShot.exists) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();

		try {
			await userRef.set({
				displayName,
				email,
				createdAt,
				...additionalData
			});
		} catch (error) {
			console.log("error creating user");
		}
	}

	return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
