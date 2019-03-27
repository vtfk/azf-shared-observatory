const checkObservatory = require('../lib/check-observatory')

module.exports = async function (context, mySbMsg) {
  context.log(`azf-shared-observatory - ${mySbMsg.eventSourceId} - start`)
  const host = mySbMsg.host
  try {
    context.log(`azf-shared-observatory - ${mySbMsg.eventSourceId} - host - ${host} - observatory - start`)
    let result = await checkObservatory(context, host)
    context.log(`azf-shared-observatory - ${mySbMsg.eventSourceId} - host - ${host} - observatory - success`)
    context.bindings.mySbQueue = Object.assign({}, mySbMsg, { domain: 'webquality', category: 'observatory', result: result })
    context.log(`azf-shared-observatory - ${mySbMsg.eventSourceId} - host - ${host} - finished`)
  } catch (error) {
    context.log.error(`azf-shared-observatory - ${mySbMsg.eventSourceId} - host - ${host} - ${error}`)
  }
}
