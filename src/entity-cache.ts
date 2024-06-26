import {
    Account,
    AccountProfileFollow,
    Comment,
    Creator,
    Follow, FollowNFTTransferred,
    FollowProfile,
    Mirror,
    Post,
    Profile, ProfileProfileFollow,
    Stat
} from "./model";
import {DataHandlerContext} from "@subsquid/evm-processor";
import {Store} from "@subsquid/typeorm-store";


export class EntityCache {
    public stats!: Map<string, Stat>;
    public creators!: Map<string, Creator>;
    public accounts!: Map<string, Account>;
    public profiles!: Map<string, Profile>;
    public posts!: Map<string, Post>;
    public mirrors!: Map<string, Mirror>;
    public comments!: Map<string, Comment>;
    public follows!: Map<string, Follow>;
    public followProfiles!: Map<string, FollowProfile>;
    public accountProfileFollows!: Map<string, AccountProfileFollow>;
    public profileProfileFollows!: Map<string, ProfileProfileFollow>;
    public nftTransfers!: Map<string, FollowNFTTransferred>;

    public ctx: DataHandlerContext<Store, {}>;

    constructor(ctx: DataHandlerContext<Store, {}>) {
        this.ctx = ctx;
        this.initializeMaps();
    }

    private initializeMaps = () => {
        this.stats = new Map<string, Stat>();
        this.creators = new Map<string, Creator>();
        this.accounts = new Map<string, Account>();
        this.profiles = new Map<string, Profile>();
        this.posts = new Map<string, Post>();
        this.mirrors = new Map<string, Mirror>();
        this.comments = new Map<string, Comment>();
        this.follows = new Map<string, Follow>();
        this.followProfiles = new Map<string, FollowProfile>();
        this.accountProfileFollows = new Map<string, AccountProfileFollow>();
        this.profileProfileFollows = new Map<string, ProfileProfileFollow>();
        this.nftTransfers = new Map<string, FollowNFTTransferred>();
    }

    getStats = async (id: string): Promise<Stat | undefined> => {
        // Check if entity exists in cache
        if (this.stats.has(id)) return this.stats.get(id);

        // Check if exists in DB and save it to cache
        const a = await this.ctx.store.get(Stat, id);
        if (a) this.stats.set(id, a);
        return a;
    }

    saveStats = (t: Stat) => {
        this.stats.set(t.id, t);
    }

    getCreator = async (id: string): Promise<Creator | undefined> => {
        // Check if entity exists in cache
        if (this.creators.has(id)) return this.creators.get(id);

        // Check if exists in DB and save it to cache
        const a = await this.ctx.store.get(Creator, id);
        if (a) this.creators.set(id, a);
        return a;
    }

    saveCreator = (t: Creator) => {
        this.creators.set(t.id, t);
    }

    getAccount = async (id: string): Promise<Account | undefined> => {
        // Check if entity exists in cache
        if (this.accounts.has(id)) return this.accounts.get(id);

        // Check if exists in DB and save it to cache
        const a = await this.ctx.store.get(Account, id);
        if (a) this.accounts.set(id, a);
        return a;
    }

    saveAccount = (t: Account) => {
        this.accounts.set(t.id, t);
    }

    getProfile = async (id: string): Promise<Profile | undefined> => {
        // Check if entity exists in cache
        if (this.profiles.has(id)) return this.profiles.get(id);

        // Check if exists in DB and save it to cache
        const a = await this.ctx.store.get(Profile, id);
        if (a) this.profiles.set(id, a);
        return a;
    }

    saveProfile = (t: Profile) => {
        this.profiles.set(t.id, t);
    }

    getPost = async (id: string): Promise<Post | undefined> => {
        // Check if entity exists in cache
        if (this.posts.has(id)) return this.posts.get(id);

        // Check if exists in DB and save it to cache
        const a = await this.ctx.store.get(Post, id);
        if (a) this.posts.set(id, a);
        return a;
    }

    savePost = (t: Post) => {
        this.posts.set(t.id, t);
    }

    getMirror = async (id: string): Promise<Mirror | undefined> => {
        // Check if entity exists in cache
        if (this.mirrors.has(id)) return this.mirrors.get(id);

        // Check if exists in DB and save it to cache
        const a = await this.ctx.store.get(Mirror, id);
        if (a) this.mirrors.set(id, a);
        return a;
    }

    saveMirror = (t: Mirror) => {
        this.mirrors.set(t.id, t);
    }

    getComment = async (id: string): Promise<Comment | undefined> => {
        // Check if entity exists in cache
        if (this.comments.has(id)) return this.comments.get(id);

        // Check if exists in DB and save it to cache
        const a = await this.ctx.store.get(Comment, id);
        if (a) this.comments.set(id, a);
        return a;
    }

