// Copyright 2020-2022, University of Colorado Boulder

/**
 * Auto-generated from modulify, DO NOT manually modify.
 */
/* eslint-disable */
import getStringModule from '../../chipper/js/getStringModule.js';
import TReadOnlyProperty from '../../axon/js/TReadOnlyProperty.js';
import wilder from './wilder.js';

type StringsType = {
  'wilder': {
    'title': string;
    'titleProperty': TReadOnlyProperty<string>;
  }
};

const wilderStrings = getStringModule( 'WILDER' ) as StringsType;

wilder.register( 'wilderStrings', wilderStrings );

export default wilderStrings;
