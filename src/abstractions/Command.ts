import { RESTPostAPIApplicationCommandsJSONBody } from 'discord-api-types/v9'
import { CommandInteraction } from 'discord.js'
import { Base } from './Base'

export abstract class Command extends Base {
  abstract data: RESTPostAPIApplicationCommandsJSONBody
  abstract execute(interaction: CommandInteraction): Promise<unknown> | unknown
}
