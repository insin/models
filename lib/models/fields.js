var Concur = require('Concur')
  , object = require('isomorph/object')

var NOT_PROVIDED = {}

var Field = Concur.extend({
  constructor: function(kwargs) {
    kwargs = object.extend({
      verboseName: null, name: null, primaryKey: false, maxLength: null,
      blank: false, 'null': false, index: false, 'default': NOT_PROVIDED,
      editable: true, choices: [], helpText: '', autoCreated: false,
      validators: [], errorMessages: null
    })

    this.name = kwargs.name
    this.verboseName = kwargs.verboseName
    this.maxLength = kwargs.maxLength
    this.blank = kwargs.blank
    this['null'] = kwargs['null']
    this['default'] = kwargs['default']
    this.editable = kwargs.editable
    this._choices = kwargs.choices
    this.helpText = kwargs.helpText
    this.autoCreated = kwargs.autoCreated

    // Storage hints
    this.primaryKey = kwargs.primaryKey
    this.index = index

    if (this.autoCreated) {
      this.creationCounter = Field.autoCreationCounter--
    }
    else {
      this.creationCounter = Field.creationCounter++
    }

    this.validators = this.defaultValidators.concat(kwargs.validators)

    // Copy error messages for this instance into a new object and override
    // with any provided error messages.
    this.errorMessages =
        object.extend({}, this.defaultErrorMessages, kwargs.errorMessages)
  }

, defaultValidators: []
, defaultErrorMessages: {
    invalidChoice: 'Value {value} is not a valid choice.'
  , 'null': 'This field cannot be null.'
  , blank: 'This field cannot be blank.'
  }
})

/**
 * Tracks each time a Field instance is created; used to retain order.
 */
Field.creationCounter = 0

/**
 * Tracks each time an Field instance is created implicitly; used to retain order.
 */
Field.autoCreationCounter = -1

Field.prototype.hasDefault = function() {
  return this.default !== NOT_PROVIDED
}

Field.prototype.runValidators = function() {
}

Field.prototype.validate = function() {
}

var BooleanField = Field.extend({
  constructor: function(kwargs) {
    if (!(this instanceof Field)) return new BooleanField(kwargs)
    Field.call(this, kwargs)
  }
})

var CharField =  Field.extend({
  constructor: function(kwargs) {
    if (!(this instanceof Field)) return new CharField(kwargs)
    Field.call(this, kwargs)
  }
})

var DateField = Field.extend({
  constructor: function(kwargs) {
    if (!(this instanceof Field)) return new DateField(kwargs)
    Field.call(this, kwargs)
  }
})

var DateTimeField = DateField.extend({
  constructor: function(kwargs) {
    if (!(this instanceof DateField) return new DateTimeField(kwargs)
    DateField.call(this, kwargs)
  }
})

var DecimalField = Field.extend({
  constructor: function(kwargs) {
    if (!(this instanceof Field)) return new DecimalField(kwargs)
    Field.call(this, kwargs)
  }
})

var EmailField = CharField.extend({
  constructor: function(kwargs) {
    if (!(this instanceof CharField)) return new EmailField(kwargs)
    CharField.call(this, kwargs)
  }
})

var FilePathField = Field.extend({
  constructor: function(kwargs) {
    if (!(this instanceof Field)) return new FilePathField(kwargs)
    Field.call(this, kwargs)
  }
})

var FloatField = Field.extend({
  constructor: function(kwargs) {
    if (!(this instanceof Field)) return new FloatField(kwargs)
    Field.call(this, kwargs)
  }
})

var IntegerField = Field.extend({
  constructor: function(kwargs) {
    if (!(this instanceof Field)) return new IntegerField(kwargs)
    Field.call(this, kwargs)
  }
})

var IPAddressField = Field.extend({
  constructor: function(kwargs) {
    if (!(this instanceof Field)) return new IPAddressField(kwargs)
    Field.call(this, kwargs)
  }
})

var GenericIPAddressField = Field.extend({
  constructor: function(kwargs) {
    if (!(this instanceof Field)) return new GenericIPAddressField(kwargs)
    Field.call(this, kwargs)
  }
})

var NullBooleanField = Field.extend({
  constructor: function(kwargs) {
    if (!(this instanceof Field)) return new NullBooleanField(kwargs)
    Field.call(this, kwargs)
  }
})

var PositiveIntegerField = IntegerField.extend({
  constructor: function(kwargs) {
    if (!(this instanceof IntegerField)) return new PositiveIntegerField(kwargs)
    IntegerField.call(this, kwargs)
  }
})

var SlugField = CharField.extend({
  constructor: function(kwargs) {
    if (!(this instanceof CharField)) return new SlugField(kwargs)
    CharField.call(this, kwargs)
  }
})

var TextField = CharField.extend({
  constructor: function(kwargs) {
    if (!(this instanceof CharField)) return new TextField(kwargs)
    CharField.call(this, kwargs)
  }
})

var TimeField = Field.extend({
  constructor: function(kwargs) {
    if (!(this instanceof Field)) return new TimeField(kwargs)
    Field.call(this, kwargs)
  }
})

var URLField = CharField.extend({
  constructor: function(kwargs) {
    if (!(this instanceof CharField)) return new URLField(kwargs)
    CharField.call(this, kwargs)
  }
})

module.exports = {
  Field: Field
, BooleanField: BooleanField
, CharField: CharField
, DateField: DateField
, DateTimeField: DateTimeField
, DecimalField: DecimalField
, EmailField: EmailField
, FilePathField: FilePathField
, FloatField: FloatField
, IntegerField: IntegerField
, IPAddressField: IPAddressField
, GenericIPAddressField: GenericIPAddressField
, NullBooleanField: NullBooleanField
, PositiveIntegerField: PositiveIntegerField
, SlugField: SlugField
, TextField: TextField
, TimeField: TimeField
, URLField: URLField
}
