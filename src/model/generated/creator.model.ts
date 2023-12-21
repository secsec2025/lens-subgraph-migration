import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_} from "typeorm"
import * as marshal from "./marshal"

@Entity_()
export class Creator {
    constructor(props?: Partial<Creator>) {
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
     * Account Address is whitelisted
     */
    @Column_("bool", {nullable: false})
    isWhitelisted!: boolean

    /**
     * Date last modify Address
     */
    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    lastUpdated!: bigint
}
