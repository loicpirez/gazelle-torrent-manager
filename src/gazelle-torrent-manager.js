import fs from 'fs'
import matchTorrentWithProfile from './match-torrent-with-profile'
import path from 'path'
import { getGazelleAnnounceLink } from './get-torrent-details'

const handleTorrent = (torrentName, data, torrentFolderLocation) => {
  const announceUrl = getGazelleAnnounceLink(data)
  matchTorrentWithProfile(torrentName, announceUrl, torrentFolderLocation)
}

const gazelleTorrentManager = (torrentFolderLocation) => {
  fs.readdir(torrentFolderLocation, (error, files) => {
    if (error) {
      throw error
    }
    files.forEach(torrentName => {
      if (/^.*\.(torrent)$/.test(torrentName)) {
        fs.readFile(path.join(torrentFolderLocation, torrentName), (error, data) => {
          if (error) {
            throw error
          }
          handleTorrent(torrentName, data, torrentFolderLocation)
        })
      }
    })
  })
}

export default gazelleTorrentManager
