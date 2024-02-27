// Copyright 2024, University of Colorado Boulder

/**
 * Auto-generated from modulify, DO NOT manually modify.
 */
/* eslint-disable */
import LocalizedImageProperty from '../../joist/js/i18n/LocalizedImageProperty.js';
import wilder from './wilder.js';
import phetGirlWaggingFinger_svg from '../images/phetGirlWaggingFinger_svg.js';
import test1_svg from '../images/test1_svg.js';

const WilderImages = {
  testImageA: new LocalizedImageProperty( 'testImageA', {
    usa: test1_svg,
    africa: phetGirlWaggingFinger_svg
  } ),
  testImageB: new LocalizedImageProperty( 'testImageB', {
    usa: test1_svg,
    africa: test1_svg
  } ),
  testImageC: new LocalizedImageProperty( 'testImageC', {
    usa: phetGirlWaggingFinger_svg,
    africa: test1_svg
  } ),
  testImageD: new LocalizedImageProperty( 'testImageD', {
    usa: phetGirlWaggingFinger_svg,
    africa: phetGirlWaggingFinger_svg
  } )
};

wilder.register( 'WilderImages', WilderImages );

export default WilderImages;
