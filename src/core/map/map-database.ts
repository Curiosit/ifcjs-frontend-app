import { Building } from "./types";
import { getApp } from "firebase/app";
import { User } from "firebase/auth";
import {
    addDoc,
    collection,
    getFirestore,
    onSnapshot,
    query,
    where,
  } from "firebase/firestore";
export class MapDatabase {
    private readonly buildings = "buildings";

    async add(building: Building) {
        const dbInstance = getFirestore(getApp());
        const {userID, lat, lng, id, buildingName} = building;
        console.log(this.buildings);
        const result = await addDoc(collection(dbInstance, this.buildings),{ 
          userID, lat, lng, id, buildingName,
        });
        console.log({ 
          userID, lat, lng, id, buildingName,
        });
        return result.id;
    }
    async getBuildings(user: User) {
        const dbInstance = getFirestore(getApp());
        const q = query(
          collection(dbInstance, this.buildings),
          where("userID", "==", user.uid)
        );
    
        return new Promise<Building[]>((resolve) => {
          const unsubscribe = onSnapshot(q, (snapshot) => {
            const result: Building[] = [];
            snapshot.docs.forEach((doc) => {
              result.push({ ...(doc.data() as Building), id: doc.id });
            });
            unsubscribe();
            resolve(result);
          });
        });
      }
}