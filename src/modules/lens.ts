import {Stat} from "../model";
import {LENS_ID} from "../constants";
import {EntityCache} from "../entity-cache";


export namespace stats {
  export async function getOrCreateLensInfo(entityCache: EntityCache): Promise<Stat> {
    let statInfo = await entityCache.getStats(LENS_ID);
    if (!statInfo) {
      statInfo = new Stat({
        id: LENS_ID,
        totalAccounts: 0n,
        totalProfiles: 0n,
        totalPosts: 0n,
        totalMirror: 0n,
        totalPublications: 0n,
        totalComments: 0n
      });
      entityCache.saveStats(statInfo);
    }
    return statInfo;
  }
}
