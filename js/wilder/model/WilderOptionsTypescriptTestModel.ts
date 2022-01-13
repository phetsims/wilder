// Copyright 2021-2022, University of Colorado Boulder

/**
 * Demonstrates using PhET Options patterns with inheritance and composition.
 *
 * The general structure of options are to define a `type`, and then to have each optional entry (perhaps all of them)
 * be marked with a `?`, as optional. Then during merge, cast the merge-returned object as the `Required<T>` version of
 * these options, because by then all defaults for the constructor-optional object have been filled in. Instead of overwriting
 * "options", you need to define a new variable so that TypeScript can give it a separate Type.
 *
 * Structure and terminology of classes defined in this file:
 * class Person (supertype)
 * class CoolPerson (subtype)
 * `new CoolPerson` (usage)
 *
 * Constraints that PhET needs to support in its options pattern:
 * 0. Some providedOptions are required, others are optional
 * 1. At instantiation, specify options for supertype that are ignored by subtype (required (name) and optional (height))
 * 2. At instantiation, specify options for subtype that are unknown by supertype (required (isRequiredAwesome) and optional (isAwesome))
 * 3. An option defined in the supertype, where the subtype provides a different default
 * 4. An option defined in the supertype can be used in the subtype. TODO: Decide if the subtype should be allowed to use the option without declaring a default (personitude), https://github.com/phetsims/chipper/issues/1128
 * 5. Subtype omits a supertype option from providedOptions, subtype defines and passes to super ("attitude" option)
 * 6. Support for nested sub-options patterns throughout (like dogOptions)
 * 7. Parent has required parameters too
 * 8. Run the entire test but instead of config, there should be options?: XXX instead of config: (required)
 * 9. Options as a parameter must support being optional, like providedOptions?
 *
 * Comments below annotate where these constraints are tested.
 *
 * In general, the pattern is to define that there are 3 different Types for a single options object in a class.
 * A. The type that you can pass in as options (the public one). This is anded with any and all supertype options.
 * B. The options that the specific type defines and uses.
 * C. The options that are available after merge within the type (constructor or elsewhere), and always consist of the
 * class-defined options (B), but could also potentially consist of supertype options, but only if opting in.
 *
 * In many simpler cases, (B) and (C) are the same, but (C) may need to be defined in addition (see CoolPersonImplementationOptions)
 *
 * Variable naming:
 * - Because typescript now codifies the difference between config and options, there is no need to have anything but "options"
 * as the variable name.
 * - We cannot override the value of a variable and also change its type, thus the options argument must be named differently from the
 * value returned from the `merge` call. It is conventional to call the parameter "providedOptions" and the merged object "options".
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */

import wilder from '../../wilder.js';

// constants
const OPTIONS_SUFFIX = 'Options';

type OptionalKeys<T> = {
  [K in keyof T]-?: undefined extends { [K2 in keyof T]: K2 }[K] ? K : never
}[keyof T]
type RequiredKeys<T> = Exclude<keyof T, OptionalKeys<T>>

type Invert<T> = {
  [K in OptionalKeys<T>]-?: NonNullable<T[K]>
} & {
  [K in RequiredKeys<T>]+?: T[K]
}

// A direct copy from PHET_CORE/merge, but outfit with typescript support
// T is the SubtypeDefinedOptions, the defaults supplied by the subtype
// U is the ProvidedOptions
function merge<T, U = T>( target: Invert<T> & Partial<U>, source?: U ) {
  if ( source ) {
    for ( const property in source ) {

      // @ts-ignore
      if ( source.hasOwnProperty( property ) ) {
        const sourceProperty = source[ property ];

        // Recurse on keys that end with 'Options', but not on keys named 'Options'.
        if ( _.endsWith( property, OPTIONS_SUFFIX ) && property !== OPTIONS_SUFFIX ) {

          // *Options property value cannot be undefined, if truthy, it we be validated with assertIsMergeable via recursion.
          assert && assert( sourceProperty !== undefined, 'nested *Options should not be undefined' );

          // @ts-ignore
          target[ property ] = merge( target[ property ] || {}, sourceProperty );
        }
        else {

          // @ts-ignore
          target[ property ] = sourceProperty;
        }
      }
    }
  }

  //..._.reduce( sources, ( theReturn, next ) => {  return { ...theReturn, ...next } } )
  return target as unknown as Required<T> & U;
}

// You can mention the age or the height of a dog, but not both.
type DogOptions = {
  age: number; height?: never
} | {
  age?: never; height: number
};

type PersonOptions = {
  name: string; // (1)
  hasShirt?: boolean;
  height?: number;
  attitude?: string; // (5)
  personitude?: string,

  // (6) // TODO: remove the question mark and note a problem here, a usage is marked as wrong, but a default is filled
  //        TODO: in up the hierarchy before we get to PersonOptions, booo, https://github.com/phetsims/chipper/issues/1128
  dogOptions?: DogOptions;
  age?: number;
}

