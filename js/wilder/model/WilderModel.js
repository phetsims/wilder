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
      console.log( `Should be block-scoped inside: ${blocky}` );
    }
    for ( let blocky = 0; blocky <= 0; blocky++ ) {
      console.log( `Should be block-scoped 0: ${blocky}` );
    }
    console.log( `Should be block-scoped outside: ${blocky}` );

    // Expression-based arrow functions
    console.log( _.range( 0, 5 ).map( x => x * x ) );

    // Statement-based arrow functions
    console.log( _.range( 0, 5 ).map( x => {
      console.log( `${something}:${x}` );
      return x * x;
    } ) );

    var self = this;
    [ 1 ].map( element => {
      console.log( `self === this in arrow function: ${self === this}` );
    } );
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