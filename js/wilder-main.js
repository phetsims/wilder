// Copyright 2018-2020, University of Colorado Boulder

/**
 * Main entry point for the sim.
 *
 * @author AUTHOR
 */

import Sim from '../../joist/js/Sim.js';
import SimLauncher from '../../joist/js/SimLauncher.js';
import wilderStrings from './wilder-strings.js';
import WilderScreen from './wilder/WilderScreen.js';

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

SimLauncher.launch( () => {
  const sim = new Sim( wilderTitleString, [ new WilderScreen() ], simOptions );
  sim.start();
} );