// Copyright 2021, University of Colorado Boulder
import Property from '../../../../axon/js/Property.js';
import StringIO from '../../../../tandem/js/types/StringIO.js';

class StringEnumerationProperty<T> extends Property<T> {
  constructor( values: readonly T[], value: T, options?: any ) {
    options = options || {};
    options.validValues = values;
    options.phetioType = Property.PropertyIO( StringIO );
    super( value, options );
  }
}

export default StringEnumerationProperty;