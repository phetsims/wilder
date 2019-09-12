// Copyright 2018-2019, University of Colorado Boulder

/**
 * @author AUTHOR
 */
define( require => {
  'use strict';

  // modules
  const Property = require( 'AXON/Property' );
  const Screen = require( 'JOIST/Screen' );
  const wilder = require( 'WILDER/wilder' );
  const WilderModel = require( 'WILDER/wilder/model/WilderModel' );
  const WilderScreenView = require( 'WILDER/wilder/view/WilderScreenView' );

  /**
   * @constructor
   */
  class WilderScreen extends Screen {
    constructor() {

      const options = {
        backgroundColorProperty: new Property( 'white' )
      };

      super( () => new WilderModel(),
        model => new WilderScreenView( model ),
        options
      );
    }
  }

  return wilder.register( 'WilderScreen', WilderScreen );
} );