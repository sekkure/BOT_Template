import { Awaitable, Base, ClientEvents } from 'discord.js'

export abstract class Event<T extends keyof ClientEvents> extends Base {
  abstract name: T
  abstract execute: (...args: [...ClientEvents[T]]) => PromiseLike<void> | Awaitable<void>
}
