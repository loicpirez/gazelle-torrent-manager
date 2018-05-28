import parseTorrent from 'parse-torrent'

const getTorrentDetails = (torrentData) => {
  return parseTorrent(torrentData)
}

const getGazelleAnnounceLink = (torrentData) => {
  const torrentDetails = getTorrentDetails(torrentData)
  // Gazelle torrents does have only have one announce.
  const announce = torrentDetails.announce[0]

  return announce
}

export { getGazelleAnnounceLink }

export default getTorrentDetails
