import fs from 'fs'
import matchTorrentWithProfile from './match-torrent-with-profile'
import path from 'path'
import uploadTorrent from './upload-torrent'
import { fillCommandLine } from './fill'
import { getGazelleAnnounceLink } from './get-torrent-details'

const handleTorrent = (torrentName, rawData, torrentFolderLocation) => {
  const announceUrl = getGazelleAnnounceLink(rawData)
  const matchedTorrent = matchTorrentWithProfile(torrentName, announceUrl, torrentFolderLocation)

  if (matchedTorrent.target) {
    console.log(`"${torrentName}" should be in "${matchedTorrent.target}" ...`)
    if (!matchedTorrent.config.shouldUpload) {
      console.log('Skipping upload as shouldUpload is set to false.')
    } else {
      const commandLine = fillCommandLine(
        matchedTorrent.config.commandLine,
        torrentFolderLocation + torrentName,
        matchedTorrent.target
      )
      uploadTorrent(commandLine)
    }
  } else {
    console.error('Torrent could not be matched !')
  }
}

const gazelleTorrentManager = (torrentFolderLocation) => {
  fs.readdir(torrentFolderLocation, (error, files) => {
    if (error) {
      throw error
    }
    files.forEach(torrentName => {
      if (/^.*\.(torrent)$/.test(torrentName)) {
        fs.readFile(path.join(torrentFolderLocation, torrentName), (error, rawData) => {
          if (error) {
            throw error
          }
          handleTorrent(torrentName, rawData, torrentFolderLocation)
        })
      }
    })
  })
}

export default gazelleTorrentManager
