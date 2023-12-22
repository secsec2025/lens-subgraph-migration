import {EntityCache} from "../entity-cache";
import {profiles} from "../modules/profiles";
import {accounts} from "../modules/accounts";
import {creators} from "../modules/creators";
import {publications} from "../modules/publications";
import {stats} from "../modules/lens";
import {follows} from "../modules/follows";
import {Account, AccountProfileFollow, FollowProfile} from "../model";
import {ZERO_ADDRESS} from "../constants";
import assert from "assert";
import {transfersNFT} from "../modules/transfersNFT";

export const handleProfileCreated = async (eventData: ProfileCreatedEventData, logEvent: any, entityCache: EntityCache) => {
    const eventData_creator = eventData.creator.toLowerCase();
    const eventData_to = eventData.to.toLowerCase();
    const eventData_followModule = eventData.followModule.toLowerCase();

    const profile = await profiles.getOrCreateProfile(eventData.profileId, eventData.timestamp, entityCache);
    const creator = await creators.getOrCreateCreator(eventData_creator, eventData.timestamp, entityCache);
    const to = await accounts.getOrCreateAccount(eventData_to, entityCache);
    to.profilesIds = accounts.getListProfileOwned(to, eventData.profileId);

    profile.creatorId =eventData_creator;
    profile.ownerId = eventData_to;
    profile.followNFTURI = eventData.followNFTURI;
    profile.followModule = eventData_followModule;
    profile.handle = eventData.handle;
    profile.followModuleReturnData = eventData.followModuleReturnData;
    profile.imageURI = eventData.imageURI;
    profile.lastUpdated = eventData.timestamp;

    entityCache.saveCreator(creator);
    entityCache.saveAccount(to);
    entityCache.saveProfile(profile);
}


export const handleFollowNFTURISet = async (eventData: FollowNFTURISetEventData, logEvent: any, entityCache: EntityCache) => {
    const profile = await profiles.getOrCreateProfile(eventData.profileId, eventData.timestamp, entityCache);
    profile.followNFTURI = eventData.followNFTURI;
    entityCache.saveProfile(profile);
}


export const handleProfileImageURISet = async (eventData: ProfileImageURISetEventData, logEvent: any, entityCache: EntityCache) => {
    const profile = await profiles.getOrCreateProfile(eventData.profileId, eventData.timestamp, entityCache);
    profile.imageURI = eventData.imageURI;
    entityCache.saveProfile(profile);
}


export const handleDispatcherSet = async (eventData: DispatcherSetEventData, logEvent: any, entityCache: EntityCache) => {
    const profile = await profiles.getOrCreateProfile(eventData.profileId, eventData.timestamp, entityCache);
    profile.dispatcher = eventData.dispatcher.toLowerCase();
    entityCache.saveProfile(profile);
}


export const handleProfileCreatorWhitelisted = async (eventData: ProfileCreatorWhitelistedEventData, logEvent: any, entityCache: EntityCache) => {
    const creator = await creators.getOrCreateCreator(eventData.profileCreator.toLowerCase(), eventData.timestamp, entityCache);
    creator.isWhitelisted = eventData.whitelisted;
    creator.lastUpdated = eventData.timestamp;
    entityCache.saveCreator(creator);
}


export const handleFollowModuleSet = async (eventData: FollowModuleSetEventData, logEvent: any, entityCache: EntityCache) => {
    const profile = await profiles.getOrCreateProfile(eventData.profileId, eventData.timestamp, entityCache);
    profile.followModule = eventData.followModule.toLowerCase();
    profile.followModuleReturnData = eventData.followModuleReturnData;
    entityCache.saveProfile(profile);
}


export const handlePostCreated = async (eventData: PostCreatedEventData, contentURI: string, logEvent: any, entityCache: EntityCache) => {
    const post = await publications.getOrCreatePost(eventData.profileId, eventData.pubId, entityCache);

    post.fromProfileId = eventData.profileId.toString();
    post.pubId = eventData.pubId;
    post.referenceModule = eventData.referenceModule.toLowerCase();
    post.referenceModuleReturnData = eventData.referenceModuleReturnData;
    post.timestamp = eventData.timestamp;
    post.contentURI = contentURI;
    post.collectModule = eventData.collectModule.toLowerCase();
    post.collectModuleReturnData = eventData.collectModuleReturnData;

    const stat = await stats.getOrCreateLensInfo(entityCache);
    stat.lastPostCreatedAt = eventData.timestamp;
    entityCache.saveStats(stat);
    entityCache.savePost(post);
}

export const handleMirrorCreated = async (eventData: MirrorCreatedEventData, logEvent: any, entityCache: EntityCache) => {
    const mirror = await publications.getOrCreateMirror(eventData.profileId, eventData.pubId, entityCache);

    mirror.fromProfileId = eventData.profileId.toString();
    mirror.pubId = eventData.pubId;
    mirror.referenceModule = eventData.referenceModule.toLowerCase();
    mirror.referenceModuleReturnData = eventData.referenceModuleReturnData;
    mirror.timestamp = eventData.timestamp;
    mirror.profileIdPointed = eventData.profileIdPointed;
    mirror.pubIdPointed = eventData.pubIdPointed;

    const stat = await stats.getOrCreateLensInfo(entityCache);
    stat.lastMirrorCreatedAt = eventData.timestamp;
    entityCache.saveStats(stat);
    entityCache.saveMirror(mirror);
}


