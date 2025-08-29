/* eslint-disable no-console */
import { rpcAppHandler, rpcHandler } from "@blitzjs/rpc"
import { api, withBlitzAuth } from "app/blitz-server"

export const { GET, HEAD, POST } = withBlitzAuth(rpcAppHandler())

export default api(rpcHandler({ onError: (e) => console.error("rpcHandlerError:", e) }))
