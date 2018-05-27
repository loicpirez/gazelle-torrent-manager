import fs from 'fs'
import matchTorrentWithProfile from './match-torrent-with-profile'
import parseTorrent from 'parse-torrent'
import path from 'path'

const handleTorrent = (fileName, data) => {
  const torrentData = parseTorrent(data)
  matchTorrentWithProfile(fileName, torrentData)
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
