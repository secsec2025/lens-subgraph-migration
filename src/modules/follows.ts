import {Follow} from "../model";
import {EntityCache} from "../entity-cache";

export namespace follows {
  export async function getOrCreateFollow(accountAddress: string, entityCache: EntityCache): Promise<Follow> {
    let follow = await entityCache.getFollow(accountAddress);
    if (!follow) {
      follow = new Follow({
        id: accountAddress
      });
    }
    return follow;
  }
}
