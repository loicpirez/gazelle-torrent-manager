import parseTorrent from 'parse-torrent'
import fs from 'fs'
import config from '../config.json'
import unescapeJs from 'unescape-js'

export default class gazelleTorrentManager {
  constructor(path) {
    this.torrentList = []
    this.readDirectory(path)
  }

  getTorrentDetails(fileName) {
    return new Promise((resolve, reject) => {
      if (/^.*\.(torrent)$/.test(fileName)) {
        let torrentDetails = parseTorrent(fs.readFileSync(__dirname + `/../torrents/${fileName}`))
        this.torrentList.push({
          fileName,
          torrentDetails
        })
      }
    })
  }

  matchTorrentWithProfile() {
    // Getting only first announce is okay.
    // Gazelle torrents does have only have one.
    // console.log(this.torrentList)
    console.log(this.torrentList)
    this.torrentList.map(torrent => {
      console.log(torrent)
    })
    // let announceUrl = torrentDetails.announce[0]
    // Object.keys(config.profile).map(index => { // TODO: Faire çà a part, pas pendant chaque torrent. Faire depuis
    //   let currentProfile = config.profile[index]
    //   if (announceUrl.indexOf(currentProfile.announce_url) == 0) {
    //     console.log(unescapeJs(currentProfile.regex))
    //   }
    // })
  }

  readDirectory(folder) {
    try {
      new Promise((resolve, reject) => {
          fs.readdir(folder, (err, files) => {
            files.forEach(file => {
              this.getTorrentDetails(file)
            })
          })
        })
        .then(this.matchTorrentWithProfile())
    } catch (err) {
      console.error(err)
    }
  }
}
