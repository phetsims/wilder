// Copyright 2018, University of Colorado Boulder

/**
 * @author AUTHOR
 */
define( function( require ) {
  'use strict';

  // modules
  const inherit = require( 'PHET_CORE/inherit' );
  const interleave = require( 'PHET_CORE/interleave' );
  const Node = require( 'SCENERY/nodes/Node' );
  const Util = require( 'DOT/Util' );
  const wilder = require( 'WILDER/wilder' );

  // constants
  const something = 'foo';

  /**
   * @constructor
   */
  function WilderModel() {
    // block scoping for let/const
    let blocky = 'outside';
    if ( window ) {
      let blocky = 'inside';
      assert && assert( blocky === 'inside' );
    }
    for ( let blocky = 0; blocky <= 0; blocky++ ) {
      assert && assert( blocky === 0 );
    }
    assert && assert( blocky === 'outside' );

    // Expression-based arrow functions
    assert && assert( _.range( 0, 5 ).map( x => x * x )[ 3 ] === 9 );

    // Statement-based arrow functions
    assert && assert( _.range( 0, 5 ).map( x => {
      assert && assert( x < 5 );
      return x * x;
    } )[ 3 ] === 9 );

    var self = this;
    [ 1 ].map( element => {
      assert && assert( this === self );
    } );

    // Default function parameters
    function defaults( x = 1, y = 2, z = 3 ) {
      return x + y + z;
    }
    assert && assert( defaults( 0 ) === 5 );

    // Rest parameters
    function rest( x, y, ...others ) {
      return x + y + others.length;
    }
    assert && assert( rest( 1, 2, 3, 4, 5, 6 ) === 7 );

    // Spread operator
    const constArray = [ 1, 2, 3 ];
    assert && assert( [ ...constArray, 4, 5, ...constArray ].length === 8 );
    assert && assert( rest( 4, ...constArray ) === 7 );

    // String interpolation
    assert && assert( `Testing ${2 + 3}` === 'Testing 5' );

    // Custom interpolation
    function quoter( strings, ...quotations ) {
      return interleave( strings, i => `"${quotations[ i ]}"` ).join( '' );
    }
    assert && assert( quoter`He said ${something} but then answered ${3*2}` === 'He said "foo" but then answered "6"' );

    // Binary
    assert && assert( 0b111 === 3 + 4 );

    // Object shorthand
    const a = 5;
    const b = 4;
    const shortObj = { a, b };
    assert && assert( shortObj.a === a );
    assert && assert( shortObj.b === b );

    // Computed property names
    const computedObj = {
      [ something ]: a
    };
    assert && assert( computedObj[ something ] === a );

    // Method notation
    const methodObj = {
      add( a, b ) {
        return a + b;
      }
    };
    assert && assert( methodObj.add( 1, 2 ) === 3 );

    // Array destructuring
    const arrList = [ 1, 2, 3 ];
    const [ firstElement, , thirdElement ] = arrList;
    assert && assert( firstElement === arrList[ 0 ] );
    assert && assert( thirdElement === arrList[ 2 ] );

    // Object destructuring
    const destObject = {
      cat: 5,
      mouse: {
        animals: [ 1, 2 ]
      },
      bird: 'canary'
    };
    const { cat, bird } = destObject;
    assert && assert( cat === destObject.cat );
    assert && assert( bird === destObject.bird );
    const { cat: tabby } = destObject;
    assert && assert( tabby === destObject.cat );
    const { mouse: { animals } } = destObject;
    assert && assert( animals === destObject.mouse.animals );
    const { unmatched = 'default' } = destObject;
    assert && assert( unmatched === 'default' );

    // Parameter destructuring
    function destruct( { cat, mouse: { animals: [ firstAnimal ] } } ) {
      return cat + firstAnimal;
    }
    assert && assert( destruct( destObject ) === destObject.cat + destObject.mouse.animals[ 0 ] );


    // Class extending current hierarchy
    const MUTATOR_KEYS = [ ...Node.prototype._mutatorKeys, 'secret' ];
    class SecretNode extends Node {
      constructor( options ) {
        // Can't reference `this` before the super() call

        super(); // Can't pass options here, since we don't have a good way of setting up a default before mutate

        // @private {number}
        this._secret = 42;

        this.mutate( options );
      }
      get _mutatorKeys() { return MUTATOR_KEYS; }
      set secret( value ) { this._secret = value; }
      get secret() { return this._secret; }

      // overridden method
      dispose() {
        super.dispose();
        this._secret = 0; // Don't tell!
      }

      static createSecretNode() { return new SecretNode( { secret: 0 } ); }
    }
    assert && assert( new SecretNode( { secret: 5 } ).secret === 5 );
    assert && assert( new SecretNode( { opacity: 0.5 } ).opacity === 0.5 );
    assert && assert( SecretNode.createSecretNode().secret === 0 );

    // Iterable class (with a generator method)
    class RelativePrimes {
      constructor( n ) {
        // @private {number}
        this.n = n;
      }
      *[Symbol.iterator]() {
        for ( let i = 1;; i++ ) {
          if ( Util.gcd( i, this.n ) === 1 ) {
            yield i;
          }
        }
      }
    }
    // Find all relative primes to 5 less than 12.
    const relativePrimes = [];
    for ( const n of new RelativePrimes( 5 ) ) {
      if ( n >= 12 ) { break; }
      relativePrimes.push( n );
    }
    assert && assert( _.isEqual( relativePrimes, [ 1, 2, 3, 4, 6, 7, 8, 9, 11 ] ) );

    // Sets
    const bag = new Set();
    bag.add( 'a' ).add( 'b' ).add( 'a' );
    assert && assert( bag.size === 2 );
    assert && assert( bag.has( 'a' ) );
    assert && assert( !bag.has( 'c' ) );

    // Maps
    const map = new Map();
    map.set( bag, 5 );
    map.set( Node, 2 );
    assert && assert( map.get( bag ) === 5 );
    assert && assert( map.get( Node ) === 2 );

    // TODO: generator function method notation fun*(...){}
    // TODO: modules?
    // TODO: more about classes (SR: there is a start in WilderNode).
    // TODO: use Symbols (?) and see if they work for enumerations. Can Symbol.for() be used for phet-io tandems?
    // TODO: async/await checks?
    // TODO: Promises and generators with https://babeljs.io/docs/en/babel-polyfill/
    // TODO: Object.assign instead of _extend?
  }

  wilder.register( 'WilderModel', WilderModel );

  return inherit( Object, WilderModel, {

    // @public resets the model
    reset: function() {
      //TODO reset things here
    },

    //TODO Called by the animation loop. Optional, so if your model has no animation, please delete this.
    // @public
    step: function( dt ) {
      //TODO Handle model animation here.
    }
  } );
} );