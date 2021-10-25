// Copyright 2018-2021, University of Colorado Boulder

/**
 * Demonstrates using a class with inheritance
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import merge from '../../../../phet-core/js/merge.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import wilder from '../../wilder.js';
import SimpleNodeTrait from './SimpleNodeTrait.js';
import Mixable from './Mixable.js';

class WilderNode extends Node {
  constructor( options?: Partial<{}> ) {
    options = merge( {
      children: [ new Text( 'hello wilder' ) ]
    }, options );
    super( options );

    class FooNode extends SimpleNodeTrait( Node ) {

    }

    console.log( Mixable );

    const fooNode = new FooNode( {
      someField: 'test'
    } );

    this.addChild( fooNode );

    console.log( fooNode.someField );
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