import { stats } from './lens';
import {Mirror, Post, Comment} from "../model";
import {EntityCache} from "../entity-cache";

export namespace publications {
  export namespace helpers {
    export function getNewPublicationId(profileId: bigint, pubId: bigint): string {
      return profileId
        .toString()
        .concat('-')
        .concat(pubId.toString())
    }
  }

  export async function getOrCreatePost(profileId: bigint, pubId: bigint, entityCache: EntityCache): Promise<Post> {
    let publicationId = helpers.getNewPublicationId(profileId, pubId);

    let post = await entityCache.getPost(publicationId);
    if (!post) {
      post = new Post({
        id: publicationId
      });

      // +1 amount of Post
      let lensInfo = await stats.getOrCreateLensInfo(entityCache);
      lensInfo.totalPosts = lensInfo.totalPosts + 1n;
      lensInfo.totalPublications = lensInfo.totalPublications + 1n;
      entityCache.saveStats(lensInfo);
    }
    return post;
  }

  export async function getOrCreateMirror(profileId: bigint, pubId: bigint, entityCache: EntityCache): Promise<Mirror> {
    let publicationId = helpers.getNewPublicationId(profileId, pubId);
    let mirror = await entityCache.getMirror(publicationId);
    if (!mirror) {
      mirror = new Mirror({
        id: publicationId
      });

      // +1 amount of Mirror
      let lensInfo = await stats.getOrCreateLensInfo(entityCache);
      lensInfo.totalMirror = lensInfo.totalMirror + 1n;
      lensInfo.totalPublications = lensInfo.totalPublications + 1n;
      entityCache.saveStats(lensInfo);
    }
    return mirror;
  }

  export async function getOrCreateComment(profileId: bigint, pubId: bigint, entityCache: EntityCache): Promise<Comment> {
    let publicationId = helpers.getNewPublicationId(profileId, pubId);
    let comment = await entityCache.getComment(publicationId);
    if (!comment) {
      comment = new Comment({
        id: publicationId
      });

      // +1 amount of Comments
      let lensInfo = await stats.getOrCreateLensInfo(entityCache);
      lensInfo.totalComments = lensInfo.totalComments + 1n;
      lensInfo.totalPublications = lensInfo.totalPublications + 1n;
      entityCache.saveStats(lensInfo);
    }
    return comment;
  }
}
