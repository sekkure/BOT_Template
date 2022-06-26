import { config } from 'dotenv'
import { join } from 'path'
import { YourClient } from 'structure/YourClient'

config({ path: join(process.cwd(), '.env') })

export const Client = new YourClient({
  intents: [],
})

const main = async () => {
  await Client.init()
  await Client.login(process.env.TOKEN)
}

main()
