import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_} from "typeorm"
import {Profile} from "./profile.model"

@Entity_()
export class ProfileProfileFollow {
    constructor(props?: Partial<ProfileProfileFollow>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_()
    @ManyToOne_(() => Profile, {nullable: true})
    profile!: Profile

    @Column_({nullable: true})
    profileId!: string | undefined | null;

    @Index_()
    @ManyToOne_(() => Profile, {nullable: true})
    followProfile!: Profile

    @Column_({nullable: true})
    followProfileId!: string | undefined | null;

    @Column_("bool", {nullable: false})
    isDeleted!: boolean
}
