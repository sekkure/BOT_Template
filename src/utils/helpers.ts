import glob from 'glob'
import { promisify } from 'util'

export function customReaddir(path: string, ext: string[]) {
  const asyncGlob = promisify(glob)
  const fileExt = `{${ext.join(',')}}`
  const formatedPath = path.replace(/\\/g, '/')

  return asyncGlob(`${formatedPath}.${fileExt}`)
}
