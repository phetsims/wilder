// Copyright 2018-2022, University of Colorado Boulder

/**
 * Demonstrates using a class with inheritance
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import merge from '../../../../phet-core/js/merge.js';
import { Node, Text } from '../../../../scenery/js/imports.js';
import wilder from '../../wilder.js';
import Mixable from './Mixable.js';

class WilderNode extends Node {
  constructor( options?: Partial<{}> ) {
    options = merge( {
      children: [ new Text( 'hello wilder' ) ]
    }, options );
    super( options );

    Mixable;
  }

  /**
   * Rotates the node by PI, demonstrates a class method.
   */
  flipOver(): void {
    this.rotate( Math.PI );
  }
}

wilder.register( 'WilderNode', WilderNode );
export default WilderNode;