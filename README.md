Dear reviewer,

Backend API was very poorly written - splitting fetchLatestMessages and fetchMoreMessages on difference query bad idea, more accurate will be concatinate this in single method:
```gql
# cursor - messageId
query Messages(channelId: ID!, cursor: String);
```

So I don't have much time for solving this task with bad API (I have job, family and other job interview). And I don't want spend more time.

Could be improved:
1. Split useMessages in three differences hooks
2. UI/UX bugs
3. Remove extra rerenders
