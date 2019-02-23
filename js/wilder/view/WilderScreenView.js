// Copyright 2018-2019, University of Colorado Boulder

/**
 * @author AUTHOR
 */
define( require => {
  'use strict';

  // modules
  const ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  const ScreenView = require( 'JOIST/ScreenView' );
  const wilder = require( 'WILDER/wilder' );
  const WilderNode = require( 'WILDER/wilder/view/WilderNode' );

  class WilderScreenView extends ScreenView {

    /**
     * @param {WilderModel} wilderModel
     */
    constructor( wilderModel ) {
      super();

      const wilderNode = new WilderNode( { x: 100, y: 100 } );
      wilderNode.flipOver();
      this.addChild( wilderNode );

      // Reset All button
      const resetAllButton = new ResetAllButton( {
        listener: () => {
          wilderModel.reset();
        },
        right: this.layoutBounds.maxX - 10,
        bottom: this.layoutBounds.maxY - 10
      } );
      this.addChild( resetAllButton );
    }
  }

  return wilder.register( 'WilderScreenView', WilderScreenView );
} );