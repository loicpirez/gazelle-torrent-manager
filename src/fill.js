const fillTorrentTarget = (target, match) => {
  let newTarget = target
  newTarget = target.replace('$artist', match.groups.artist)
  newTarget = target.replace('$title', match.groups.title)
  newTarget = target.replace('$date', match.groups.date)
  newTarget = target.replace('$format', match.groups.format)
  newTarget = target.replace('$quality', match.groups.quality)
  return newTarget
}

const fillCommandLine = (commandLine, fileName, finalTarget) => {

}

export {
  fillTorrentTarget,
  fillCommandLine
}
