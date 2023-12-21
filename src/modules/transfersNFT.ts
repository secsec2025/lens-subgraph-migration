import {FollowNFTTransferred} from "../model";
import {EntityCache} from "../entity-cache";


export namespace transfersNFT {
  export async function getOrCreateTransfersNFT(transferId: string, entityCache: EntityCache): Promise<FollowNFTTransferred> {
    let nft = await entityCache.getFollowNFTTransfer(transferId);
    if (!nft) {
      nft = new FollowNFTTransferred({
        id: transferId
      })
      entityCache.saveFollowNFTTransfer(nft);
    }
    return nft;
  }
}
