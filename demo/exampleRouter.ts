
import { initTRPC } from "@trpc/server"
import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server';
import { z } from "zod"
export const t = initTRPC.create()
export const appRouter = t.router({
  hello: t.procedure
    .input(
      z.object({
        name: z.string(),
      })
    )
    .query(({ input }) => {
      return { message: `Hello ${input.name}!` }
    }),
})
export type AppRouter = typeof appRouter

type RouterInput = inferRouterInputs<AppRouter>;
type RouterOutput = inferRouterOutputs<AppRouter>;

type HelloInput = RouterInput['hello']
type HelloOutput = RouterOutput['hello']