export const handleCommentCreated = async (eventData: CommentCreatedEventData, contentURI: string, logEvent: any, entityCache: EntityCache) => {
    const comment = await publications.getOrCreateComment(eventData.profileId, eventData.pubId, entityCache);

    comment.fromProfileId = eventData.profileId.toString();
    comment.pubId = eventData.pubId;
    comment.referenceModule = eventData.referenceModule.toLowerCase();
    comment.referenceModuleReturnData = eventData.referenceModuleReturnData;
    comment.timestamp = eventData.timestamp;
    comment.contentURI = contentURI;
    comment.profileIdPointed = eventData.profileIdPointed;
    comment.pubIdPointed = eventData.pubIdPointed;
    comment.collectModule = eventData.collectModule.toLowerCase();
    comment.collectModuleReturnData = eventData.collectModuleReturnData;

    const stat = await stats.getOrCreateLensInfo(entityCache);
    stat.lastCommentCreatedAt = eventData.timestamp;
    entityCache.saveStats(stat);
    entityCache.saveComment(comment);
}


export const handleFollowed = async (eventData: FollowedEventData, logEvent: any, entityCache: EntityCache) => {
    const newFollows: string[] = eventData.profileIds.map<string>((profileId: bigint): string => profileId.toString());
    const eventData_follower = eventData.follower.toLowerCase();

    const follow = await follows.getOrCreateFollow(`${eventData_follower}-${logEvent.transactionHash}`, entityCache);
    follow.fromAccountId = eventData_follower;
    follow.fromProfileSTR = eventData_follower;
    follow.timestamp = eventData.timestamp;
    entityCache.saveFollow(follow);

    // save toProfiles
    for (let i = 0; i < newFollows.length; i++) {
        const followedProfileId = newFollows[i];
        entityCache.saveFollowProfile(new FollowProfile({
            id: `${eventData_follower}-${logEvent.transactionHash}-${followedProfileId}`,
            followId: follow.id,
            profileId: followedProfileId
        }));
    }
}


export const handleFollowNFTTransferred = async (eventData: FollowNFTTransferredEventData, logEvent: any, entityCache: EntityCache) => {
    const transferId: string = `${eventData.profileId.toString()}-${logEvent.transactionHash}`;
    let from = eventData.from.toLowerCase();
    let to = eventData.to.toLowerCase();
    let profile = await profiles.getOrCreateProfile(eventData.profileId, eventData.timestamp, entityCache);

    if (from === ZERO_ADDRESS) {
        // MINT FOLLOW NFT
        let toAccount = await accounts.getOrCreateAccount(to, entityCache);

        //add and count the follower to the profile and the fromAccount
        profile.totalFollowers = profile.totalFollowers + 1n;
        toAccount.totalFollowings = toAccount.totalFollowings + 1n;
        entityCache.saveAccountProfileFollow(new AccountProfileFollow({
            id: `${toAccount.id}-${profile.id}`,
            profileId: profile.id,
            accountId: toAccount.id,
            isDeleted: false
        }));

        await profiles.updateProfilesFollowings(toAccount.profilesIds, profile.id, toAccount.totalFollowings, false, entityCache);
        entityCache.saveAccount(toAccount);

    } else if (to === ZERO_ADDRESS) {
        // BURN FOLLOW NFT
        let fromAccount = await accounts.getOrCreateAccount(from, entityCache);
        profile.totalFollowers = profile.totalFollowers - 1n;
        fromAccount.totalFollowings = fromAccount.totalFollowings - 1n;

        //minus and count the follower to the profile and the fromAccount
        const accountProfileFollowRecord = await entityCache.getAccountProfileFollow(`${fromAccount.id}-${profile.id}`);
        //assert(accountProfileFollowRecord, `accountProfileFollowRecord for ${fromAccount.id} with profile ${profile.id} should exist at this point.`);
        if (accountProfileFollowRecord) {
            accountProfileFollowRecord.isDeleted = true;
            entityCache.saveAccountProfileFollow(accountProfileFollowRecord);
        }

        await profiles.updateProfilesFollowings(fromAccount.profilesIds, profile.id, fromAccount.totalFollowings, true, entityCache);
        entityCache.saveAccount(fromAccount);
    }

    entityCache.saveProfile(profile);

    const nft = await transfersNFT.getOrCreateTransfersNFT(transferId, entityCache);
    nft.from = from;
    nft.to = to;
    nft.timestamp = eventData.timestamp;
    nft.followNFTID = eventData.followNFTId;
    nft.profileId = eventData.profileId;
    entityCache.saveFollowNFTTransfer(nft);
}


export const handleDefaultProfileSetEvents = async (eventsData: DefaultProfileSetEventData[], entityCache: EntityCache) => {
    const updatedAccountsMap: Map<string,Account> = new Map<string, Account>();

    for (let i = 0; i < eventsData.length; i++) {
        const eventData = eventsData[i];
        let account = await accounts.getOrCreateAccount(eventData.wallet.toLowerCase(), entityCache);
        account.defaultProfileId = eventData.profileId.toString();
        updatedAccountsMap.set(account.id, account);
        entityCache.saveAccount(account);
    }
    await entityCache.saveDefaultProfileSetAccounts([...updatedAccountsMap.values()]);
}
