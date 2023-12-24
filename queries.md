# Sample Queries

<b>Please note that, the subgraph has only been synced upto 33.2 millionth block. So it is not
possible to compare the data with the squid.</b>

## Get Lens Stats

### Subgraph Query
```graphql
{
    stats {
        id
        totalProfiles
        totalAccounts
        totalPosts
        totalComments
        totalMirror
        totalPublications
        lastCommentCreatedAt
        lastPostCreatedAt
        lastMirrorCreatedAt
        lastProfileCreated
    }
}
```

### Squid Query

same as above


## Get Accounts with Highest Followings

### Subgraph Query
```graphql
{
    accounts (first: 5, orderBy: totalFollowings,
        orderDirection: desc) {
        id
        address
        defaultProfile {
            profileId
            handle
        }
        profiles {
            profileId
            handle
        }
        totalFollowings
    }
}
```

### Squid Query

```graphql
query MyQ {
    accounts (limit: 5, orderBy: totalFollowings_DESC) {
        id
        address
        defaultProfile {
            profileId
            handle
        }
        profiles {
            profileId
            handle
        }
        totalFollowings
    }
}
```


## Get the Account of stani.lens and the profiles he follows

### Subgraph Query
```graphql
{
    accounts (first: 5, orderBy: totalFollowings,
        orderDirection: desc, where: {
            defaultProfile_: {
                handle: "stani.lens"
            }
        }) {
        id
        address
        defaultProfile {
            profileId
            handle
        }
        profiles {
            profileId
            handle
        }
        following {
            profileId
        }
        totalFollowings
    }
}
```

### Squid Query

```graphql
query MyQ {
    accounts (limit: 5, where: {
            defaultProfile: {
							handle_eq: "stani.lens"
						}
        }) {
        id
        address
        defaultProfile {
            profileId
            handle
        }
        profiles {
            profileId
            handle
        }
        following {
            profile {
							profileId
						}
        }
        totalFollowings
    }
}
```


## Get Latest Comments made by stani.lens

### Subgraph Query
```graphql
{
    comments (first: 5, orderBy: timestamp,
        orderDirection: desc, where: {
            fromProfile_: {
                handle: "stani.lens"
            }
        }) {
        id
        fromProfile {
            profileId
            handle
        }
        pubId
        contentURI
        profileIdPointed
        pubIdPointed
        timestamp
    }
}
```

### Squid Query

```graphql
query MyQ {
    comments (limit: 5, orderBy: timestamp_DESC, where: {
            fromProfile: {
                handle_eq: "stani.lens"
            }
        }) {
        id
        fromProfile {
            profileId
            handle
        }
        pubId
        contentURI
        profileIdPointed
        pubIdPointed
        timestamp
    }
}
```


## Get Creators

### Subgraph Query
```graphql
{
    creators {
        id
        address
        isWhitelisted
        lastUpdated
    }
}
```

### Squid Query

same as above


## Get Latest Follows

### Subgraph Query
```graphql
{
    follows(first: 5, orderBy: timestamp,
        orderDirection: desc) {
        id
        fromAccount {
            address
        }
        fromProfileSTR
        toProfile {
            profileId
            handle
        }
        timestamp
    }
}
```

### Squid Query

```graphql
query MyQ {
    follows(limit: 5, orderBy: timestamp_DESC) {
        id
        fromAccount {
            address
        }
        fromProfileSTR
        toProfile {
            profile {
                profileId
                handle
            }
        }
        timestamp
    }
}
```


## Get Latest Follow NFT Transfers (from 1663468000 th block)

### Subgraph Query
```graphql
{
    followNFTTransferreds (first: 5, orderBy: timestamp,
        orderDirection: desc, where: {
            timestamp_lt: "1663468000"
        }) {
        id
        profileId
        followNFTID
        from
        to
        timestamp
        data
    }
}
```

### Squid Query

```graphql
query MyQ {
    followNftTransferreds (limit: 5, orderBy: timestamp_DESC,
        where: {
            timestamp_lt: "1663468000"
        }) {
        id
        profileId
        followNFTID
        from
        to
        timestamp
        data
    }
}
```


## Get Latest Mirrors (from 1663468000 th block)

### Subgraph Query
```graphql
{
    mirrors(first: 5, orderBy: timestamp,
        orderDirection: desc, where: {
            timestamp_lt: "1663468000"
        }) {
        id
        fromProfile {
            profileId
            handle
        }
        pubId
        profileIdPointed
        pubIdPointed
        timestamp
    }
}
```

### Squid Query

```graphql
query MyQ {
    mirrors(limit: 5, orderBy: timestamp_DESC, where: {
        timestamp_lt: "1663468000"
    }) {
        id
        fromProfile {
            profileId
            handle
        }
        pubId
        profileIdPointed
        pubIdPointed
        timestamp
    }
}
```


## Get Latest Posts (from 1663468000 th block)

### Subgraph Query
```graphql
{
    posts(first: 5, orderBy: timestamp,
        orderDirection: desc, where: {
            timestamp_lt: "1663468000"
        }) {
        id
        fromProfile {
            profileId
            handle
        }
        pubId
        contentURI
        timestamp
    }
}
```

### Squid Query

```graphql
query MyQ {
    posts(limit: 5, orderBy: timestamp_DESC, where: {
        timestamp_lt: "1663468000"
    }) {
        id
        fromProfile {
            profileId
            handle
        }
        pubId
        contentURI
        timestamp
    }
}
```


## Get Latest Updated Profiles (from 1663468000 th block)

### Subgraph Query
```graphql
{
    profiles(first: 5, orderBy: lastUpdated,
        orderDirection: desc, where: {
            lastUpdated_lt: "1663468000"
        }) {
        id
        profileId
        creator {
            address
        }
        owner {
            address
        }
        followNFT
        followNFTURI
        handle
        imageURI
        createdAt
        lastUpdated
        dispatcher
        totalMirrors
        totalPosts
        totalComments
        totalFollowers
        totalFollowings
    }
}
```

### Squid Query

```graphql
query MyQ {
    profiles(limit: 5, orderBy: lastUpdated_DESC, where: {
        lastUpdated_lt: "1663468000"
    }) {
        id
        profileId
        creator {
            address
        }
        owner {
            address
        }
        followNFT
        followNFTURI
        handle
        imageURI
        createdAt
        lastUpdated
        dispatcher
        totalMirrors
        totalPosts
        totalComments
        totalFollowers
        totalFollowings
    }
}
```


## Get Profiles Followed by stani.lens and Accounts that follow him

### Subgraph Query
```graphql
{
    profiles(first: 5, where: {
        handle: "stani.lens"
    }) {
        id
        profileId
        creator {
            address
        }
        owner {
            address
        }
        handle
        imageURI
        createdAt
        lastUpdated
        totalMirrors
        totalPosts
        totalComments
        totalFollowers
        totalFollowings
        followers {
            address
        }
        followings {
            profileId
            handle
        }
    }
}
```

### Squid Query

```graphql
query MyQ {
    profiles(limit: 5, where: {
        handle_eq: "stani.lens"
    }) {
        id
        profileId
        creator {
            address
        }
        owner {
            address
        }
        handle
        imageURI
        createdAt
        lastUpdated
        totalMirrors
        totalPosts
        totalComments
        totalFollowers
        totalFollowings
        followers {
            account {
                address
            }
        }
        followings {
            profile {
                profileId
                handle
            }
        }
    }
}
```
