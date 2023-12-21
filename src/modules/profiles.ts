import {Profile, ProfileProfileFollow} from "../model";
import {EntityCache} from "../entity-cache";
import {stats} from "./lens";


export namespace profiles {
    export async function getOrCreateProfile(profileNumber: bigint, timeStamp: bigint, entityCache: EntityCache): Promise<Profile> {
        let profileId = profileNumber.toString();

        let profile = await entityCache.getProfile(profileId);
        if (!profile) {
            // init profile
            profile = new Profile({
                id: profileId,
                profileId: profileNumber,
                createdAt: timeStamp,
                totalComments: 0n,
                totalPosts: 0n,
                totalMirrors: 0n,
                totalFollowers: 0n,
                totalFollowings: 0n
            });

            // +1 amount of lens profiles
            let lensInfo = await stats.getOrCreateLensInfo(entityCache);
            lensInfo.totalProfiles = lensInfo.totalProfiles + 1n;
            lensInfo.lastProfileCreated = timeStamp;
            entityCache.saveStats(lensInfo);
        }
        return profile;
    }


    export async function updateProfilesFollowings(accountProfiles: Array<string>, profileIdToAddOrRemove: string, totalFollowings: bigint, deleteFlag: boolean, entityCache: EntityCache): Promise<void> {
        for (let i = 0; i < accountProfiles.length; ++i) {
            let profile = await getOrCreateProfile(BigInt(accountProfiles[i]), 0n, entityCache);
            profile.totalFollowings = totalFollowings;
            entityCache.saveProfile(profile);

            // Save Profile Followings
            // profile.id follows newFollowingProfileId
            entityCache.saveProfileProfileFollow(new ProfileProfileFollow({
                id: `${profile.id}-${profileIdToAddOrRemove}`,
                profileId: profile.id,
                followProfileId: profileIdToAddOrRemove,
                isDeleted: deleteFlag
            }));
        }
    }

}