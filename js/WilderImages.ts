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
  testImageAImageProperty: new LocalizedImageProperty( 'testImageA', {
    africa: phetGirlWaggingFinger_svg,
    usa: test1_svg
  } ),
  testImageBImageProperty: new LocalizedImageProperty( 'testImageB', {
    africa: test1_svg,
    usa: test1_svg
  } ),
  testImageCImageProperty: new LocalizedImageProperty( 'testImageC', {
    africa: test1_svg,
    usa: phetGirlWaggingFinger_svg
  } ),
  testImageDImageProperty: new LocalizedImageProperty( 'testImageD', {
    africa: phetGirlWaggingFinger_svg,
    usa: phetGirlWaggingFinger_svg
  } )
};

wilder.register( 'WilderImages', WilderImages );

export default WilderImages;
