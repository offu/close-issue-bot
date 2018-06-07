import * as yaml from 'js-yaml'
import * as fs from 'fs'
import { BotConfig, isBotConfig } from './models'

/**
 * Parse the file according to the path into BotConfig
 */
export function parseConfig (path: string): BotConfig {
  const data = yaml.safeLoad(fs.readFileSync(path, 'utf-8'))
  if (!isBotConfig(data)) {
    throw new Error('invalid config')
  } else {
    return data
  }
}

export function shouldClose (botConfig: BotConfig, content: string): boolean {
  return !botConfig.issueConfigs.some((issueConfig) => {
    return issueConfig.content.every((issueContent) => {
      return content.includes(issueContent)
    })
  })
}
