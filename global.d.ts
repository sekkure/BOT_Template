declare global {
  namespace NodeJS {
    interface ProcessEnv {
      TOKEN: string
      CLIENT_ID: string
      GUILD_ID: string
      DATABASE_URL: string
    }
  }
}

export {}
