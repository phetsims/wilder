// Copyright 2021, University of Colorado Boulder

/**
 * Testing a node trait
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import Node from '../../../../scenery/js/nodes/Node.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import wilder from '../../wilder.js';
import inheritance from '../../../../phet-core/js/inheritance.js';

// Just memoizes first argument
function memoize<Key, Value>( func: ( k: Key, ...args: any[] ) => Value ) {
  assert && assert( typeof func === 'function' );

  const map = new Map<Key, Value>();

  return ( key: Key, ...args: any[] ) => {
    if ( map.has( key ) ) {
      return map.get( key )!;
    }
    else {
      const value = func( key, ...args );
      map.set( key, value );
      return value;
    }
  };
}

type Constructor<T = {}> = new ( ...args: any[] ) => T;

const MIXIN_PARAMETER_COUNT = 1;
const Mixable = memoize( <SuperType extends Constructor>( type: SuperType, superParameterCount: number ) => {
  assert && assert( _.includes( inheritance( type ), Node ) );

  const result = class extends type {
    _someField: string;

    // Call args to be (Node, ...args: any[])
    constructor( ...args: any[] ) {
      const node = args[ 0 ] as Node;
      assert && assert( node instanceof Node );
      const superArguments = args.slice( MIXIN_PARAMETER_COUNT ).slice( 0, superParameterCount );
      const nodeOptions = args[ superParameterCount + MIXIN_PARAMETER_COUNT ] as ( {} | undefined );

      console.log( `mixable passed a node: ${node}` );
      console.log( `mixable passed node options: ${JSON.stringify( nodeOptions )}` );

      super( ...superArguments );

      this._someField = 'Testing';

      ( this as unknown as Node ).addChild( node );

      ( this as unknown as Node ).mutate( nodeOptions );
    }

    get someField(): string { return this._someField; }

    set someField( value: string ) { this._someField = value; }

    /**
     * @public
     * @override
     */
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
class NodeMixed extends Mixable( Node, 0 ) {
  constructor( node: Node, options?: {} ) {
    // @ts-ignore
    super( node, options );
  }
}

class TextMixed extends Mixable( Text, 1 ) {
  constructor( node: Node, text: string, options?: {} ) {
    // @ts-ignore
    super( node, text, options );
  }
}

//// THIS IS A TEST USAGE
const m = new NodeMixed( new Node(), { someField: 'foo' } );
console.log( `my foo: ${m.someField}` );
const t = new TextMixed( new Node(), 'This is TextMixed', { someField: 'bar' } );
console.log( `my bar: ${t.someField}` );

wilder.register( 'Mixable', Mixable );
export { NodeMixed, TextMixed };
export default Mixable;