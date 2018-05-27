import parseTorrent from 'parse-torrent'
import path from 'path'
import fs from 'fs'
import config from '../config.json'
import unescapeJs from 'unescape-js'
import NamedRegExp from 'named-regexp-groups'

const matchTorrentWithProfile = (fileName, torrentDetails) => {
  // Getting only first announce is okay.
  // Gazelle torrents does have only have one.
  let announceUrl = torrentDetails.announce[0]

  Object.keys(config.profile).map(index => {
    const currentProfile = config.profile[index]
    const downloadPath = config.download_path
    let target = config.format

    if (announceUrl.indexOf(currentProfile.announce_url) === 0) {
      const regex = new NamedRegExp(unescapeJs(currentProfile.regex))
      const match = regex.exec(fileName)
      if (!match.groups.artist || !match.groups.title || !match.groups.date || !match.groups.format || !match.groups.type || !match.groups.quality) {
        throw new Error('Missing required regexp parameter')
      }
      target = target.replace('artist', match.groups.artist)
      target = target.replace('title', match.groups.title)
      target = target.replace('date', match.groups.date)
      target = target.replace('format', match.groups.format)
      target = target.replace('quality', match.groups.quality)
      const finalTarget = downloadPath + '/' + target
      console.log(`"${fileName}" => "${finalTarget}"`)
    }
  })
}

const handleTorrent = (fileName, data) => {
  const torrentData = parseTorrent(data)
  matchTorrentWithProfile(fileName, torrentData)
}

function gazelleTorrentManager (folder) {
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
