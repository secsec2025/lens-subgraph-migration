import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_} from "typeorm"
import * as marshal from "./marshal"

@Entity_()
export class Stat {
    constructor(props?: Partial<Stat>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    /**
     * Total profiles
     */
    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    totalProfiles!: bigint

    /**
     * Total accounts
     */
    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    totalAccounts!: bigint

    /**
     * Total Post
     */
    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    totalPosts!: bigint

    /**
     * Total Comments
     */
    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    totalComments!: bigint

    /**
     * Total Mirrors
     */
    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    totalMirror!: bigint

    /**
     * Total Publicactions
     */
    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    totalPublications!: bigint

    /**
     * Last Comment created
     */
    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: true})
    lastCommentCreatedAt!: bigint | undefined | null

    /**
     * Last Post created
     */
    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: true})
    lastPostCreatedAt!: bigint | undefined | null

    /**
     * Last Mirror created
     */
    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: true})
    lastMirrorCreatedAt!: bigint | undefined | null

    /**
     * Last Profile created
     */
    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: true})
    lastProfileCreated!: bigint | undefined | null
}