class Dog {
  constructor( providedOptions: DogOptions ) {

    let age = providedOptions.age;

    // infer height from age;
    if ( age === undefined ) {
      age = providedOptions.height! / 10;
    }

    this.printAge( age );
  }

  /**
   * @private
   * @param {number} x
   */
  printAge( x: number ) {
    // console.log( x );
  }
}

class Person {
  dog: Dog;

  constructor( providedOptions: PersonOptions ) {

    // Access before merge, only because it's required.
    // console.log( providedOptions.name );

    const options = merge<PersonOptions>( {
      hasShirt: true,
      // name: required( options.name ), // not needed because it is supported by the type (1) (7) // TODO: we don't need `required()` anymore in typescript. https://github.com/phetsims/chipper/issues/1128
      height: 50, // (1)
      attitude: '',
      personitude: 'very much so',
      age: 0,
      dogOptions: { height: 1000 } // TODO: this doesn't yet support the XOR piece of dogOptions, because it will merge age into this with height also, and be fine!
    }, providedOptions );

    // console.log(
    //   'Person',
    //   options.name,
    //   options.hasShirt,
    //   options.height,
    //   options.attitude,
    //   options.age,
    //   options.dogOptions
    // );

    this.dog = new Dog( options.dogOptions );
  }
}

// B. Options owned and used by CoolPerson
type CoolPersonDefinedOptions = {
  isAwesome?: boolean,
  isRequiredAwesome: boolean
};

// A. What is allowed in constructor, will be the public-facing API options, so name it as the normal convention (ClassOptions)
type CoolPersonOptions = CoolPersonDefinedOptions & Omit<PersonOptions, 'attitude'>;

// C. What is allowed in object used in type/constructor. TODO: do we need to append back in attitude to be set in options, or should we just allow a new object to be created https://github.com/phetsims/chipper/issues/1128
// type CoolPersonImplementationOptions = CoolPersonOptions & Pick<PersonOptions, 'attitude'>

class CoolPerson1 extends Person {
  constructor( providedOptions: CoolPersonOptions ) {

    // before merge because it is required
    // console.log( providedOptions.isRequiredAwesome );

    const options = merge<CoolPersonDefinedOptions, CoolPersonOptions>( {
      // isRequiredAwesome: required( options.isRequiredAwesome ), // (0) // TODO: don't need required in typescript anymore. https://github.com/phetsims/chipper/issues/1128
      isAwesome: true, // (2)
      hasShirt: false, // (3)
      age: 5
    }, providedOptions );

    // (5) TODO: this should be allowed, https://github.com/phetsims/chipper/issues/1128
    // options.attitude = 'cool';

    // (4) TODO: Should this fail without a default??, https://github.com/phetsims/chipper/issues/1128
    console.log( options.personitude );

    // (4) TODO: how to use age and know it is defined from the default?!?! https://github.com/phetsims/chipper/issues/1128
    // console.log( 'My age is', options.age - 1 ); // cool people seem younger

    // TODO: why is this case useful? https://github.com/phetsims/chipper/issues/1128
    if ( options.hasOwnProperty( 'dogOptions' ) ) {
      // console.log( 'Nondefault dog options, I AM GETTING A DOG', options.dogOptions ); // cool people seem younger
    }

    // console.log(
    //   'CoolPerson1',
    //   options.name,
    //   options.isAwesome,
    //   options.hasShirt,
    //   options.isRequiredAwesome
    // );

    // (5) create a new object to pass up options that we set in this constructor for the supertype.
    super( { ...options, ...{ attitude: 'cool' } } );
  }

}

class JohnTheCoolPerson extends CoolPerson1 {
  constructor( providedOptions?: CoolPersonOptions ) { // (9), note that if options are optional, then they get a question mark here.

    const options = merge<{}, CoolPersonOptions>( {
      // name: 'John, so cool', // TODO: why doesn't this fail! It is a required argument to CoolPersonOptions right?  https://github.com/phetsims/chipper/issues/1128
      isRequiredAwesome: true
    }, providedOptions );

    super( options );
  }
}


class WilderOptionsTypescriptTestModel {
  private coolPerson1: CoolPerson1;
  private coolPerson1Other: CoolPerson1;
  private john: JohnTheCoolPerson;

  constructor() {

    // Strategy 1
    this.coolPerson1 = new CoolPerson1( {
      isRequiredAwesome: true, // (2)
      isAwesome: false, // (2)
      dogOptions: { age: 3 },
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

    this.john = new JohnTheCoolPerson(); // (9)
  }
}

wilder.register( 'WilderOptionsTypescriptTestModel', WilderOptionsTypescriptTestModel );
export default WilderOptionsTypescriptTestModel;