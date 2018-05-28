import getUploadTarget from './get-upload-target'
import uploadTorrent from './upload-torrent'
import getAllProfile from './get-all-profile'
import { getProfileConfig } from './get-config'

const matchTorrentWithProfile = (torrentName, announceUrl, torrentFolderLocation) => {
  Object.keys(getAllProfile()).map(index => {
    const currentConfig = getProfileConfig(index)
    if (announceUrl.indexOf(currentConfig.announceUrl) === 0) {
      const uploadTarget = getUploadTarget(
        currentConfig,
        torrentName
      )
      if (uploadTarget) {
        console.log(`"${torrentName}" should be in "${uploadTarget}" ...`)
        if (!currentConfig.shouldUpload) {
          console.log('Skipping upload as shouldUpload is set to false.')
        } else {
          uploadTorrent(currentConfig, torrentName, uploadTarget, torrentFolderLocation)
        }
      }
    }
  })
}

export default matchTorrentWithProfile
