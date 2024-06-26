module.exports = class Data1703188786214 {
    name = 'Data1703188786214'

    async up(db) {
        await db.query(`CREATE TABLE "stat" ("id" character varying NOT NULL, "total_profiles" numeric NOT NULL, "total_accounts" numeric NOT NULL, "total_posts" numeric NOT NULL, "total_comments" numeric NOT NULL, "total_mirror" numeric NOT NULL, "total_publications" numeric NOT NULL, "last_comment_created_at" numeric, "last_post_created_at" numeric, "last_mirror_created_at" numeric, "last_profile_created" numeric, CONSTRAINT "PK_132de903d366f4c06cd586c43c0" PRIMARY KEY ("id"))`)
        await db.query(`CREATE TABLE "creator" ("id" character varying NOT NULL, "address" text NOT NULL, "is_whitelisted" boolean NOT NULL, "last_updated" numeric NOT NULL, CONSTRAINT "PK_43e489c9896f9eb32f7a0b912c2" PRIMARY KEY ("id"))`)
        await db.query(`CREATE TABLE "account_profile_follow" ("id" character varying NOT NULL, "account_id" character varying, "profile_id" character varying, "is_deleted" boolean NOT NULL, CONSTRAINT "PK_17fddfd87a686c52ad33014865f" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_cfacbac0a0d36733f35a599ecb" ON "account_profile_follow" ("account_id") `)
        await db.query(`CREATE INDEX "IDX_c2141cf4c98b87562f09202803" ON "account_profile_follow" ("profile_id") `)
        await db.query(`CREATE TABLE "account" ("id" character varying NOT NULL, "address" text NOT NULL, "default_profile_id" character varying, "profiles_ids" text array NOT NULL, "total_followings" numeric NOT NULL, CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_e8d51e2c2e9c0eef4ed892da2c" ON "account" ("default_profile_id") `)
        await db.query(`CREATE TABLE "profile_profile_follow" ("id" character varying NOT NULL, "profile_id" character varying, "follow_profile_id" character varying, "is_deleted" boolean NOT NULL, CONSTRAINT "PK_8be28b30d279dd2ca2abe8c732c" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_666dd22e4f9c16b802cdeedcf7" ON "profile_profile_follow" ("profile_id") `)
        await db.query(`CREATE INDEX "IDX_23a6c69e0e21a7e6f91d6f7331" ON "profile_profile_follow" ("follow_profile_id") `)
        await db.query(`CREATE TABLE "comment" ("id" character varying NOT NULL, "from_profile_id" character varying, "pub_id" numeric NOT NULL, "reference_module" text NOT NULL, "reference_module_return_data" text, "content_uri" text NOT NULL, "profile_id_pointed" numeric NOT NULL, "pub_id_pointed" numeric NOT NULL, "collect_module" text, "collect_module_return_data" text, "timestamp" numeric NOT NULL, CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_d6bae872652950628ea4c450ba" ON "comment" ("from_profile_id") `)
        await db.query(`CREATE TABLE "post" ("id" character varying NOT NULL, "from_profile_id" character varying, "pub_id" numeric NOT NULL, "reference_module" text NOT NULL, "reference_module_return_data" text, "content_uri" text NOT NULL, "collect_module" text NOT NULL, "collect_module_return_data" text, "timestamp" numeric NOT NULL, CONSTRAINT "PK_be5fda3aac270b134ff9c21cdee" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_2b4f0e0e9cd72417af64cec030" ON "post" ("from_profile_id") `)
        await db.query(`CREATE TABLE "mirror" ("id" character varying NOT NULL, "from_profile_id" character varying, "pub_id" numeric NOT NULL, "reference_module" text NOT NULL, "reference_module_return_data" text, "profile_id_pointed" numeric NOT NULL, "pub_id_pointed" numeric NOT NULL, "timestamp" numeric NOT NULL, CONSTRAINT "PK_1550eca1496157edb9af20a1bdd" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_6e7074ea6dbaff6ac42348f5d7" ON "mirror" ("from_profile_id") `)
        await db.query(`CREATE TABLE "profile" ("id" character varying NOT NULL, "profile_id" numeric NOT NULL, "creator_id" character varying, "owner_id" character varying, "follow_nft" text, "follow_nfturi" text, "handle" text, "image_uri" text, "created_at" numeric, "follow_module" text, "follow_module_return_data" text, "dispatcher" text, "last_updated" numeric NOT NULL, "total_mirrors" numeric NOT NULL, "total_posts" numeric NOT NULL, "total_comments" numeric NOT NULL, "total_followers" numeric NOT NULL, "total_followings" numeric NOT NULL, CONSTRAINT "PK_3dd8bfc97e4a77c70971591bdcb" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_a2807af7492e37ebdc6f4816e2" ON "profile" ("creator_id") `)
        await db.query(`CREATE INDEX "IDX_356f7a42ce1ec3cd8a740a732e" ON "profile" ("owner_id") `)
        await db.query(`CREATE TABLE "follow_profile" ("id" character varying NOT NULL, "follow_id" character varying, "profile_id" character varying, CONSTRAINT "PK_5a50c62f37a77d378361b612d34" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_c6f3e8af348d525a57248e460e" ON "follow_profile" ("follow_id") `)
        await db.query(`CREATE INDEX "IDX_1fbe3bf51d39328216b2b506a5" ON "follow_profile" ("profile_id") `)
        await db.query(`CREATE TABLE "follow" ("id" character varying NOT NULL, "from_account_id" character varying, "from_profile_str" text NOT NULL, "timestamp" numeric NOT NULL, CONSTRAINT "PK_fda88bc28a84d2d6d06e19df6e5" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_5b8c84d547bea31f4c8e572212" ON "follow" ("from_account_id") `)
        await db.query(`CREATE TABLE "follow_nft_transferred" ("id" character varying NOT NULL, "profile_id" numeric, "follow_nftid" numeric, "from" text, "to" text, "timestamp" numeric, "data" text, CONSTRAINT "PK_76bcc9dd912ab98ec53dd8a75c7" PRIMARY KEY ("id"))`)
        await db.query(`ALTER TABLE "account_profile_follow" ADD CONSTRAINT "FK_cfacbac0a0d36733f35a599ecb6" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "account_profile_follow" ADD CONSTRAINT "FK_c2141cf4c98b87562f092028036" FOREIGN KEY ("profile_id") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "account" ADD CONSTRAINT "FK_e8d51e2c2e9c0eef4ed892da2c8" FOREIGN KEY ("default_profile_id") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "profile_profile_follow" ADD CONSTRAINT "FK_666dd22e4f9c16b802cdeedcf76" FOREIGN KEY ("profile_id") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "profile_profile_follow" ADD CONSTRAINT "FK_23a6c69e0e21a7e6f91d6f73313" FOREIGN KEY ("follow_profile_id") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_d6bae872652950628ea4c450bac" FOREIGN KEY ("from_profile_id") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "post" ADD CONSTRAINT "FK_2b4f0e0e9cd72417af64cec0300" FOREIGN KEY ("from_profile_id") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "mirror" ADD CONSTRAINT "FK_6e7074ea6dbaff6ac42348f5d7b" FOREIGN KEY ("from_profile_id") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "profile" ADD CONSTRAINT "FK_a2807af7492e37ebdc6f4816e2a" FOREIGN KEY ("creator_id") REFERENCES "creator"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "profile" ADD CONSTRAINT "FK_356f7a42ce1ec3cd8a740a732ee" FOREIGN KEY ("owner_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "follow_profile" ADD CONSTRAINT "FK_c6f3e8af348d525a57248e460ef" FOREIGN KEY ("follow_id") REFERENCES "follow"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "follow_profile" ADD CONSTRAINT "FK_1fbe3bf51d39328216b2b506a51" FOREIGN KEY ("profile_id") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "follow" ADD CONSTRAINT "FK_5b8c84d547bea31f4c8e572212b" FOREIGN KEY ("from_account_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    }

    async down(db) {
        await db.query(`DROP TABLE "stat"`)
        await db.query(`DROP TABLE "creator"`)
        await db.query(`DROP TABLE "account_profile_follow"`)
        await db.query(`DROP INDEX "public"."IDX_cfacbac0a0d36733f35a599ecb"`)
        await db.query(`DROP INDEX "public"."IDX_c2141cf4c98b87562f09202803"`)
        await db.query(`DROP TABLE "account"`)
        await db.query(`DROP INDEX "public"."IDX_e8d51e2c2e9c0eef4ed892da2c"`)
        await db.query(`DROP TABLE "profile_profile_follow"`)
        await db.query(`DROP INDEX "public"."IDX_666dd22e4f9c16b802cdeedcf7"`)
        await db.query(`DROP INDEX "public"."IDX_23a6c69e0e21a7e6f91d6f7331"`)
        await db.query(`DROP TABLE "comment"`)
        await db.query(`DROP INDEX "public"."IDX_d6bae872652950628ea4c450ba"`)
        await db.query(`DROP TABLE "post"`)
        await db.query(`DROP INDEX "public"."IDX_2b4f0e0e9cd72417af64cec030"`)
        await db.query(`DROP TABLE "mirror"`)
        await db.query(`DROP INDEX "public"."IDX_6e7074ea6dbaff6ac42348f5d7"`)
        await db.query(`DROP TABLE "profile"`)
        await db.query(`DROP INDEX "public"."IDX_a2807af7492e37ebdc6f4816e2"`)
        await db.query(`DROP INDEX "public"."IDX_356f7a42ce1ec3cd8a740a732e"`)
        await db.query(`DROP TABLE "follow_profile"`)
        await db.query(`DROP INDEX "public"."IDX_c6f3e8af348d525a57248e460e"`)
        await db.query(`DROP INDEX "public"."IDX_1fbe3bf51d39328216b2b506a5"`)
        await db.query(`DROP TABLE "follow"`)
        await db.query(`DROP INDEX "public"."IDX_5b8c84d547bea31f4c8e572212"`)
        await db.query(`DROP TABLE "follow_nft_transferred"`)
        await db.query(`ALTER TABLE "account_profile_follow" DROP CONSTRAINT "FK_cfacbac0a0d36733f35a599ecb6"`)
        await db.query(`ALTER TABLE "account_profile_follow" DROP CONSTRAINT "FK_c2141cf4c98b87562f092028036"`)
        await db.query(`ALTER TABLE "account" DROP CONSTRAINT "FK_e8d51e2c2e9c0eef4ed892da2c8"`)
        await db.query(`ALTER TABLE "profile_profile_follow" DROP CONSTRAINT "FK_666dd22e4f9c16b802cdeedcf76"`)
        await db.query(`ALTER TABLE "profile_profile_follow" DROP CONSTRAINT "FK_23a6c69e0e21a7e6f91d6f73313"`)
        await db.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_d6bae872652950628ea4c450bac"`)
        await db.query(`ALTER TABLE "post" DROP CONSTRAINT "FK_2b4f0e0e9cd72417af64cec0300"`)
        await db.query(`ALTER TABLE "mirror" DROP CONSTRAINT "FK_6e7074ea6dbaff6ac42348f5d7b"`)
        await db.query(`ALTER TABLE "profile" DROP CONSTRAINT "FK_a2807af7492e37ebdc6f4816e2a"`)
        await db.query(`ALTER TABLE "profile" DROP CONSTRAINT "FK_356f7a42ce1ec3cd8a740a732ee"`)
        await db.query(`ALTER TABLE "follow_profile" DROP CONSTRAINT "FK_c6f3e8af348d525a57248e460ef"`)
        await db.query(`ALTER TABLE "follow_profile" DROP CONSTRAINT "FK_1fbe3bf51d39328216b2b506a51"`)
        await db.query(`ALTER TABLE "follow" DROP CONSTRAINT "FK_5b8c84d547bea31f4c8e572212b"`)
    }
}
