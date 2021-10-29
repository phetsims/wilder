// Copyright 2018-2021, University of Colorado Boulder

/**
 * Main entry point for the sim.
 *
 * @author AUTHOR
 */

import Sim from '../../joist/js/Sim.js';
import simLauncher from '../../joist/js/simLauncher.js';
import wilderStrings from './wilderStrings.js';
import WilderScreen from './wilder/WilderScreen.js';
import Tandem from '../../tandem/js/Tandem.js';

const wilderTitleString = wilderStrings.wilder.title;

const simOptions = {
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
  const sim = new Sim( wilderTitleString, [ new WilderScreen( {
    tandem: Tandem.ROOT.createTandem( 'wilderScreen' )
  } ) ], simOptions );
  sim.start();
} );