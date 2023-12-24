# Lens Subgraph Migration
A quest to migrate Lens subgraph to Subsquid

# Introduction

This is the squid implementation of the Lens subgraph (https://github.com/rtomas/lens-protocol-subgraph). 

<b>Please note that, the subgraph has only been synced upto 33.2 millionth block. So it is not
possible to compare the data with the squid.</b>

# What is Changed?

<ul>
<li>Batch Processing is used.</li>
<li>An <code>EntityCache</code> is used to store the entities in memory to improve performance.</li>
<li><code>schema.graphql</code> was changed to represent Many to Many relationships.</li>
</ul>

# How to start?
<ul>
<li>Please make sure to add the necessary DB config to <code>.env</code> file.</li>
</ul>


```bash
git clone https://github.com/secsec2025/lens-subgraph-migration.git
cd lens-subgraph-migration
npm ci
sqd up
sqd process &
sqd serve
```

# GraphQL Schema Changes

<ul>
<li>The core structure stays same with the Subgraph.</li>
<li><code>Byte</code> fields have been changed to <code>String</code>.</li>
<li><code>AccountProfileFollow</code> and <code>ProfileProfileFollow</code> entities were
added to represent Many to Many relationships. These entities will act as pivot tables.</li>
<li>Interface <code>Publication</code> was removed.</li>
<li>Entity <code>FollowProfile</code> was added to keep track of <code>Follow</code> and <code>Profile</code> entities.</li>
</ul>


# Squid Stats

<ul>
<li>Time to fully sync - More than 48 hours</li>
</ul>


# What's Next to Do?

<ul>
<li>Add more sample queries. <code>queries.md</code></li>
</ul>

