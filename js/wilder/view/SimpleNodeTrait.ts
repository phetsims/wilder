// Copyright 2021, University of Colorado Boulder

/**
 * Testing a node trait
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import Node from '../../../../scenery/js/nodes/Node.js';
import wilder from '../../wilder.js';

type Constructor<T = {}> = new ( ...args: any[] ) => T;

function SimpleNodeTrait<TBase extends Constructor<Node>>( Base: TBase ) {
  return class extends Base {
    // So we can mutate with { someField: ... }
    _mutatorKeys = [ ...Node.prototype._mutatorKeys, 'someField' ];
    _someField: string;

    constructor( ...args: any[] ) {
      super();

      this._someField = 'Testing';
    }

    get someField(): string { return this._someField; }
    set someField( value: string ) { this._someField = value; }
  };
}

wilder.register( 'SimpleNodeTrait', SimpleNodeTrait );
export default SimpleNodeTrait;