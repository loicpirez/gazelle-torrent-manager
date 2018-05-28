import NamedRegExp from 'named-regexp-groups'
import unescapeJs from 'unescape-js'
import { fillTorrentTarget } from './fill'
import { getGlobalConfig } from './get-config'

const getUploadTarget = (currentConfig, torrentName) => {
  const regex = new NamedRegExp(unescapeJs(currentConfig.regex))
  const globalConfig = getGlobalConfig()
  const match = regex.exec(torrentName)
  const groups = match.groups

  if (
    !groups.artist ||
    !groups.title ||
    !groups.date ||
    !groups.format ||
    !groups.type ||
    !match.groups.quality
  ) {
    console.error('Missing required parameter in torrentName.')
  } else {
    return globalConfig.downloadPath + '/' + fillTorrentTarget(globalConfig.formatPath, match)
  }
  return null
}

export default getUploadTarget
