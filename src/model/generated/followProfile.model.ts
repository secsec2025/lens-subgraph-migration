import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_} from "typeorm"
import {Follow} from "./follow.model"
import {Profile} from "./profile.model"

@Entity_()
export class FollowProfile {
    constructor(props?: Partial<FollowProfile>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_()
    @ManyToOne_(() => Follow, {nullable: true})
    follow!: Follow

    @Index_()
    @ManyToOne_(() => Profile, {nullable: true})
    profile!: Profile
}
