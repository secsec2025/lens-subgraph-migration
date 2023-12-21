import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_} from "typeorm"
import {Account} from "./account.model"
import {Profile} from "./profile.model"

@Entity_()
export class AccountProfileFollow {
    constructor(props?: Partial<AccountProfileFollow>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_()
    @ManyToOne_(() => Account, {nullable: true})
    account!: Account

    @Index_()
    @ManyToOne_(() => Profile, {nullable: true})
    profile!: Profile

    @Column_("bool", {nullable: false})
    isDeleted!: boolean
}
