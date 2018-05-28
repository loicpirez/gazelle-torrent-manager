import fs from 'fs'
import matchTorrentWithProfile from './match-torrent-with-profile'
import path from 'path'
import { getGazelleAnnounceLink } from './get-torrent-details'

const handleTorrent = (fileName, data) => {
  const announceUrl = getGazelleAnnounceLink(data)
  matchTorrentWithProfile(fileName, announceUrl)
}

const gazelleTorrentManager = (folder) => {
  fs.readdir(folder, (error, files) => {
    if (error) {
      throw error
    }
    files.forEach(fileName => {
      if (/^.*\.(torrent)$/.test(fileName)) {
        fs.readFile(path.join(__dirname, `/../torrents/${fileName}`), (error, data) => {
          if (error) {
            throw error
          }
          handleTorrent(fileName, data)
        })
      }
    })
  })
}

export default gazelleTorrentManager
