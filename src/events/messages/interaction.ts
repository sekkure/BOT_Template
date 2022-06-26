import { Event } from 'abstractions/Event'
import { Interaction, CacheType, Awaitable } from 'discord.js'
import { YourClient } from 'structure/YourClient'

export default class InteractionEvent extends Event<'interactionCreate'> {
  public name: 'interactionCreate' = 'interactionCreate'
  public execute: (interaction: Interaction<CacheType>) => Awaitable<void> =
    async interaction => {
      const commands = (interaction.client as YourClient).commands

      if (!interaction.isCommand()) return

      const command = commands.get(interaction.commandName)

      if (command) command.execute(interaction)
    }
}
