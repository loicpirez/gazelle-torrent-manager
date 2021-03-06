import config from '../config.json'

const getGlobalConfig = () => {
  return {
    downloadPath: config.download_path,
    formatPath: config.format_path
  }
}

const getProfileConfig = (index) => {
  return {
    announceUrl: config['profile'][index].announce_url,
    commandLine: config['profile'][index].command_line,
    shouldUpload: config['profile'][index].should_upload,
    regex: config['profile'][index].regex
  }
}

export { getGlobalConfig, getProfileConfig }
