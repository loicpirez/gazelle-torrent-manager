import NamedRegExp from 'named-regexp-groups'
import unescapeJs from 'unescape-js'
import { fillTorrentTarget } from './fill'
import { globalConfig } from './get-config'

const getUploadTarget = (currentConfig, fileName) => {
  const regex = new NamedRegExp(unescapeJs(currentConfig.regex))
  const match = regex.exec(fileName)
  const groups = match.groups

  if (
    !groups.artist ||
    !groups.title ||
    !groups.date ||
    !groups.format ||
    !groups.type ||
    !match.groups.quality
  ) {
    console.error('Missing required parameter in fileName.')
  } else {
    return globalConfig.downloadPath + '/' + fillTorrentTarget(currentConfig.formatPath, match)
  }
  return null
}

export default getUploadTarget