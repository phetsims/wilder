// Copyright 2018-2019, University of Colorado Boulder

/**
 * Main entry point for the sim.
 *
 * @author AUTHOR
 */
define( require => {
  'use strict';

  // modules
  const Sim = require( 'JOIST/Sim' );
  const SimLauncher = require( 'JOIST/SimLauncher' );
  const WilderScreen = require( 'WILDER/wilder/WilderScreen' );

  // strings
  const wilderTitleString = require( 'string!WILDER/wilder.title' );

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
} );