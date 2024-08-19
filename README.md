Run server with:
`bazelisk run //cmd/server:server`

Send request with:
```
curl   --header 'Content-Type: application/json'   --data '{"sentence": "I feel happy."}'    http://localhost:8080/eliza.v1.ElizaService/Say
```

Run frontend with:
`pnpm start` in `/react`

TODO:
- Point frontend to local server instead of hosted demo server
- don't duplicate proto definitions
- rely on bazel generated code instead of manually generated things copied back into source tree
- updating to @bufbuild/protobuf@2.0.0 starts generating invalid javascript..
- updating to rules_ts@3.0.0-rc2 breaks the :src build
