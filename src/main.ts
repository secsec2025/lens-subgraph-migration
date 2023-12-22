import {TypeormDatabase} from '@subsquid/typeorm-store';
import {processor} from './processor';
import {EntityCache} from "./entity-cache";
import {LENS_HUB_ADDRESS} from "./constants";

import {events as lensHubEvents} from './abi/LensHub';
import {
    handleCommentCreated, handleDefaultProfileSetEvents,
    handleDispatcherSet, handleFollowed, handleFollowModuleSet, handleFollowNFTTransferred,
    handleFollowNFTURISet, handleMirrorCreated, handlePostCreated,
    handleProfileCreated,
    handleProfileCreatorWhitelisted,
    handleProfileImageURISet
} from "./mappings";
import {extractContentURIFromCommentCreatedLog, extractContentURIFromPostCreatedLog} from "./helpers/log-helper";

processor.run(new TypeormDatabase({supportHotBlocks: true}), async (ctx) => {
    console.log(`Batch Size - ${ctx.blocks.length} blocks`);

    const entityCache: EntityCache = new EntityCache(ctx);
    const defaultProfileSetEvents: DefaultProfileSetEventData[] = [];

    for (let c of ctx.blocks) {
        for (let e of c.logs) {

            // handleProfileCreated
            if (e.address.toLowerCase() === LENS_HUB_ADDRESS && e.topics[0] === lensHubEvents.ProfileCreated.topic) {
                const eventData: ProfileCreatedEventData = lensHubEvents.ProfileCreated.decode(e);
                await handleProfileCreated(eventData, e, entityCache);
            }

            // handleFollowNFTURISet
            else if (e.address.toLowerCase() === LENS_HUB_ADDRESS && e.topics[0] === lensHubEvents.FollowNFTURISet.topic) {
                const eventData: FollowNFTURISetEventData = lensHubEvents.FollowNFTURISet.decode(e);
                await handleFollowNFTURISet(eventData, e, entityCache);
            }

            // handleProfileImageURISet
            else if (e.address.toLowerCase() === LENS_HUB_ADDRESS && e.topics[0] === lensHubEvents.ProfileImageURISet.topic) {
                const eventData: ProfileImageURISetEventData = lensHubEvents.ProfileImageURISet.decode(e);
                await handleProfileImageURISet(eventData, e, entityCache);
            }

            // handleDispatcherSet
            else if (e.address.toLowerCase() === LENS_HUB_ADDRESS && e.topics[0] === lensHubEvents.DispatcherSet.topic) {
                const eventData: DispatcherSetEventData = lensHubEvents.DispatcherSet.decode(e);
                await handleDispatcherSet(eventData, e, entityCache);
            }

            // handleProfileCreatorWhitelisted
            else if (e.address.toLowerCase() === LENS_HUB_ADDRESS && e.topics[0] === lensHubEvents.ProfileCreatorWhitelisted.topic) {
                const eventData: ProfileCreatorWhitelistedEventData = lensHubEvents.ProfileCreatorWhitelisted.decode(e);
                await handleProfileCreatorWhitelisted(eventData, e, entityCache);
            }

            // handleFollowModuleSet
            else if (e.address.toLowerCase() === LENS_HUB_ADDRESS && e.topics[0] === lensHubEvents.FollowModuleSet.topic) {
                const eventData: FollowModuleSetEventData = lensHubEvents.FollowModuleSet.decode(e);
                await handleFollowModuleSet(eventData, e, entityCache);
            }

            // handlePostCreated
            else if (e.address.toLowerCase() === LENS_HUB_ADDRESS && e.topics[0] === lensHubEvents.PostCreated.topic) {
                const eventData: PostCreatedEventData = lensHubEvents.PostCreated.decode(e);
                const contentURI = extractContentURIFromPostCreatedLog(e.data, e.topics);
                await handlePostCreated(eventData, contentURI, e, entityCache);
            }

            // handleMirrorCreated
            else if (e.address.toLowerCase() === LENS_HUB_ADDRESS && e.topics[0] === lensHubEvents.MirrorCreated.topic) {
                const eventData: MirrorCreatedEventData = lensHubEvents.MirrorCreated.decode(e);
                await handleMirrorCreated(eventData, e, entityCache);
            }

            // handleCommentCreated
            else if (e.address.toLowerCase() === LENS_HUB_ADDRESS && e.topics[0] === lensHubEvents.CommentCreated.topic) {
                const eventData: CommentCreatedEventData = lensHubEvents.CommentCreated.decode(e);
                const contentURI = extractContentURIFromCommentCreatedLog(e.data, e.topics);
                await handleCommentCreated(eventData, contentURI, e, entityCache);
            }

            // handleFollowNFTTransferred
            else if (e.address.toLowerCase() === LENS_HUB_ADDRESS && e.topics[0] === lensHubEvents.FollowNFTTransferred.topic) {
                const eventData: FollowNFTTransferredEventData = lensHubEvents.FollowNFTTransferred.decode(e);
                await handleFollowNFTTransferred(eventData, e, entityCache);
            }

            // handleFollowed
            else if (e.address.toLowerCase() === LENS_HUB_ADDRESS && e.topics[0] === lensHubEvents.Followed.topic) {
                const eventData: FollowedEventData = lensHubEvents.Followed.decode(e);
                await handleFollowed(eventData, e, entityCache);
            }


            // store DefaultProfileSet Events to handle them separately after the other events (due to circular foreign keys)
            else if (e.address.toLowerCase() === LENS_HUB_ADDRESS && e.topics[0] === lensHubEvents.DefaultProfileSet.topic) {
                const eventData: DefaultProfileSetEventData = lensHubEvents.DefaultProfileSet.decode(e);
                defaultProfileSetEvents.push(eventData);
            }

        }
    }

    await entityCache.persistCacheToDatabase(false);


    // handle DefaultProfileSet separately after handling all the other events
    await handleDefaultProfileSetEvents(defaultProfileSetEvents, entityCache);

});
