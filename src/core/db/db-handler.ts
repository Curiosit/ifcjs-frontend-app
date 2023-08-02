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
import { buildingHandler } from "../building/building-handler";
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
    const appInstance = getApp();
    const storageInstance = getStorage(appInstance);
    await deleteDoc(doc(dbinstance, "buildings", building.id));
    const ids: string[] = [];
    for (const model of building.models) {
      const fileRef = ref(storageInstance, model.id);
      await deleteObject(fileRef);
      ids.push(model.id);
    }
    await buildingHandler.deleteModels(ids);
    events.trigger({type: "CLOSE_BUILDING"});
  },

  updateBuilding: async (building: Building) => {
    const dbinstance = getFirestore(getApp());
    console.log(building);
    await updateDoc(doc(dbinstance, "buildings", building.id), {
      ...building,
    });
    

  },


  uploadModel: async (model: Model, file:File, building:Building, events:Events) => {
    const appInstance = getApp();
    const storageInstance = getStorage(appInstance);
    const fileRef = ref(storageInstance, model.id);
    await uploadBytes(fileRef, file);
    await buildingHandler.refreshModels(building);
    events.trigger({type: "UPDATE_BUILDING", payload: building});
    
  },
  deleteModel: async (model: Model, building:Building, events:Events) => {
    console.log(model);
    console.log(building);
    const appInstance = getApp();
    const storageInstance = getStorage(appInstance);
    console.log(model.id);
    const fileRef = ref(storageInstance, model.id);
    await deleteObject(fileRef);
    await buildingHandler.deleteModels([model.id]);
    await buildingHandler.refreshModels(building);
    console.log(building);
    events.trigger({type: "UPDATE_BUILDING", payload: building});
    
  }
};
