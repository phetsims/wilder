// Copyright 2018-2019, University of Colorado Boulder

/**
 * Demonstrates using a class with inheritance
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( require => {
  'use strict';

  // modules
  const Node = require( 'SCENERY/nodes/Node' );
  const Text = require( 'SCENERY/nodes/Text' );
  const wilder = require( 'WILDER/wilder' );

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

  return wilder.register( 'WilderNode', WilderNode );
} );