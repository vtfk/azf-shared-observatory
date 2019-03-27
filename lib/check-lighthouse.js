const axios = require('axios')
const lighthouseUrl = 'https://lighthouse-dot-webdotdevsite.appspot.com/lh/newaudit'

module.exports = async (context, url) => {
  const payload = {
    url: url,
    replace: true,
    save: false
  }
  try {
    const { data } = await axios.post(lighthouseUrl, payload)
    return data.lhrSlim
  } catch (error) {
    context.log.error(error)
    throw error
  }
}
