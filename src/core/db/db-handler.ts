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
    console.log(ids);
    await buildingHandler.deleteModels(ids);
    console.log("CLOSE_BUILDING");
    events.trigger({type: "CLOSE_BUILDING"});
  },

  updateBuilding: async (building: Building) => {
    const dbinstance = getFirestore(getApp());
    console.log(building);
    const result = await updateDoc(doc(dbinstance, "buildings", building.id), {
      ...building,
    });
    console.log(result);
    

  },


  uploadModel: async (model: Model, file:File, building:Building, events:Events) => {
    const appInstance = getApp();
    const storageInstance = getStorage(appInstance);
    console.log(storageInstance);
    const fileRef = ref(storageInstance, model.id);
    const result = await uploadBytes(fileRef, file);
    console.log(result);
    await buildingHandler.refreshModels(building,events);
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
    await buildingHandler.refreshModels(building, events);
    console.log(building);
    events.trigger({type: "UPDATE_BUILDING", payload: building});
    
  }
};
