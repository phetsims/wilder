// Copyright 2018-2020, University of Colorado Boulder

/**
 * @author AUTHOR
 */

import ScreenView from '../../../../joist/js/ScreenView.js';
import ResetAllButton from '../../../../scenery-phet/js/buttons/ResetAllButton.js';
import wilder from '../../wilder.js';
import WilderNode from './WilderNode.js';

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

wilder.register( 'WilderScreenView', WilderScreenView );
export default WilderScreenView;