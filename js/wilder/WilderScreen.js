// Copyright 2018, University of Colorado Boulder

/**
 * @author AUTHOR
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Property = require( 'AXON/Property' );
  var Screen = require( 'JOIST/Screen' );
  var wilder = require( 'WILDER/wilder' );
  var WilderModel = require( 'WILDER/wilder/model/WilderModel' );
  var WilderScreenView = require( 'WILDER/wilder/view/WilderScreenView' );

  /**
   * @constructor
   */
  function WilderScreen() {

    var options = {
      backgroundColorProperty: new Property( 'white' )
    };

    Screen.call( this,
      function() { return new WilderModel(); },
      function( model ) { return new WilderScreenView( model ); },
      options
    );
  }

  wilder.register( 'WilderScreen', WilderScreen );

  return inherit( Screen, WilderScreen );
} );