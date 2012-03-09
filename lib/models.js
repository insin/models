var object = require('isomorph/lib/object')

var fields = require('./models/fields')
  , models = require('./models/models')

require('./models/fieldforms')

object.extend(module.exports, models, fields)
