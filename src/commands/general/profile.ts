import { SlashCommandBuilder } from '@discordjs/builders'
import { Command } from 'abstractions/Command'
import { isSlashCommand } from 'decorators/commands-decorators'
import { RESTPostAPIApplicationCommandsJSONBody } from 'discord-api-types/v9'
import { CacheType, CommandInteraction, MessageEmbed } from 'discord.js'
import { YamaokaClient } from 'structure/YamaokaClient'

@isSlashCommand(true)
export default class HelpCommand extends Command {
  public data: RESTPostAPIApplicationCommandsJSONBody
  public client: YamaokaClient

  constructor(client: YamaokaClient) {
    super()

    this.client = client
    this.data = new SlashCommandBuilder()
      .setName('profile')
      .setDescription('Check your server profile!')
      .addUserOption(option =>
        option
          .setName('user')
          .setDescription('You can select user to check their profile')
      )
      .toJSON()
  }

  async execute(interaction: CommandInteraction<CacheType>) {
    const user = interaction.options.getUser('user') || interaction.user

    const profileEmbed = new MessageEmbed({
      description: `Command invoker: ${user.tag}`,
    })

    interaction.reply({
      embeds: [profileEmbed],
    })
  }
}
