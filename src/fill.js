const fillTorrentTarget = (target, match) => {
  target = target.replace('$artist', match.groups.artist)
  target = target.replace('$title', match.groups.title)
  target = target.replace('$date', match.groups.date)
  target = target.replace('$type', match.groups.type)
  target = target.replace('$format', match.groups.format)
  target = target.replace('$quality', match.groups.quality)
  return target
}

const fillCommandLine = (commandLine, torrentName, pathTarget) => {
  commandLine = commandLine.replace('$torrentName', `"${torrentName}"`)
  commandLine = commandLine.replace('$pathTarget', `"${pathTarget}"`)
  return commandLine
}

export {
  fillTorrentTarget,
  fillCommandLine
}
