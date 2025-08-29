import { rpcAppHandler, rpcHandler } from "@blitzjs/rpc"
import { api, withBlitzAuth } from "app/blitz-server"

export const { GET, HEAD, POST } = withBlitzAuth(rpcAppHandler())

// eslint-disable-next-line no-console
export default api(rpcHandler({ onError: console.error }))
