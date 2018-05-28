const fillTorrentTarget = (target, match) => {
  let newTarget = target

  newTarget = newTarget.replace('$artist', match.groups.artist)
  newTarget = newTarget.replace('$title', match.groups.title)
  newTarget = newTarget.replace('$date', match.groups.date)
  newTarget = newTarget.replace('$type', match.groups.type)
  newTarget = newTarget.replace('$format', match.groups.format)
  newTarget = newTarget.replace('$quality', match.groups.quality)
  return newTarget
}

const fillCommandLine = (commandLine, torrentName, finalTarget) => {
  let newCommandLine = commandLine

  newCommandLine = newCommandLine.replace('$torrentName', `"${torrentName}"`)
  newCommandLine = newCommandLine.replace('$finalTarget', `"${finalTarget}"`)
  return newCommandLine
}

export {
  fillTorrentTarget,
  fillCommandLine
}
