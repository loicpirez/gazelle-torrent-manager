import { fillCommandLine } from './fill'

const uploadTorrent = (currentConfig, torrentName, finalTarget, torrentFolderLocation) => {
  const commandLine = fillCommandLine(currentConfig.commandLine, torrentFolderLocation + torrentName, finalTarget)
  console.log(commandLine)
}

export default uploadTorrent
