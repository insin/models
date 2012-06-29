var forms = require('newforms')
  , object = require('isomorph/object')

var fields = require('./fields')

/**
 * Creates a newforns Field for this Field.
 */
fields.Field.prototype.formField = function(kwargs) {
  kwargs = object.extend({constructor: forms.CharField}, kwargs)
  defaults = {required: !this.blank}
  if (this.hasDefault()) {
    defaults.initial = this.default
  }
  var fieldConstructor = kwargs.constructor
  delete kwargs.constructor
  object.extend(defaults, kwargs)
  return new fieldConstructor(defaults)
}
