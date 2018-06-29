// Copyright 2018, University of Colorado Boulder

/**
 * @author AUTHOR
 */
define( function( require ) {
  'use strict';

  // modules
  const inherit = require( 'PHET_CORE/inherit' );
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