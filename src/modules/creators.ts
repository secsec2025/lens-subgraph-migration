import {Creator} from "../model";
import {EntityCache} from "../entity-cache";

export namespace creators {
  export async function getOrCreateCreator(accountAddress: string, timeStamp: bigint, entityCache: EntityCache): Promise<Creator> {
    let creatorId = accountAddress;

    let creator = await entityCache.getCreator(creatorId);
    if (!creator) {
      creator = new Creator({
        id: creatorId,
        address: accountAddress,
        isWhitelisted: false,
        lastUpdated: timeStamp
      });
      entityCache.saveCreator(creator);
    }
    return creator;
  }
}
