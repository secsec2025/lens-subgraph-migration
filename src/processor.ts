import {lookupArchive} from '@subsquid/archive-registry';
import {
    EvmBatchProcessor
} from '@subsquid/evm-processor'
import {LENS_HUB_ADDRESS} from "./constants";

import {events as lensHubEvents} from './abi/LensHub';

export const processor = new EvmBatchProcessor()
    .setDataSource({
        archive: lookupArchive('polygon'),
        chain: {
            url: 'https://rpc.ankr.com/polygon',
            rateLimit: 20
        }
    })
    .setFinalityConfirmation(75)
    .setFields({
        log: {
            address: true,
            data: true,
            topics: true,
            transactionHash: true
        }
    })
    .addLog({
        range: {from: 28384641 },
        address: [LENS_HUB_ADDRESS],
        topic0: [lensHubEvents.ProfileCreated.topic, lensHubEvents.FollowNFTURISet.topic,
            lensHubEvents.ProfileImageURISet.topic, lensHubEvents.DispatcherSet.topic,
            lensHubEvents.ProfileCreatorWhitelisted.topic, lensHubEvents.FollowModuleSet.topic,
            lensHubEvents.PostCreated.topic, lensHubEvents.MirrorCreated.topic,
            lensHubEvents.CommentCreated.topic, lensHubEvents.Followed.topic,
            lensHubEvents.FollowNFTTransferred.topic, lensHubEvents.DefaultProfileSet.topic]
    });