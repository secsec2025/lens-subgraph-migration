
type ProfileCreatedEventData = {profileId: bigint, creator: string, to: string, handle: string, imageURI: string, followModule: string, followModuleReturnData: string, followNFTURI: string, timestamp: bigint};

type FollowNFTURISetEventData = {profileId: bigint, followNFTURI: string, timestamp: bigint};

type ProfileImageURISetEventData = {profileId: bigint, imageURI: string, timestamp: bigint};

type DispatcherSetEventData = {profileId: bigint, dispatcher: string, timestamp: bigint};

type ProfileCreatorWhitelistedEventData = {profileCreator: string, whitelisted: boolean, timestamp: bigint};

type FollowModuleSetEventData = {profileId: bigint, followModule: string, followModuleReturnData: string, timestamp: bigint};

type PostCreatedEventData = {profileId: bigint, pubId: bigint, contentURI: string, collectModule: string, collectModuleReturnData: string, referenceModule: string, referenceModuleReturnData: string, timestamp: bigint};

type MirrorCreatedEventData = {profileId: bigint, pubId: bigint, profileIdPointed: bigint, pubIdPointed: bigint, referenceModuleData: string, referenceModule: string, referenceModuleReturnData: string, timestamp: bigint};

type CommentCreatedEventData = {profileId: bigint, pubId: bigint, contentURI: string, profileIdPointed: bigint, pubIdPointed: bigint, referenceModuleData: string, collectModule: string, collectModuleReturnData: string, referenceModule: string, referenceModuleReturnData: string, timestamp: bigint};

type FollowedEventData = {follower: string, profileIds: bigint[], followModuleDatas: string[], timestamp: bigint};

type FollowNFTTransferredEventData = {profileId: bigint, followNFTId: bigint, from: string, to: string, timestamp: bigint};


