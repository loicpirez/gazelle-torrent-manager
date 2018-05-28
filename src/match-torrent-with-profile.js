import getUploadTarget from './get-upload-target'
import getAllProfile from './get-all-profile'
import { getProfileConfig } from './get-config'

const matchTorrentWithProfile = (torrentName, announceUrl, torrentFolderLocation) => {
  let matchedTorrent = null

  Object.keys(getAllProfile()).map(index => {
    const currentConfig = getProfileConfig(index)
    if (announceUrl.indexOf(currentConfig.announceUrl) === 0) {
      const uploadTarget = getUploadTarget(
        currentConfig,
        torrentName
      )
      matchedTorrent = {
        target: uploadTarget,
        config: currentConfig
      }
    }
  })
  return matchedTorrent
}

export default matchTorrentWithProfile
