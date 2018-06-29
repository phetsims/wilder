// Copyright 2018, University of Colorado Boulder

/**
 * @author AUTHOR
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var wilder = require( 'WILDER/wilder' );

  /**
   * @constructor
   */
  function WilderModel() {
    //TODO
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