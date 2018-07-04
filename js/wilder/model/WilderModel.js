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
  const wilder = require( 'WILDER/wilder' );

  // Commented out for the currently-unsupported ES6 features
  // const Util = require( 'DOT/Util' );

  // constants
  const something = 'foo';

  /**
   * @constructor
   */
  function WilderModel() {
    // We want a built version to error out for these "asserts"
    function hardAssert( condition, message = '' ) {
      if ( !condition ) {
        throw new Error( message );
      }
    }

    // block scoping for let/const
    let blocky = 'outside';
    if ( window ) {
      let blocky = 'inside';
      hardAssert( blocky === 'inside' );
    }
    for ( let blocky = 0; blocky <= 0; blocky++ ) {
      hardAssert( blocky === 0 );
    }
    hardAssert( blocky === 'outside' );

    // Expression-based arrow functions
    hardAssert( _.range( 0, 5 ).map( x => x * x )[ 3 ] === 9 );

    // Statement-based arrow functions
    hardAssert( _.range( 0, 5 ).map( x => {
      hardAssert( x < 5 );
      return x * x;
    } )[ 3 ] === 9 );

    var self = this;
    [ 1 ].map( element => {
      hardAssert( this === self );
    } );

    // Default function parameters
    function defaults( x = 1, y = 2, z = 3 ) {
      return x + y + z;
    }
    hardAssert( defaults( 0 ) === 5 );

    // Rest parameters
    function rest( x, y, ...others ) {
      return x + y + others.length;
    }
    hardAssert( rest( 1, 2, 3, 4, 5, 6 ) === 7 );

    // Spread operator
    const constArray = [ 1, 2, 3 ];
    hardAssert( [ ...constArray, 4, 5, ...constArray ].length === 8 );
    hardAssert( rest( 4, ...constArray ) === 7 );

    // String interpolation
    hardAssert( `Testing ${2 + 3}` === 'Testing 5' );

    // Custom interpolation
    function quoter( strings, ...quotations ) {
      return interleave( strings, i => `"${quotations[ i ]}"` ).join( '' );
    }
    hardAssert( quoter`He said ${something} but then answered ${3*2}` === 'He said "foo" but then answered "6"' );

    const multiLineString = `This
 is a test of the emergency
 newline system`;
    hardAssert( multiLineString.length === 48 );

    // Binary
    hardAssert( 0b111 === 3 + 4 );

    // Object shorthand
    const a = 5;
    const b = 4;
    const shortObj = { a, b };
    hardAssert( shortObj.a === a );
    hardAssert( shortObj.b === b );

    // Computed property names
    const computedObj = {
      [ something ]: a
    };
    hardAssert( computedObj[ something ] === a );

    // Method notation
    const methodObj = {
      add( a, b ) {
        return a + b;
      }
    };
    hardAssert( methodObj.add( 1, 2 ) === 3 );

    // Array destructuring
    const arrList = [ 1, 2, 3 ];
    const [ firstElement, , thirdElement ] = arrList;
    hardAssert( firstElement === arrList[ 0 ] );
    hardAssert( thirdElement === arrList[ 2 ] );

    // Swapping with destructuring
    let arf = 5;
    let woof = 10;
    [ arf, woof ] = [ woof, arf ];
    hardAssert( arf === 10 );
    hardAssert( woof === 5 );

    // Object destructuring
    const destObject = {
      cat: 5,
      mouse: {
        animals: [ 1, 2 ]
      },
      bird: 'canary'
    };
    const { cat, bird } = destObject;
    hardAssert( cat === destObject.cat );
    hardAssert( bird === destObject.bird );
    const { cat: tabby } = destObject;
    hardAssert( tabby === destObject.cat );
    const { mouse: { animals } } = destObject;
    hardAssert( animals === destObject.mouse.animals );
    const { unmatched = 'default' } = destObject;
    hardAssert( unmatched === 'default' );

    // Parameter destructuring
    function destruct( { cat, mouse: { animals: [ firstAnimal ] } } ) {
      return cat + firstAnimal;
    }
    hardAssert( destruct( destObject ) === destObject.cat + destObject.mouse.animals[ 0 ] );

    // Options object destructuring with defaults
    const optionsObject = {
      tree: 4,
      forest: 5
    };
    const {
      tree = 12,
      forest = 100,
      leaf = 1024
    } = optionsObject || {};
    hardAssert( tree === 4 );
    hardAssert( forest === 5 );
    hardAssert( leaf === 1024 );

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
    hardAssert( new SecretNode( { secret: 5 } ).secret === 5 );
    hardAssert( new SecretNode( { opacity: 0.5 } ).opacity === 0.5 );
    hardAssert( SecretNode.createSecretNode().secret === 0 );

    // Unsupported without babel-polyfill, commented out for now. DO NOT USE in simulations. May be used in the future.
    // Iterable class (with a generator method)
    // class RelativePrimes {
    //   constructor( n ) {
    //     // @private {number}
    //     this.n = n;
    //   }
    //   *[Symbol.iterator]() {
    //     for ( let i = 1;; i++ ) {
    //       if ( Util.gcd( i, this.n ) === 1 ) {
    //         yield i;
    //       }
    //     }
    //   }
    // }
    // // Find all relative primes to 5 less than 12.
    // const relativePrimes = [];
    // for ( const n of new RelativePrimes( 5 ) ) {
    //   if ( n >= 12 ) { break; }
    //   relativePrimes.push( n );
    // }
    // hardAssert( _.isEqual( relativePrimes, [ 1, 2, 3, 4, 6, 7, 8, 9, 11 ] ) );

    // Unsupported without babel-polyfill, commented out for now. DO NOT USE in simulations. May be used in the future.
    // Sets
    // const bag = new Set();
    // bag.add( 'a' ).add( 'b' ).add( 'a' );
    // hardAssert( bag.size === 2 );
    // hardAssert( bag.has( 'a' ) );
    // hardAssert( !bag.has( 'c' ) );

    // Unsupported without babel-polyfill, commented out for now. DO NOT USE in simulations. May be used in the future.
    // Maps
    // const map = new Map();
    // map.set( bag, 5 );
    // map.set( Node, 2 );
    // hardAssert( map.get( bag ) === 5 );
    // hardAssert( map.get( Node ) === 2 );
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