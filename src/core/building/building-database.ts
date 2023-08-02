import { getApp } from "firebase/app";
import { Building } from "../map/types";
import { FirebaseStorage, getDownloadURL, getStorage, ref } from "firebase/storage";
import { ModelDatabase } from "./dexie-utils";

export class BuildingDatabase {
    private db = new ModelDatabase();
        
   
    async getModels(building: Building) {
        this.db.open();
        const appInstance = getApp();
        const storageInstance = getStorage(appInstance);

        const urls: string[] = [];
        
        for(const model of building.models) {

            
            const url = await this.getModelURL(storageInstance, model.id);
            urls.push(url); 
        }

        this.db.close();

        return urls;
    }

    private async getModelURL(storageInstance: FirebaseStorage, id: string) {
        if(this.isModelCached(id)) {
            return this.getModelFromLocalCache(id);
        } else {
            return this.getModelFromFirebaseStorage(storageInstance, id);
        }
    }

    private async getModelFromFirebaseStorage(storageInstance: FirebaseStorage, id: string) {
        const fileRef = ref(storageInstance, id);
        const fileUrl = await getDownloadURL(fileRef);
        await this.cacheModel(id, fileUrl);
        console.log("Firebase model and cahced to dexie");
        return fileUrl;
    }

    private isModelCached(id:string) {
        const stored = localStorage.getItem(id);
        return stored !== null;
    }
    private async getModelFromLocalCache(id:string) {
        const found = await this.db.models.where("id").equals(id).toArray();
        const file = found[0].file;
        console.log("Dexie model");
        return URL.createObjectURL(file);
    }
    private async cacheModel(id:string, url:string) {
        const time = performance.now().toString();
        localStorage.setItem(id, time);
        const rawData = await fetch(url);
        const file = await rawData.blob();
        await this.db.models.add({
            id, file,
        });
    }
    async clearCache(building: Building) {
        await this.db.open();
        for(const model of building.models) {
            localStorage.removeItem(model.id);
        }

        await this.db.delete();
        this.db = new ModelDatabase();
        this.db.close();
    }

    async deleteModels(ids: string[]) {
        await this.db.open();
        for(const id of ids) {
            if (this.isModelCached(id)) {
                localStorage.removeItem(id);
                await this.db.models.where("id").equals(id).delete();
    
            }
        }
        
    }
}