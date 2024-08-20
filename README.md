Run server with:
`ibazel run //cmd/server:server`

Send request with:
```
curl   --header 'Content-Type: application/json'   --data '{"sentence": "I feel happy."}'    http://localhost:8080/eliza.v1.ElizaService/Say
```

Run frontend with:
`pnpm start` in `/react`

Generate types for editor with:
`bazel run //react/proto:eliza_ts_proto.copy`

TODO:
- rely on bazel generated code instead of manually generated things copied back into source tree
- use tanstack query helpers
- make sure gazelle is actually doing things right
- updating to @bufbuild/protobuf@2.0.0 starts generating invalid javascript..
- updating to rules_ts@3.0.0-rc2 breaks the :src build

HMM:
- https://github.com/connectrpc/connect-go/discussions/310#discussioncomment-10016813