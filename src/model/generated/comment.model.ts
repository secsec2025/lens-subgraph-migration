import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_} from "typeorm"
import * as marshal from "./marshal"
import {Profile} from "./profile.model"

@Entity_()
export class Comment {
    constructor(props?: Partial<Comment>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    /**
     * Profile that created the post
     */
    @Index_()
    @ManyToOne_(() => Profile, {nullable: true})
    fromProfile!: Profile

    @Column_({nullable: true})
    fromProfileId!: string | undefined | null;

    /**
     * Publication Id
     */
    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    pubId!: bigint

    @Column_("text", {nullable: false})
    referenceModule!: string

    @Column_("text", {nullable: true})
    referenceModuleReturnData!: string | undefined | null

    /**
     * URI of the post content
     */
    @Column_("text", {nullable: false})
    contentURI!: string

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    profileIdPointed!: bigint

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    pubIdPointed!: bigint

    @Column_("text", {nullable: true})
    collectModule!: string | undefined | null

    @Column_("text", {nullable: true})
    collectModuleReturnData!: string | undefined | null

    /**
     * Date of creation
     */
    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    timestamp!: bigint
}
