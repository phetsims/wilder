// Copyright 2018, University of Colorado Boulder

/**
 * Main entry point for the sim.
 *
 * @author AUTHOR
 */
define( function( require ) {
  'use strict';

  // modules
  var Sim = require( 'JOIST/Sim' );
  var SimLauncher = require( 'JOIST/SimLauncher' );
  var WilderScreen = require( 'WILDER/wilder/WilderScreen' );

  // strings
  var wilderTitleString = require( 'string!WILDER/wilder.title' );

  var simOptions = {
    credits: {
      //TODO fill in proper credits, all of these fields are optional, see joist.AboutDialog
      leadDesign: '',
      softwareDevelopment: '',
      team: '',
      qualityAssurance: '',
      graphicArts: '',
      thanks: ''
    }
  };

  SimLauncher.launch( function() {
    var sim = new Sim( wilderTitleString, [ new WilderScreen() ], simOptions );
    sim.start();
  } );
} );