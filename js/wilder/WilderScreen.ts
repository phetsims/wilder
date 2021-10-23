// Copyright 2018-2021, University of Colorado Boulder

/**
 * @author AUTHOR
 */

import Property from '../../../axon/js/Property.js';
import Screen from '../../../joist/js/Screen.js';
import wilder from '../wilder.js';
import WilderModel from './model/WilderModel.js';
import WilderScreenView from './view/WilderScreenView.js';

/**
 * @constructor
 */
class WilderScreen extends Screen {
  constructor() {

    const options = {
      backgroundColorProperty: new Property( 'white' )
    };

    super( () => new WilderModel(),
      ( model: WilderModel ) => new WilderScreenView( model ),
      options
    );
  }
}

wilder.register( 'WilderScreen', WilderScreen );
export default WilderScreen;