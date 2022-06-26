import { config } from 'dotenv'
import { join } from 'path'
import { YamaokaClient } from 'structure/YamaokaClient'

config({ path: join(process.cwd(), '.env') })

export const Yamaoka = new YamaokaClient({
  intents: [],
})

const main = async () => {
  await Yamaoka.init()
  await Yamaoka.login(process.env.TOKEN)
}

main()
