// Copyright 2018-2022, University of Colorado Boulder

/**
 * Main entry point for the sim.
 *
 * @author AUTHOR
 */

import Sim, { SimOptions } from '../../joist/js/Sim.js';
import simLauncher from '../../joist/js/simLauncher.js';
import wilderStrings from './wilderStrings.js';
import WilderScreen from './wilder/WilderScreen.js';
import Tandem from '../../tandem/js/Tandem.js';

const wilderTitleStringProperty = wilderStrings.wilder.titleStringProperty;

const simOptions: SimOptions = {
  credits: {
    leadDesign: '',
    softwareDevelopment: '',
    team: '',
    qualityAssurance: '',
    graphicArts: '',
    thanks: ''
  }
};

simLauncher.launch( () => {
  const sim = new Sim( wilderTitleStringProperty, [ new WilderScreen( {
    tandem: Tandem.ROOT.createTandem( 'wilderScreen' )
  } ) ], simOptions );
  sim.start();
} );