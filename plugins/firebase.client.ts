import { initializeApp, type FirebaseApp } from "firebase/app";
import { getAnalytics, type Analytics } from "firebase/analytics";
import {
  Firestore,
  doc,
  documentId,
  getDoc,
  getFirestore,
  setDoc,
} from "firebase/firestore";

import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
  type FirebaseStorage,
} from "firebase/storage";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();

  const firebaseConfig: any = {
    apiKey: config.public.firebaseApiKey,
    authDomain: config.public.firebaseAuthDomain,
    projectId: config.public.firebaseProjectId,
    storageBucket: config.public.firebaseStorageBucket,
    messagingSenderId: config.public.firebaseMessagingSenderId,
    appId: config.public.firebaseAppId,
    measurementId: config.public.firebaseMeasurementId,
  };

  // Initialize Firebase
  const app: FirebaseApp = initializeApp(firebaseConfig);
  const analytics: Analytics = getAnalytics(app);
  const db: Firestore = getFirestore(app);
  const storage: FirebaseStorage = getStorage(app);

  const uploadData = async (
    documentId: string,
    videoBlob: Blob,
    title: string,
    fromName: string,
    toName: string,
    message: string
  ): Promise<void> => {
    try {
      console.log('upload')
      console.log(documentId)
      console.log(videoBlob)
      console.log(title)
      console.log(fromName)
      console.log(toName)
      console.log(message)
      // Storageに動画をアップロード
      const fileRef = storageRef(storage, `videos/${documentId}`);
      console.log(fileRef)
      const snapshot = await uploadBytes(fileRef, videoBlob);
      const videoUrl: string = await getDownloadURL(snapshot.ref);
      console.log(videoUrl)

      // Firestoreにデータをセット
      const docRef = doc(db, "gifts", documentId);
      await setDoc(docRef, {
        videoUrl,
        title,
        fromName,
        toName,
        message,
      });
      alert("データが正常にアップロードされました");
    } catch (error) {
      alert("アップロード中にエラーが発生しました: ");
      console.log("ERROR: ", error);
    }
  };

  const getStoreData = async (documentId: string) => {
    const docRef = doc(db, "gifts", documentId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      alert("データが存在しません");
      return null;
    }
  };

  return {
    provide: {
      uploadData,
      getStoreData,
    },
  };
});
