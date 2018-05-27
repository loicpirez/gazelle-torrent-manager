import getUploadTarget from './get-upload-target'
import uploadTorrent from './upload-torrent'
import { getAllProfile } from './get-all-profile'
import { getProfileConfig } from './get-config'

const matchTorrentWithProfile = (fileName, torrentDetails) => {
  // Gazelle torrents does have only have one announce.
  let announceUrl = torrentDetails.announce[0]

  Object.keys(getAllProfile()).map(index => {
    const currentConfig = getProfileConfig(index)
    if (announceUrl.indexOf(currentConfig.announceUrl) === 0) {
      const uploadTarget = getUploadTarget(
        currentConfig,
        fileName
      )
      if (uploadTarget) {
        console.log(`"${fileName}" should be in "${uploadTarget}" ...`)
        if (!currentConfig.shouldUpload) {
          console.log('Skipping upload as shouldUpload is set to false.')
        } else {
          uploadTorrent(fileName, uploadTarget)
        }
      }
    }
  })
}

export default matchTorrentWithProfile
