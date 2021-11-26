// Copyright 2021, University of Colorado Boulder

/**
 * Testing a node trait
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import { Node } from '../../../../scenery/js/imports.js';
import { Text } from '../../../../scenery/js/imports.js';
import wilder from '../../wilder.js';
import inheritance from '../../../../phet-core/js/inheritance.js';
import merge from '../../../../phet-core/js/merge.js';
import extend from '../../../../phet-core/js/extend.js';

// Just memoizes first argument.
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

      // console.log( `mixable passed a node: ${node}` );
      // console.log( `mixable passed node options: ${JSON.stringify( nodeOptions )}` );

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
      // console.log( `our bounds: ${( this as unknown as Node ).bounds}` );

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

//////////////////////////////////////////////////////
const GenericMixin = <SuperType extends Constructor, T>( type: SuperType, defaultValue: T ) => {
  return class extends type {
    _someField: T;

    constructor( ...args: any[] ) {
      super( ...args );

      this._someField = defaultValue;
    }

    get someField(): T { return this._someField; }

    set someField( value: T ) { this._someField = value; }
  };
};
class MixBase {}
class GenericMixed extends GenericMixin( MixBase, 5 ) {}
const g = new GenericMixed();
console.log( g.someField );

//////////////////////////////////////////////////////
type PoolableOptions<Type extends Constructor> = {
  defaultArguments?: ConstructorParameters<Type>,
  initialize?: PoolableInitializer<Type>,
  maxSize?: number,
  initialSize?: number,
  useDefaultConstruction?: boolean
};
interface PoolableInstance {
  freeToPool(): void
}
type PoolableVersion<Type extends Constructor> = InstanceType<Type> & PoolableInstance;
type PoolableInitializer<Type extends Constructor> = ( ...args: ConstructorParameters<Type> ) => any;
type PoolableClass<Type extends Constructor> = ( new ( ...args: ConstructorParameters<Type> ) => ( PoolableVersion<Type> ) ) & PoolableType<Type>;
interface PoolableType<Type extends Constructor> {
  pool: PoolableVersion<Type>[]
  dirtyFromPool(): PoolableVersion<Type>
  createFromPool( ...args: ConstructorParameters<Type> ): PoolableVersion<Type>
  get poolSize(): number
  set maxPoolSize( value: number )
  get maxPoolSize(): number
}
const Poolable = <Type extends Constructor>( type: Type, options?: PoolableOptions<Type> ) : PoolableClass<Type> => {
  const filledOptions = merge( {
    // {Array.<*>} - If an object needs to be created without a direct call (say, to fill the pool initially), these
    // are the arguments that will be passed into the constructor
    defaultArguments: [],

    // {function} - The function to call on the objects to reinitialize them (that is either the constructor, or
    // acts like the constructor).
    initialize: type.prototype.initialize,

    // {number} - A limit for the pool size (so we don't leak memory by growing the pool faster than we take things
    // from it). Can be customized by setting Type.maxPoolSize
    maxSize: 100,

    // {number} - The initial size of the pool. To fill it, objects will be created with the default arguments.
    initialSize: 0,

    // {boolean} - If true, when constructing the default arguments will always be used (and then initialized with
    // the initializer) instead of just providing the arguments straight to the constructor.
    useDefaultConstruction: false
  }, options ) as Required<PoolableOptions<Type>>;

  assert && assert( filledOptions.maxSize >= 0 );
  assert && assert( filledOptions.initialSize >= 0 );

  // {Array.<type>} - The actual array we store things in. Always push/pop.
  const pool: InstanceType<Type>[] = [];

  let maxPoolSize = filledOptions.maxSize;

  // {function} - There is a madness to this craziness. We'd want to use the method noted at
  // https://stackoverflow.com/questions/1606797/use-of-apply-with-new-operator-is-this-possible, but the type is
  // not provided in the arguments array below. By calling bind on itself, we're able to get a version of bind that
  // inserts the constructor as the first argument of the .apply called later so we don't create garbage by having
  // to pack `arguments` into an array AND THEN concatenate it with a new first element (the type itself).
  const partialConstructor = Function.prototype.bind.bind( type, type );

  // {function} - Basically our type constructor, but with the default arguments included already.
  const DefaultConstructor = partialConstructor( ...filledOptions.defaultArguments );

  const initialize = filledOptions.initialize;
  const useDefaultConstruction = filledOptions.useDefaultConstruction;

  const proto = type.prototype;

  extend( type, {
    /**
     * @private {Array.<type>} - This should not be modified externally. In the future if desired, functions could
     * be added to help adding/removing poolable instances manually.
     */
    pool: pool,

    /**
     * Returns an object with arbitrary state (possibly constructed with the default arguments).
     * @public
     *
     * @returns {type}
     */
    dirtyFromPool(): PoolableVersion<Type> {
      return pool.length ? pool.pop() : new DefaultConstructor();
    },

    /**
     * Returns an object that behaves as if it was constructed with the given arguments. May result in a new object
     * being created (if the pool is empty), or it may use the constructor to mutate an object from the pool.
     * @public
     */
    createFromPool( ...args: ConstructorParameters<Type> ): PoolableVersion<Type> {
      let result;

      if ( pool.length ) {
        result = pool.pop();
        initialize.apply( result, args );
      }
      else if ( useDefaultConstruction ) {
        result = new DefaultConstructor();
        initialize.apply( result, args );
      }
      else {
        result = new ( partialConstructor( ...args ) )();
      }

      return result;
    },

    /**
     * Returns the current size of the pool.
     * @public
     *
     * @returns {number}
     */
    get poolSize() {
      return pool.length;
    },

    /**
     * Sets the maximum pool size.
     * @public
     *
     * @param {number} value
     */
    set maxPoolSize( value ) {
      assert && assert( value === Number.POSITIVE_INFINITY || ( Number.isInteger( value ) && value >= 0 ), 'maxPoolSize should be a non-negative integer or infinity' );

      maxPoolSize = value;
    },

    /**
     * Returns the maximum pool size.
     * @public
     *
     * @returns {number}
     */
    get maxPoolSize() {
      return maxPoolSize;
    }
  } );

  extend( proto, {
    /**
     * Adds this object into the pool, so that it can be reused elsewhere. Generally when this is done, no other
     * references to the object should be held (since they should not be used at all).
     * @public
     */
    freeToPool() {
      if ( pool.length < maxPoolSize ) {
        pool.push( this );
      }
    }
  } );

  // Initialize the pool (if it should have objects)
  while ( pool.length < filledOptions.initialSize ) {
    pool.push( new DefaultConstructor() );
  }

  return type as unknown as PoolableClass<Type>;
};

const Vector = Poolable( class Vector {
  x!: number
  y!: number

  constructor( x: number, y: number ) {
    this.initialize( x, y );
  }

  // @public
  initialize( x: number, y: number ) {
    this.x = x;
    this.y = y;
  }
}, {
  defaultArguments: [ 0, 0 ]
} );

const q = new Vector( 1, 2 );
q.freeToPool();
const q1 = Vector.createFromPool( 4, 5 );
q1.freeToPool();
const q2 = Vector.dirtyFromPool();
console.log( `x: ${q2.x}, y: ${q2.y}` );
console.log( q instanceof Vector );

wilder.register( 'Mixable', Mixable );
export { NodeMixed, TextMixed, Vector };
export default Mixable;