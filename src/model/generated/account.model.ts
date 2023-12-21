import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_, OneToMany as OneToMany_} from "typeorm"
import * as marshal from "./marshal"
import {Profile} from "./profile.model"
import {AccountProfileFollow} from "./accountProfileFollow.model"

@Entity_()
export class Account {
    constructor(props?: Partial<Account>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    /**
     * Address
     */
    @Column_("text", {nullable: false})
    address!: string

    /**
     * Default Profile
     */
    @Index_()
    @ManyToOne_(() => Profile, {nullable: true})
    defaultProfile!: Profile | undefined | null

    /**
     * List of Id profiles(String)
     */
    @Column_("text", {array: true, nullable: false})
    profilesIds!: (string)[]

    /**
     * List of Profiles that own this account
     */
    @OneToMany_(() => Profile, e => e.owner)
    profiles!: Profile[]

    /**
     * List of Followings Profiles
     */
    @OneToMany_(() => AccountProfileFollow, e => e.account)
    following!: AccountProfileFollow[]

    /**
     * List of Following profiles
     */
    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    totalFollowings!: bigint
}
