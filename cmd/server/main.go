package main

import (
	"context"
	"fmt"
	"log"
	"net/http"

	"connectrpc.com/connect"
	"golang.org/x/net/http2"
	"golang.org/x/net/http2/h2c"

	elizav1 "github.com/bhainesva/go-typescript-bazel-connect-service/gen/eliza/v1"
	"github.com/bhainesva/go-typescript-bazel-connect-service/gen/eliza/v1/elizav1connect"
)

type ElizaServer struct{}

func (s *ElizaServer) Say(
	ctx context.Context,
	req *connect.Request[elizav1.SayRequest],
) (*connect.Response[elizav1.SayResponse], error) {
	log.Println("Request headers: ", req.Header())
	res := connect.NewResponse(&elizav1.SayResponse{
		Sentence: fmt.Sprintf("Hello, %s!", req.Msg.Sentence),
	})
	res.Header().Set("Eliza-Version", "v1")
	return res, nil
}

func corsMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Add("Access-Control-Allow-Origin", "*")
		w.Header().Add("Access-Control-Allow-Headers", "connect-protocol-version,content-type")
		if r.Method == "OPTIONS" {
			w.WriteHeader(200)
		}
		next.ServeHTTP(w, r)
	})
}

func main() {
	eliza := &ElizaServer{}
	mux := http.NewServeMux()
	path, handler := elizav1connect.NewElizaServiceHandler(eliza)
	mux.Handle(path, corsMiddleware(handler))
	http.ListenAndServe(
		"localhost:8080",
		// Use h2c so we can serve HTTP/2 without TLS.
		h2c.NewHandler(mux, &http2.Server{}),
	)
}
