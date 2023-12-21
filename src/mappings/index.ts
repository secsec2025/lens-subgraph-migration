import {EntityCache} from "../entity-cache";
import {profiles} from "../modules/profiles";
import {accounts} from "../modules/accounts";
import {creators} from "../modules/creators";
import {publications} from "../modules/publications";
import {stats} from "../modules/lens";

export const handleProfileCreated =async (eventData: ProfileCreatedEventData, logEvent: any, entityCache: EntityCache) => {
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


export const handleFollowNFTURISet =async (eventData: FollowNFTURISetEventData, logEvent: any, entityCache: EntityCache) => {
    const profile = await profiles.getOrCreateProfile(eventData.profileId, eventData.timestamp, entityCache);
    profile.followNFTURI = eventData.followNFTURI;
    entityCache.saveProfile(profile);
}


export const handleProfileImageURISet =async (eventData: ProfileImageURISetEventData, logEvent: any, entityCache: EntityCache) => {
    const profile = await profiles.getOrCreateProfile(eventData.profileId, eventData.timestamp, entityCache);
    profile.imageURI = eventData.imageURI;
    entityCache.saveProfile(profile);
}


export const handleDispatcherSet =async (eventData: DispatcherSetEventData, logEvent: any, entityCache: EntityCache) => {
    const profile = await profiles.getOrCreateProfile(eventData.profileId, eventData.timestamp, entityCache);
    profile.dispatcher = eventData.dispatcher.toLowerCase();
    entityCache.saveProfile(profile);
}


export const handleProfileCreatorWhitelisted =async (eventData: ProfileCreatorWhitelistedEventData, logEvent: any, entityCache: EntityCache) => {
    const creator = await creators.getOrCreateCreator(eventData.profileCreator.toLowerCase(), eventData.timestamp, entityCache);
    creator.isWhitelisted = eventData.whitelisted;
    creator.lastUpdated = eventData.timestamp;
    entityCache.saveCreator(creator);
}


export const handleFollowModuleSet =async (eventData: FollowModuleSetEventData, logEvent: any, entityCache: EntityCache) => {
    const profile = await profiles.getOrCreateProfile(eventData.profileId, eventData.timestamp, entityCache);
    profile.followModule = eventData.followModule.toLowerCase();
    profile.followModuleReturnData = eventData.followModuleReturnData;
    entityCache.saveProfile(profile);
}


export const handlePostCreated =async (eventData: PostCreatedEventData, logEvent: any, entityCache: EntityCache) => {
    const post = await publications.getOrCreatePost(eventData.profileId, eventData.pubId, entityCache);

    post.fromProfileId = eventData.profileId.toString();
    post.pubId = eventData.pubId;
    post.referenceModule = eventData.referenceModule.toLowerCase();
    post.referenceModuleReturnData = eventData.referenceModuleReturnData;
    post.timestamp = eventData.timestamp;
    post.contentURI = eventData.contentURI;
    post.collectModule = eventData.collectModule.toLowerCase();
    post.collectModuleReturnData = eventData.collectModuleReturnData;

    const stat = await stats.getOrCreateLensInfo(entityCache);
    stat.lastPostCreatedAt = eventData.timestamp;
    entityCache.saveStats(stat);
    entityCache.savePost(post);
}

export const handleMirrorCreated =async (eventData: MirrorCreatedEventData, logEvent: any, entityCache: EntityCache) => {
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


export const handleCommentCreated =async (eventData: CommentCreatedEventData, logEvent: any, entityCache: EntityCache) => {
    const comment = await publications.getOrCreateComment(eventData.profileId, eventData.pubId, entityCache);

    comment.fromProfileId = eventData.profileId.toString();
    comment.pubId = eventData.pubId;
    comment.referenceModule = eventData.referenceModule.toLowerCase();
    comment.referenceModuleReturnData = eventData.referenceModuleReturnData;
    comment.timestamp = eventData.timestamp;
    comment.contentURI = eventData.contentURI;
    comment.profileIdPointed = eventData.profileIdPointed;
    comment.pubIdPointed = eventData.pubIdPointed;
    comment.collectModule = eventData.collectModule.toLowerCase();
    comment.collectModuleReturnData = eventData.collectModuleReturnData;

    const stat = await stats.getOrCreateLensInfo(entityCache);
    stat.lastCommentCreatedAt = eventData.timestamp;
    entityCache.saveStats(stat);
    entityCache.saveComment(comment);
}

