
import { inferAsyncReturnType, initTRPC } from "@trpc/server"
import * as trpcExpress from "@trpc/server/adapters/express"
const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => ({})
type Context = inferAsyncReturnType<typeof createContext>
const t = initTRPC.context<Context>().create()
const appRouter = t.router({
  
})
const app = express()
app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
)
app.listen(4000)