    saveComment = (t: Comment) => {
        this.comments.set(t.id, t);
    }

    getFollow = async (id: string): Promise<Follow | undefined> => {
        // Check if entity exists in cache
        if (this.follows.has(id)) return this.follows.get(id);

        // Check if exists in DB and save it to cache
        const a = await this.ctx.store.get(Follow, id);
        if (a) this.follows.set(id, a);
        return a;
    }

    saveFollow = (t: Follow) => {
        this.follows.set(t.id, t);
    }

    getFollowProfile = async (id: string): Promise<FollowProfile | undefined> => {
        // Check if entity exists in cache
        if (this.followProfiles.has(id)) return this.followProfiles.get(id);

        // Check if exists in DB and save it to cache
        const a = await this.ctx.store.get(FollowProfile, id);
        if (a) this.followProfiles.set(id, a);
        return a;
    }

    saveFollowProfile = (t: FollowProfile) => {
        this.followProfiles.set(t.id, t);
    }

    getAccountProfileFollow = async (id: string): Promise<AccountProfileFollow | undefined> => {
        // Check if entity exists in cache
        if (this.accountProfileFollows.has(id)) return this.accountProfileFollows.get(id);

        // Check if exists in DB and save it to cache
        const a = await this.ctx.store.get(AccountProfileFollow, id);
        if (a) this.accountProfileFollows.set(id, a);
        return a;
    }

    saveAccountProfileFollow = (t: AccountProfileFollow) => {
        this.accountProfileFollows.set(t.id, t);
    }

    getProfileProfileFollow = async (id: string): Promise<ProfileProfileFollow | undefined> => {
        // Check if entity exists in cache
        if (this.profileProfileFollows.has(id)) return this.profileProfileFollows.get(id);

        // Check if exists in DB and save it to cache
        const a = await this.ctx.store.get(ProfileProfileFollow, id);
        if (a) this.profileProfileFollows.set(id, a);
        return a;
    }

    saveProfileProfileFollow = (t: ProfileProfileFollow) => {
        this.profileProfileFollows.set(t.id, t);
    }

    getFollowNFTTransfer = async (id: string): Promise<FollowNFTTransferred | undefined> => {
        // Check if entity exists in cache
        if (this.nftTransfers.has(id)) return this.nftTransfers.get(id);

        // Check if exists in DB and save it to cache
        const a = await this.ctx.store.get(FollowNFTTransferred, id);
        if (a) this.nftTransfers.set(id, a);
        return a;
    }

    saveFollowNFTTransfer = (t: FollowNFTTransferred) => {
        this.nftTransfers.set(t.id, t);
    }


    // Explicit save function to save Accounts when their default profile is set
    saveDefaultProfileSetAccounts = async (accounts: Account[]) => {
        await this.ctx.store.upsert(accounts);
    }


    // Persist Cache to DB
    persistCacheToDatabase = async (flushCache: boolean) => {
        await this.ctx.store.upsert([...this.stats.values()]);
        await this.ctx.store.upsert([...this.creators.values()]);
        await this.ctx.store.upsert([...this.accounts.values()]);
        await this.ctx.store.upsert([...this.profiles.values()]);
        await this.ctx.store.upsert([...this.posts.values()]);
        await this.ctx.store.upsert([...this.mirrors.values()]);
        await this.ctx.store.upsert([...this.comments.values()]);
        await this.ctx.store.upsert([...this.follows.values()]);
        await this.ctx.store.upsert([...this.followProfiles.values()]);
        await this.ctx.store.upsert([...this.accountProfileFollows.values()]);
        await this.ctx.store.upsert([...this.profileProfileFollows.values()]);
        await this.ctx.store.upsert([...this.nftTransfers.values()]);

        // Remove the soft Deleted accountProfileFollows and profileProfileFollows
        const accountProfileFollowsToBeDeleted = [...this.accountProfileFollows.values()].filter(e => e.isDeleted).map(e => e.id);
        const profileProfileFollowsToBeDeleted = [...this.profileProfileFollows.values()].filter(e => e.isDeleted).map(e => e.id);
        if (accountProfileFollowsToBeDeleted.length > 0) await this.ctx.store.remove(AccountProfileFollow, accountProfileFollowsToBeDeleted);
        if (profileProfileFollowsToBeDeleted.length > 0) await this.ctx.store.remove(ProfileProfileFollow, profileProfileFollowsToBeDeleted);

        if (flushCache) {
            this.initializeMaps();
        }
    }
}
