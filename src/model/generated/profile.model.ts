import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_, OneToMany as OneToMany_} from "typeorm"
import * as marshal from "./marshal"
import {Creator} from "./creator.model"
import {Account} from "./account.model"
import {AccountProfileFollow} from "./accountProfileFollow.model"
import {ProfileProfileFollow} from "./profileProfileFollow.model"
import {Comment} from "./comment.model"
import {Post} from "./post.model"
import {Mirror} from "./mirror.model"

@Entity_()
export class Profile {
    constructor(props?: Partial<Profile>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    /**
     * Number of profile
     */
    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    profileId!: bigint

    /**
     * Address from the creator profile
     */
    @Index_()
    @ManyToOne_(() => Creator, {nullable: true})
    creator!: Creator

    @Column_({nullable: true})
    creatorId!: string | undefined | null;

    /**
     * Address from the owner creator profile
     */
    @Index_()
    @ManyToOne_(() => Account, {nullable: true})
    owner!: Account

    @Column_({nullable: true})
    ownerId!: string | undefined | null;

    /**
     * User attempting to follow the profile should be issued a Follow NFT
     */
    @Column_("text", {nullable: true})
    followNFT!: string | undefined | null

    /**
     * IPFS has the follow data
     */
    @Column_("text", {nullable: true})
    followNFTURI!: string | undefined | null

    /**
     * Nickname of the profile
     */
    @Column_("text", {nullable: true})
    handle!: string | undefined | null

    /**
     * URI image of the profile
     */
    @Column_("text", {nullable: true})
    imageURI!: string | undefined | null

    /**
     * Date created profile
     */
    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: true})
    createdAt!: bigint | undefined | null

    /**
     * Follow Module Address
     */
    @Column_("text", {nullable: true})
    followModule!: string | undefined | null

    /**
     * Follow Module Return Data
     */
    @Column_("text", {nullable: true})
    followModuleReturnData!: string | undefined | null

    /**
     * Dispatcher address allowed to post, comment, mirror, set follow module and change the profile picture on behalf of the owner.
     */
    @Column_("text", {nullable: true})
    dispatcher!: string | undefined | null

    /**
     * Last Date modify profile
     */
    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    lastUpdated!: bigint

    /**
     * Total mirrors
     */
    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    totalMirrors!: bigint

    /**
     * Total posts
     */
    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    totalPosts!: bigint

    /**
     * Total comments
     */
    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    totalComments!: bigint

    /**
     * Total Followers
     */
    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    totalFollowers!: bigint

    /**
     * Total Following From owner Account
     */
    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    totalFollowings!: bigint

    /**
     * List of followers Account
     */
    @OneToMany_(() => AccountProfileFollow, e => e.profile)
    followers!: AccountProfileFollow[]

    /**
     * List of following Profiles
     */
    @OneToMany_(() => ProfileProfileFollow, e => e.followProfile)
    followings!: ProfileProfileFollow[]

    /**
     * List of comments
     */
    @OneToMany_(() => Comment, e => e.fromProfile)
    comments!: Comment[]

    /**
     * List of post
     */
    @OneToMany_(() => Post, e => e.fromProfile)
    posts!: Post[]

    /**
     * List of Mirrors
     */
    @OneToMany_(() => Mirror, e => e.fromProfile)
    mirrors!: Mirror[]
}
