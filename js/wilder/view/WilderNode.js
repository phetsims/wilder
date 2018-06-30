// Copyright 2018, University of Colorado Boulder

/**
 * Demonstrates using a class with inheritance
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  const inherit = require( 'PHET_CORE/inherit' );
  const Node = require( 'SCENERY/nodes/Node' );
  const wilder = require( 'WILDER/wilder' );
  const Text = require( 'SCENERY/nodes/Text' );

  class WilderNode extends Node {

    /**
     * @param {Object} [options]
     */
    constructor( options ) {
      options = _.extend( {
        children: [ new Text( 'hello wilder' ) ]
      }, options );
      super( options );
    }

    /**
     * Rotates the node by PI, demonstrates a class method.
     */
    flipOver() {
      this.rotate( Math.PI );
    }
  }

  wilder.register( 'WilderNode', WilderNode );

  return WilderNode;
} );