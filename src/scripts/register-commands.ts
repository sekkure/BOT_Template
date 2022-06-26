import { REST } from '@discordjs/rest'
import { Command } from 'abstractions/Command'
import { Routes } from 'discord-api-types/v9'
import { config } from 'dotenv'
import { Yamaoka } from 'index'
import { join } from 'path'
import { customReaddir } from 'utils/helpers'

config({ path: join(process.cwd(), '.env') })

export const __init__ = async () => {
  const clientId = process.env.CLIENT_ID
  const guildId = process.env.GUILD_ID
  const token = process.env.TOKEN

  if (!token || !clientId || !guildId) {
    throw new Error('You must provide valid data in .env file!')
  }

  console.log('Slash commands deploy started, collecting all commands...')

  const commands = []
  const path = join(__dirname, '..', 'commands', '**', '*')
  const files = await customReaddir(path, ['js', 'ts'])

  for (const file of files) {
    const command: Command = new (await import(file)).default(Yamaoka)
    const proto = Object.getPrototypeOf(command)

    if (!proto.isSlashCommand) continue

    commands.push(command.data)
  }

  console.log(
    `Collected total ${files.length} commands, slash commands ${commands.length}`
  )

  if (!commands.length) {
    return console.log('0 slash commands was found, aborting')
  }

  new REST()
    .setToken(token)
    .put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
    .then(() => {
      console.log(
        `Successfully registered total of ${commands.length} slash commands!`
      )
    })
    .catch(console.error)
}
