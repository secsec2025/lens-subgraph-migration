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

