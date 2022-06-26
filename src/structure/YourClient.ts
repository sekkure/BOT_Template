import { Command } from 'abstractions/Command'
import { Client, ClientOptions, Collection } from 'discord.js'
import { join } from 'path'
import { customReaddir } from 'utils/helpers'

export class YourClient extends Client {
  public commands: Collection<string, Command> = new Collection()

  constructor(options: ClientOptions) {
    super(options)
  }

  public async init() {
    await this.collectCommand()
    await this.collectEvents()
  }

  private async collectEvents() {
    try {
      console.log('Starting loading some events...')

      const path = join(__dirname, '..', 'events', '**', '*')
      const files = await customReaddir(path, ['js', 'ts'])

      for (const file of files) {
        const event = new (await import(file)).default()

        this.on(event.name, event.execute)
      }

      console.log('Events successfuly loaded!')
    } catch (err) {
      console.error(err)
    }
  }

  private async collectCommand() {
    try {
      console.log(`Starting loading some commands to cache...`)
      const path = join(__dirname, '..', 'commands', '**', '*')
      const files = await customReaddir(path, ['js', 'ts'])

      for (const file of files) {
        const command: Command = new (await import(file)).default(this)

        this.commands.set(command.data.name, command)
      }

      console.log(`${this.commands.size} commands was loaded to local cache!`)
    } catch (err) {
      console.error(err)
    }
  }
}
