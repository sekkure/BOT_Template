export function isSlashCommand(type: boolean) {
  return function (target: Function) {
    target.prototype.isSlashCommand = type
  }
}
