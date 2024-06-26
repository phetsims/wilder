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
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import stepTimer from '../../../../axon/js/stepTimer.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';

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
      bottom: this.layoutBounds.maxY - 10,
      tandem: providedOptions.tandem.createTandem( 'enabledSwitch' )
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

    globalHotkeyRegistry.add( new Hotkey( {
      key: 'd',
      fire: () => console.log( 'fire: (second d)' ),
      allowOverlap: true
    } ) );

    globalHotkeyRegistry.add( new Hotkey( {
      key: 'shift',
      fire: () => console.log( 'fire: shift' ),
      enabledProperty: extraEnabledProperty
    } ) );

    // Demo for delayed "combo" hotkeys. Press 'o' and then 'p' within 500ms to trigger the 'p' hotkey.
    const lastOPressTimeProperty = new NumberProperty( 0 );
    const currentTimeProperty = new NumberProperty( Date.now() );
    stepTimer.addListener( dt => {
      currentTimeProperty.value = Date.now();
    } );
    globalHotkeyRegistry.add( new Hotkey( {
      key: 'o',
      fire: () => {
        console.log( 'fire: o (first key)' );
        lastOPressTimeProperty.value = Date.now();
      }
    } ) );
    globalHotkeyRegistry.add( new Hotkey( {
      key: 'p',
      fire: () => {
        console.log( 'fire: p' );
      },
      enabledProperty: new DerivedProperty( [
        lastOPressTimeProperty,
        currentTimeProperty
      ], ( lastOPressTime, currentTime ) => {
        return lastOPressTime + 500 > currentTime;
      } )
    } ) );

    this.addInputListener( {
      hotkeys: [
        new Hotkey( {
          key: 'x',
          fire: () => console.log( 'fire: x (screen view)' )
        } ),
        new Hotkey( {
          key: 'w',
          fire: () => console.log( 'fire: w (screen view)' )
        } ),
        new Hotkey( {
          key: 'a',
          fire: () => console.log( 'fire: a (screen view)' )
        } ),
        new Hotkey( {
          key: 's',
          fire: () => console.log( 'fire: s (screen view)' )
        } ),
        new Hotkey( {
          key: 'd',
          fire: () => console.log( 'fire: d (screen view)' )
        } )
      ]
    } );

    resetAllButton.addInputListener( {
      hotkeys: [
        new Hotkey( {
          key: 'x',
          fire: () => console.log( 'fire: x' ),
          enabledProperty: extraEnabledProperty,
          override: true
        } ),
        new Hotkey( {
          key: 'x',
          modifierKeys: [ 'b' ],
          fire: () => console.log( 'fire: b+x' ),
          enabledProperty: extraEnabledProperty
        } ),
        new Hotkey( {
          key: 'w',
          fire: () => console.log( 'fire: w' ),
          override: true
        } ),
        new Hotkey( {
          key: 'a',
          fire: () => console.log( 'fire: a' ),
          override: true
        } ),
        new Hotkey( {
          key: 's',
          fire: () => console.log( 'fire: s' ),
          override: true
        } ),
        new Hotkey( {
          key: 'd',
          fire: () => console.log( 'fire: d' ),
          override: true
        } )
      ]
    } );
  }
}

wilder.register( 'WilderScreenView', WilderScreenView );
export default WilderScreenView;