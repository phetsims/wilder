// Copyright 2018-2023, University of Colorado Boulder

/**
 * @author AUTHOR
 */

import ScreenView from '../../../../joist/js/ScreenView.js';
import ResetAllButton from '../../../../scenery-phet/js/buttons/ResetAllButton.js';
import wilder from '../../wilder.js';
import WilderNode from './WilderNode.js';
import WilderModel from '../model/WilderModel.js';
import { PhetioObjectOptions } from '../../../../tandem/js/PhetioObject.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import { HBox, Image } from '../../../../scenery/js/imports.js';
import wilderImages from '../../wilderImages.js';

type WilderScreenViewOptions = PickRequired<PhetioObjectOptions, 'tandem'>;

class WilderScreenView extends ScreenView {
  public constructor( wilderModel: WilderModel, providedOptions: WilderScreenViewOptions ) {
    super( providedOptions );

    const wilderNode = new WilderNode( { x: 100, y: 100 } );
    wilderNode.flipOver();
    this.addChild( wilderNode );

    this.addChild( new HBox( {
      x: 100,
      y: 100,
      children: [
        new Image( wilderImages.testImageA, {
          x: 110,
          y: 80
        } ),
        new Image( wilderImages.testImageC, {
          x: -100,
          y: -200
        } )
      ]
    } ) );

    // Reset All button
    const resetAllButton = new ResetAllButton( {
      listener: () => {
        wilderModel.reset();
      },
      right: this.layoutBounds.maxX - 10,
      bottom: this.layoutBounds.maxY - 10,
      tandem: providedOptions.tandem.createTandem( 'resetAllButton' )
    } );
    this.addChild( resetAllButton );
  }
}

wilder.register( 'WilderScreenView', WilderScreenView );
export default WilderScreenView;