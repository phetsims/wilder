// Copyright 2018-2020, University of Colorado Boulder

/**
 * Demonstrates using a class with inheritance
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import merge from '../../../../phet-core/js/merge.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import wilder from '../../wilder.js';

class WilderNode extends Node {

  /**
   * @param {Object} [options]
   */
  constructor( options ) {
    options = merge( {
      children: [ new Text( 'hello wilder' ) ]
    }, options );
    super( options );
  }

  /**
   * @public
   * Rotates the node by PI, demonstrates a class method.
   */
  flipOver() {
    this.rotate( Math.PI );
  }
}

wilder.register( 'WilderNode', WilderNode );
export default WilderNode;