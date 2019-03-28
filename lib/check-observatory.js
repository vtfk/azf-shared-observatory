const axios = require('axios')
const sleep = require('then-sleep')
const qs = require('querystring')
const apiUrl = 'https://http-observatory.security.mozilla.org/api/v1'
const calculateScore = require('../lib/calculate-score')

module.exports = async (context, site) => {
  return new Promise(async (resolve, reject) => {
    const url = `${apiUrl}/analyze?host=${site}`
    const options = {
      hidden: true,
      rescan: true
    }
    await axios.post(url, qs.stringify(options))
    context.log(`check-observatory - ${site} - got data`)

    const scan = async () => {
      await sleep(2500)
      const { data } = await axios.get(url)
      if (data.state === 'FINISHED') {
        context.log(`check-observatory - ${site} - finished`)
        return resolve([
          {
            name: 'observatory',
            score: calculateScore(data.grade),
            grade: data.grade
          }
        ])
      } else {
        context.log(`check-observatory - ${site} - not finished`)
        await scan()
      }
    }

    await scan()
  })
}
