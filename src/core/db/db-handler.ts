import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import { Events } from "../../middleware/event-handler";
import { Building, Model } from "../map/types";
import { deleteDoc, getFirestore, doc, updateDoc } from "firebase/firestore";
import { getApp } from "firebase/app";
import {deleteObject, getStorage, ref, uploadBytes} from "firebase/storage";
export const databaseHandler = {
  login: () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  },

  logout: () => {
    const auth = getAuth();
    signOut(auth);
  },

  deleteBuilding: async (building: Building, events: Events) => {
    const id = building.id;
    const dbinstance = getFirestore(getApp());
    await deleteDoc(doc(dbinstance, "buildings", building.id));
    events.trigger({type: "CLOSE_BUILDING"});
  },

  updateBuilding: async (building: Building) => {
    const dbinstance = getFirestore(getApp());
    await updateDoc(doc(dbinstance, "buildings", building.id), {
      ...building,
    });
    

  },


  uploadModel: async (model: Model, file:File, building:Building, events:Events) => {
    const appInstance = getApp();
    const storageInstance = getStorage(appInstance);
    const fileRef = ref(storageInstance, model.id);
    await uploadBytes(fileRef, file);
    events.trigger({type: "UPDATE_BUILDING", payload: building});
    
  },
  deleteModel: async (model: Model, building:Building, events:Events) => {
    const appInstance = getApp();
    const storageInstance = getStorage(appInstance);
    const fileRef = ref(storageInstance, model.id);
    await deleteObject(fileRef);
    events.trigger({type: "UPDATE_BUILDING", payload: building});
    
  }
};
