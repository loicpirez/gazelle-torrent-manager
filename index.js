import GazelleTorrentManager from './gazelle-torrent-manager'
import path from 'path'

// TODO: log and report error, exit status, config from env / clin doc, test, etc.

console.log('[Gazelle Torrents Manager]')
GazelleTorrentManager(path.join(__dirname, '/../torrents/'))
