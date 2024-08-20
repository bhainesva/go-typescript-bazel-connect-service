/// <reference types="vite-plugin-svgr/client" />
import { useState } from "react";
import "./App.css";

import { createConnectTransport } from "@connectrpc/connect-web";
import { TransportProvider, useQuery, useMutation } from "@connectrpc/connect-query";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { say } from "../../eliza/v1/eliza-ElizaService_connectquery";

// The transport defines what type of endpoint we're hitting.
// In our example we'll be communicating with a Connect endpoint.
// If your endpoint only supports gRPC-web, make sure to use
// `createGrpcWebTransport` instead.
const transport = createConnectTransport({
  baseUrl: "http://localhost:8080",
});

// Here we make the client itself, combining the service
// definition with the transport.
const queryClient = new QueryClient();

function App() {
  return (
    <TransportProvider transport={transport}>
      <QueryClientProvider client={queryClient}>
        <AppImpl />
      </QueryClientProvider>
    </TransportProvider>
  );
}

function AppImpl() {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<
    {
      fromMe: boolean;
      message: string;
    }[]
  >([]);

  const mutation = useMutation(say, {
    onSuccess: (data) => {
      setMessages((prev) => [
        ...prev,
        {
          fromMe: false,
          message: data.sentence,
        },
      ]);
    }
  })

  return <>
        <ol>
        {messages.map((msg, index) => (
          <li key={index}>
            {`${msg.fromMe ? "ME:" : "ELIZA:"} ${msg.message}`}
          </li>
        ))}
      </ol>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          mutation.mutate({sentence: inputValue})

          // Store the inputValue in the chain of messages and
          // mark this message as coming from "me"
          setMessages((prev) => [
            ...prev,
            {
              fromMe: true,
              message: inputValue,
            },
          ]);
          // Clear inputValue since the user has submitted.
          setInputValue("");          
        }}
      >
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />{" "}
        <button type="submit">Send</button>
      </form>
    </>

}

export default App;
