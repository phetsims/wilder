// Copyright 2018-2024, University of Colorado Boulder

/**
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import ScreenView from '../../../../joist/js/ScreenView.js';
import ResetAllButton from '../../../../scenery-phet/js/buttons/ResetAllButton.js';
import wilder from '../../wilder.js';
import WilderNode from './WilderNode.js';
import WilderModel from '../model/WilderModel.js';
import { PhetioObjectOptions } from '../../../../tandem/js/PhetioObject.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import { globalHotkeyRegistry, Hotkey, Text } from '../../../../scenery/js/imports.js';
import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import ABSwitch from '../../../../sun/js/ABSwitch.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';

type WilderScreenViewOptions = PickRequired<PhetioObjectOptions, 'tandem'>;

class WilderScreenView extends ScreenView {
  public constructor( wilderModel: WilderModel, providedOptions: WilderScreenViewOptions ) {
    super( providedOptions );

    const wilderNode = new WilderNode();
    wilderNode.flipOver();
    wilderNode.center = this.layoutBounds.center;
    this.addChild( wilderNode );

    // For testing enabled hotkeys
    const extraEnabledProperty = new BooleanProperty( false );

    const enabledText = new Text( 'Some Hotkeys Enabled', { font: new PhetFont( 16 ) } );
    const disabledText = new Text( 'Some Hotkeys Disabled', { font: new PhetFont( 16 ) } );
    const enabledSwitch = new ABSwitch( extraEnabledProperty, true, enabledText, false, disabledText, {
      centerX: this.layoutBounds.centerX,
      bottom: this.layoutBounds.maxY - 10
    } );
    this.addChild( enabledSwitch );

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

    globalHotkeyRegistry.add( new Hotkey( {
      key: 'y',
      fire: () => console.log( 'fire: y' )
    } ) );

    globalHotkeyRegistry.add( new Hotkey( {
      key: 't',
      fire: () => console.log( 'fire: t' ),
      fireOnHold: true,
      fireOnHoldTiming: 'browser'
    } ) );

    globalHotkeyRegistry.add( new Hotkey( {
      key: 't',
      modifierKeys: [ 'shift' ],
      fire: () => console.log( 'fire: shift+t' ),
      fireOnHold: true,
      fireOnHoldTiming: 'browser'
    } ) );

    globalHotkeyRegistry.add( new Hotkey( {
      key: 'r',
      fire: () => console.log( 'fire: r' ),
      ignoredModifierKeys: [ 'shift' ],
      fireOnHold: true,
      fireOnHoldTiming: 'custom',
      fireOnHoldCustomInterval: 300
    } ) );

    resetAllButton.addInputListener( {
      hotkeys: [
        new Hotkey( {
          key: 'x',
          fire: () => console.log( 'fire: x' ),
          enabledProperty: extraEnabledProperty
        } ),
        new Hotkey( {
          key: 'x',
          modifierKeys: [ 'b' ],
          fire: () => console.log( 'fire: b+x' ),
          enabledProperty: extraEnabledProperty
        } ),
        new Hotkey( {
          key: 'w',
          fire: () => console.log( 'fire: w' )
        } ),
        new Hotkey( {
          key: 'a',
          fire: () => console.log( 'fire: a' )
        } ),
        new Hotkey( {
          key: 's',
          fire: () => console.log( 'fire: s' )
        } ),
        new Hotkey( {
          key: 'd',
          fire: () => console.log( 'fire: d' )
        } )
      ]
    } );
  }
}

wilder.register( 'WilderScreenView', WilderScreenView );
export default WilderScreenView;