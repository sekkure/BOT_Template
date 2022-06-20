import { REST } from '@discordjs/rest'
import { Routes } from 'discord-api-types/v9'
import { config } from 'dotenv'
import { join } from 'path'

config({ path: join(process.cwd(), '.env') })

const clientId = process.env.CLIENT_ID
const guildId = process.env.GUILD_ID
const token = process.env.TOKEN

if (!token || !clientId || !guildId) {
  throw new Error('You must provide valid data in .env file!')
}

new REST({ version: '9' })
  .setToken(token)
  .put(Routes.applicationGuildCommands(clientId, guildId), { body: [] })
  .then(() => console.log('Successfully registered ( / ) commands!'))
  .catch(console.error)
