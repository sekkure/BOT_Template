import { Event } from 'abstractions/Event'
import { Awaitable, Client } from 'discord.js'

export default class ReadyEvent extends Event<'ready'> {
  public name: 'ready' = 'ready'
  public execute: (client: Client<true>) => Awaitable<void> = async client => {
    console.log(client.user.username + ' log in!')
  }
}
