Run with:
`bazelisk run //cmd/server:server`

Send request with:
```
curl   --header 'Content-Type: application/json'   --data '{"sentence": "I feel happy."}'    http://localhost:8080/eliza.v1.ElizaService/Say
```