// Copyright 2021, University of Colorado Boulder

/**
 * Testing a node trait
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import Node from '../../../../scenery/js/nodes/Node.js';
import wilder from '../../wilder.js';
import inheritance from '../../../../phet-core/js/inheritance.js';

/* eslint-disable */

function memoize<Key,Value>( func: ( k: Key ) => Value ) {
  assert && assert( typeof func === 'function' );

  const map = new Map<Key,Value>();

  return ( key: Key ) => {
    if ( map.has( key ) ) {
      return map.get( key )!;
    }
    else {
      const value = func( key );
      map.set( key, value );
      return value;
    }
  };
}

type Constructor<T = {}> = new ( ...args: any[] ) => T;

// @ts-ignore
const Mixable = memoize( <SuperType extends Constructor>( type: SuperType ) => {
  assert && assert( _.includes( inheritance( type ), Node ) );

  const result = class extends type {
    _someField: string;

    constructor( ...args: any[] ) {
      super( ...args );

      this._someField = 'Testing';
    }

    get someField(): string { return this._someField; }
    set someField( value: string ) { this._someField = value; }

    setVisible( value: boolean ): this {
      console.log( `our bounds: ${( this as unknown as Node ).bounds}` );

      // @ts-ignore
      return super.setVisible( value );
    }
  };

  if ( type.prototype._mutatorKeys ) {
    result.prototype._mutatorKeys = type.prototype._mutatorKeys.concat( [ 'someField' ] );
  }

  return result;
} );

/// THIS WILL BE IN EACH MIXING TYPE
class Mixed extends Mixable( Node ) {

}

//// THIS IS A TEST USAGE
const m = new Mixed();
m.someField = 'foo';
m.pickable = true;

class SubMixed extends Mixed {

}
const s = new SubMixed();
s.someField = 'bar';
s.pickable = true;

wilder.register( 'Mixable', Mixable );
export { Mixed, SubMixed };
export default Mixable;