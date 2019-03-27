const checkObservatory = require('../lib/check-observatory')

module.exports = async function (context, mySbMsg) {
  context.log(`job received - ${mySbMsg.id} - start`)
  const pageUrl = mySbMsg.url
  try {
    context.log(`job - ${mySbMsg.id} - url - ${pageUrl} - lookup - start`)
    let result = await checkObservatory(context, pageUrl)
    context.log(`job - ${mySbMsg.id} - url - ${pageUrl} - lookup - success`)
    context.bindings.mySbQueue = Object.assign({}, mySbMsg, { result: result })
    context.log(`job - ${mySbMsg.id} - finished`)
  } catch (error) {
    context.log.error(`job - ${mySbMsg.id} - ${pageUrl} - ${error}`)
  }
}
