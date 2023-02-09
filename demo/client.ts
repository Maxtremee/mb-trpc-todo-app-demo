import type { AppRouter } from "./exampleRouter";
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
export let token: string;
export const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "http://localhost:3000/trpc",
      headers() {
        return {
          Authorization: token,
        };
      },
    }),
  ],
});
await trpc.hello.query({ name: "MB" });
