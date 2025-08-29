import { envsafe, str } from "envsafe"

/**
 * The point of this file is that by using envsafe,
 * we can crash on startup instead of later on,
 * if an environment variable is missing.
 */

export const env = envsafe({
  NEXT_PUBLIC_TILESERVER_URL: str({
    input: process.env.NEXT_PUBLIC_TILESERVER_URL,
  }),
  NEXT_PUBLIC_SHADE_FEATURE_FLAG_ACTIVE: str({
    input: process.env.NEXT_PUBLIC_SHADE_FEATURE_FLAG_ACTIVE,
  }),
  NEXT_PUBLIC_LANGUAGE_FEATURE_FLAG_ACTIVE: str({
    input: process.env.NEXT_PUBLIC_LANGUAGE_FEATURE_FLAG_ACTIVE,
  }),
})
