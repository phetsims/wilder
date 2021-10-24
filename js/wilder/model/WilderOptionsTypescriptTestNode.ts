// Copyright 2021, University of Colorado Boulder

/**
 * Demonstrates using PhET Options patterns inheritance and composition.
 *
 * General structure, and terminology:
 * class Person (supertype)
 * class CoolPerson (subtype)
 * `new CoolPerson` (usage)
 *
 * Constraints that PhET needs to support in its options pattern:
 * 0. This is a config where it is possible that something is required with others that are optional.
 * 1. from usage to supertype (pass children through to Node, not used by subtype) (required (name) and optional (height))
 * 2. from usage to subtype, supertype doesn't know about this option (required (isRequiredAwesome) and optional (isAwesome))
 * 3. declared in supertype, new default in subtype, optionally passed by usage
 * 4. optionally passed by usage, used in subtype, defined in supertype (either with subtype default or without)
 * 5. Subtype requires usage doesn't pass in, subtype defines and passes to super ("attitude" option)
 * 6. Support for sub-options patterns throughout (like visiblePropertyOptions)
 * 7. Parent has config (required params too)
 * 8. Run the entire test but instead of config, there should be options?: XXX instead of config: (required)
 *
 * Comments below annotate where these constraints are tested.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */

import merge from '../../../../phet-core/js/merge.js';
import wilder from '../../wilder.js';

type DogOptions = {
  age?: number;
};

type PersonOptions = {
  name: string; // (1)
  hasShirt?: boolean;
  height?: number;
  attitude?: string; // (5)
  dogOptions?: DogOptions; // (6)
  age?: number;
}

class Dog {
  constructor( options?: DogOptions ) {
    const filledOptions = merge( {
      age: 0
    }, options ) as Required<DogOptions>;

    this.printAge( filledOptions.age );
  }

  /**
   * @private
   * @param {number} x
   */
  printAge( x: number ) {
    console.log( x );
  }
}

class Person {
  dog: Dog;

  constructor( options: PersonOptions ) {

    // Access before merge, only because it's required.
    console.log( options.name );

    const filledConfig = merge( {
      hasShirt: true,
      // name: required( options.name ), // not needed because it is supported by the type (1) (7) // TODO: we don't need `required()` anymore in typescript.
      height: 50, // (1)
      attitude: '',
      age: 0,
      dogOptions: {}
    }, options ) as Required<PersonOptions>; // TODO: infer Required<PersonOptions>, perhaps by converting merge to typescript. This is a bandaid, fix usages when time by looking for `merge\((\n|.)* as Required<`

    console.log(
      'Person',
      filledConfig.name,
      filledConfig.hasShirt,
      filledConfig.height,
      filledConfig.attitude,
      filledConfig.age,
      filledConfig.dogOptions
    );

    this.dog = new Dog( filledConfig.dogOptions );
  }
}

// 1. Options owned and used by CoolPerson
type CoolPersonNodeDefinedOptions = {
  isAwesome?: boolean,
  isRequiredAwesome: boolean
};

// 2. What is allowed in constructor, will be the public-facing API options, so name it as the normal convention (ClassOptions)
type CoolPersonNodeOptions = CoolPersonNodeDefinedOptions & Omit<PersonOptions, 'attitude'>;

// 3. What is allowed in object used in type/constructor.
type CoolPersonNodeImplementationOptions = Required<CoolPersonNodeDefinedOptions> &
  Pick<CoolPersonNodeOptions, 'name' | 'age' | 'dogOptions' | 'hasShirt'> &
  Pick<PersonOptions, 'attitude'>

class CoolPerson1 extends Person {
  constructor( options: CoolPersonNodeOptions ) {

    // before merge because it is required
    console.log( options.isRequiredAwesome );

    const filledConfig = merge( {
      // isRequiredAwesome: required( options.isRequiredAwesome ), // (0) // TODO: don't need required in typescript anymore.
      isAwesome: true, // (2)
      hasShirt: false, // (3)
      age: 5
    }, options ) as CoolPersonNodeImplementationOptions; // We cannot even potentially infer this here (like we possible can in Person), because we need to accept specific supertype options into the subtype constructor object for using.

    // (5)
    filledConfig.attitude = 'cool';

    // (4)
    // @ts-ignore
    console.log( 'My age is', filledConfig.age - 1 ); // cool people seem younger // TODO: how to add age?!?!

    // TODO: why is this case useful?
    if ( filledConfig.hasOwnProperty( 'dogOptions' ) ) {
      console.log( 'Nondefault dog options, I AM GETTING A DOG', filledConfig.dogOptions ); // cool people seem younger
    }

    console.log(
      'CoolPerson1',
      filledConfig.name,
      filledConfig.isAwesome,
      filledConfig.hasShirt,
      filledConfig.isRequiredAwesome
    );

    super( filledConfig );
  }

}


class WilderOptionsTypescriptTestModel {
  private coolPerson1: CoolPerson1;
  private coolPerson1Other: CoolPerson1;

  constructor() {

    // Strategy 1
    this.coolPerson1 = new CoolPerson1( {
      isRequiredAwesome: true, // (2)
      isAwesome: false, // (2)
      name: 'Georgey' // (1)
    } );
    this.coolPerson1Other = new CoolPerson1( {
      isRequiredAwesome: true, // (2)
      isAwesome: false, // (2)
      name: 'Georgey2', // (1)
      height: 49, // (1)
      hasShirt: true // (3)

      // attitude: 'hi' // (5) working as expected, this will throw a compile error if uncommented
    } );
  }
}

wilder.register( 'WilderOptionsTypescriptTestModel', WilderOptionsTypescriptTestModel );
export default WilderOptionsTypescriptTestModel;