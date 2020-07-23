// Copyright 2018-2020, University of Colorado Boulder

/**
 * This file contains the subset of es6 features that are supported in the PhET sim codebase. If there is desirable
 * es6 code that isn't in this file. Likely it should be discussed in a dev meeting and tested with babel transpiling
 * before use. Commented out es6 features in this file are disallowed in the code base. They likely are accompanied by
 * a comment explaining why it is off limits.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import interleave from '../../../../phet-core/js/interleave.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import wilder from '../../wilder.js';

// Commented out for the currently-unsupported ES6 features
// const Utils = require( '/dot/js/Utils' );

// constants
const something = 'foo';

class WilderModel {
  constructor() {

    // We want a built version to error out for these "asserts"
    function hardAssert( condition, message = '' ) {
      if ( !condition ) {
        throw new Error( message );
      }
    }

    // block scoping for let/const
    const blocky = 'outside';
    if ( window ) {
      const blocky = 'inside';
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

    const self = this;
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

    // Spread operator - NOTE Do not use this on "array like" things, it doesn't get transpiled correctly. Instead use
    // `Array.from`. See https://github.com/phetsims/perennial/issues/153
    const constArray = [ 1, 2, 3 ];
    hardAssert( [ ...constArray, 4, 5, ...constArray ].length === 8 );
    hardAssert( rest( 4, ...constArray ) === 7 );

    // String interpolation
    hardAssert( `Testing ${2 + 3}` === 'Testing 5' );

    // Custom interpolation
    function quoter( strings, ...quotations ) {
      return interleave( strings, i => `"${quotations[ i ]}"` ).join( '' );
    }

    hardAssert( quoter`He said ${something} but then answered ${3 * 2}` === 'He said "foo" but then answered "6"' );

    const multiLineString = `This
 is a test of the emergency
 newline system`;
    hardAssert( multiLineString.length === 48 );

    // Binary
    hardAssert( 0b111 === 3 + 4 );

    // Object shorthand is not allowed in PhET code! Note that method shorthand is ok, like `{ listener(){} }`
    const a = 5;
    const b = 4;
    const shortObj = { a, b }; // eslint-disable-line phet-object-shorthand
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
    // NOTE: This is not allowed in PhET code because of the challenge it creates in renaming object keys,
    // see https://github.com/phetsims/chipper/issues/758
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
        // Don't pass options here, since want to initialize defaults before passing options to mutate. We still only
        // want to call mutate once per constructor.
        super();

        // @private {number}
        this._secret = 42;

        // mutate after instance variables have been assigned.
        this.mutate( options );
      }

      get _mutatorKeys() { return MUTATOR_KEYS; }

      set secret( value ) { this._secret = value; }

      get secret() { return this._secret; }

      // @public
      // overridden method
      dispose() {
        super.dispose();
        this._secret = 0; // Don't tell!
      }

      // @private
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
    //       if ( Utils.gcd( i, this.n ) === 1 ) {
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

    // Sets
    const bag = new Set();
    bag.add( 'a' ).add( 'b' ).add( 'a' );
    hardAssert( bag.size === 2 );
    hardAssert( bag.has( 'a' ) );
    hardAssert( !bag.has( 'c' ) );

    // Maps
    const map = new Map();
    map.set( bag, 5 );
    map.set( Node, 2 );
    hardAssert( map.get( bag ) === 5 );
    hardAssert( map.get( Node ) === 2 );
  }

  /**
   * @public
   */
  reset() {
    console.log( 'reset' );
  }
}

wilder.register( 'WilderModel', WilderModel );
export default WilderModel;