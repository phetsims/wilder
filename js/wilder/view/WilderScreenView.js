// Copyright 2018, University of Colorado Boulder

/**
 * @author AUTHOR
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  var ScreenView = require( 'JOIST/ScreenView' );
  var WilderNode = require( 'WILDER/wilder/view/WilderNode' );
  var wilder = require( 'WILDER/wilder' );

  /**
   * @param {WilderModel} wilderModel
   * @constructor
   */
  function WilderScreenView( wilderModel ) {

    ScreenView.call( this );

    const wilderNode = new WilderNode( { x: 100, y: 100 } );
    wilderNode.flipOver();
    this.addChild( wilderNode );

    // Reset All button
    const resetAllButton = new ResetAllButton( {
      listener: function() {
        wilderModel.reset();
      },
      right: this.layoutBounds.maxX - 10,
      bottom: this.layoutBounds.maxY - 10
    } );
    this.addChild( resetAllButton );
  }

  wilder.register( 'WilderScreenView', WilderScreenView );

  return inherit( ScreenView, WilderScreenView, {

    //TODO Called by the animation loop. Optional, so if your view has no animation, please delete this.
    // @public
    step: function( dt ) {
      //TODO Handle view animation here.
    }
  } );
} );