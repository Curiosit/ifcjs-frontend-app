import { getApp } from "firebase/app";
import { Building } from "../map/types";
import { getDownloadURL, getStorage, ref } from "firebase/storage";

export class BuildingDatabase {
    async getModels(building: Building) {
        const appInstance = getApp();
        const storageInstance = getStorage(appInstance);

        const urls: string[] = [];

        for(const model of building.models) {
            const fileRef = ref(storageInstance, model.id);
            const fileUrl = await getDownloadURL(fileRef);
            urls.push(fileUrl);
        }

        return urls;
    }
}