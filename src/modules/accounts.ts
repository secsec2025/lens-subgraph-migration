import { stats } from './lens';
import {EntityCache} from "../entity-cache";
import {Account} from "../model";

export namespace accounts {
  export async function getOrCreateAccount(accountAddress: string, entityCache: EntityCache): Promise<Account> {
    let accountId = accountAddress;

    let account = await entityCache.getAccount(accountId);
    if (!account) {
      account = new Account({
        id: accountId,
        address: accountAddress,
        totalFollowings: 0n,
        profilesIds: new Array<string>()
      });

      // +1 amount of lens profiles
      let lensInfo = await stats.getOrCreateLensInfo(entityCache);
      lensInfo.totalAccounts = lensInfo.totalAccounts + 1n;
      entityCache.saveStats(lensInfo);
    }
    return account;
  }

  export function getListProfileOwned(account: Account, profileId: bigint): Array<string> {
    let newListProfiles = account.profilesIds;
    newListProfiles.push(profileId.toString());
    account.profilesIds = newListProfiles;
    return newListProfiles;
  }
}
