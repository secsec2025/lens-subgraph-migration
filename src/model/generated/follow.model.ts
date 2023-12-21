import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_, OneToMany as OneToMany_} from "typeorm"
import * as marshal from "./marshal"
import {Account} from "./account.model"
import {FollowProfile} from "./followProfile.model"

@Entity_()
export class Follow {
    constructor(props?: Partial<Follow>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    /**
     * Follower Account. 
     */
    @Index_()
    @ManyToOne_(() => Account, {nullable: true})
    fromAccount!: Account

    @Column_({nullable: true})
    fromAccountId!: string | undefined | null;

    @Column_("text", {nullable: false})
    fromProfileSTR!: string

    /**
     * Array of profiles that are followed
     */
    @OneToMany_(() => FollowProfile, e => e.follow)
    toProfile!: FollowProfile[]

    /**
     * Date from when the follow initiated
     */
    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    timestamp!: bigint
}
