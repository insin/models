var Concur = require('Concur')
  , object = require('isomorph/lib/object')

var fields = require('./fields')

/**
 * Meta-info about a model.
 */
function ModelOptions(meta) {
  this.meta = meta
  this.name = meta.name
  this['abstract'] = meta['abstract'] || false
  this.displayName = meta.displayName || meta.name
  this.displayNamePlural = meta.displayNamePlural || this.displayName + 's'
  this.fields = []
  this.ordering = meta.ordering || []
}

/**
 * Prepares a ModelOptions for the extended Model and places it in a
 * _meta property on the prototype and constructor.
 */
function DeclarativeFieldsMeta(prototypeProps, constructorProps) {
  if (typeof prototypeProps.Meta == 'undefined' ||
      typeof prototypeProps.Meta.name == 'undefined') {
    throw new Error('When extending Model, you must provide a name via a Meta object.')
  }

  var options = new ModelOptions(prototypeProps.Meta)
  delete prototypeProps.Meta

  for (var prop in prototypeProps) {
    if (prototypeProps.hasOwnProperty(prop)) {
      var field = prototypeProps[prop]
      if (field instanceof fields.Field) {
        field.name = prop
        options.fields.push(field)
        delete prototypeProps[prop]
      }
    }
  }

  prototypeProps._meta = constructorProps._meta = options
  constructorProps.name = options.name
}

var Model = Concur.extend({
  __meta__: DeclarativeFieldsMeta

, constructor: function(props) {
    object.extend(this, props)
  }
})

/*
Model.prototype._cleanFields = function(exclude) {
  exclude = lookup(exclude || [])
  for (var name in this._meta.fields)
  {
    if (!object.hasOwn(this.fields, name) ||
        typeof exclude[name] != 'undefined') {
      continue
    }

    var field = this.fields[name]
        // valueFromData() gets the data from the data objects.
        // Each widget type knows how to retrieve its own data, because some
        // widgets split data over several HTML fields.
      , value = field.widget.valueFromData(this.data, this.files,
                                           this.addPrefix(name))
    try {
      if (field instanceof FileField) {
        var initial = object.get(this.initial, name, field.initial)
        value = field.clean(value, initial)
      }
      else {
        value = field.clean(value)
      }
      this.cleanedData[name] = value

      // Try clean_name
      var customClean = 'clean_' + name
      if (typeof this[customClean] != 'undefined' &&
          is.Function(this[customClean])) {
         this.cleanedData[name] = this[customClean]()
         continue
      }

      // Try cleanName
      customClean = 'clean' + name.charAt(0).toUpperCase() +
                    name.substr(1)
      if (typeof this[customClean] != 'undefined' &&
          is.Function(this[customClean])) {
        this.cleanedData[name] = this[customClean]()
      }
    }
    catch (e) {
      if (!(e instanceof ValidationError)) {
        throw e
      }
      this._errors.set(name, new this.errorConstructor(e.messages))
      if (typeof this.cleanedData[name] != 'undefined') {
        delete this.cleanedData[name]
      }
    }
  }
}

Model.prototype._cleanForm = function() {
  try {
    this.cleanedData = this.clean()
  }
  catch (e) {
    if (!(e instanceof ValidationError)) {
      throw e
    }
    this._errors.set(NON_FIELD_ERRORS,
                     new this.errorConstructor(e.messages))
  }
}
*/

module.exports = {
  Model: Model
, ModelOptions: ModelOptions
}
