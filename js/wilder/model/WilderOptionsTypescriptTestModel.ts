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
 * (0) Some providedOptions are required, others are optional
 * (1) At instantiation, specify options for supertype that are ignored by subtype (required (name) and optional (height))
 * (2) At instantiation, specify options for subtype that are unknown by supertype (required (isRequiredAwesome) and optional (isAwesome))
 * (3) An option defined in the supertype, where the subtype provides a different default
 * (4) An option defined in the supertype can be used in the subtype (personitude, age)
 * (5) Subtype omits a supertype option from providedOptions, subtype defines and passes to super ("attitude" option)
 * (6) Support for nested sub-options patterns throughout (like dogOptions)
 * (7) Parent has required parameters too
 * (8) Options as a parameter must support being optional, like `providedOptions?`
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
 * as the variable name. As a developer consensus, we no longer need to name any parameters "config" in typescript.
 * - We cannot override the value of a variable and also change its type, thus the options argument must be named differently from the
 * value returned from the `merge` call. It is conventional to call the parameter "providedOptions" and the merged object "options".
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */

import merge from '../../../../phet-core/js/merge.js';
import wilder from '../../wilder.js';

// You can mention the age or the height of a dog, but not both.
type DogOptions = {
  name: string;
  age?: number;
};

class Dog {
  age: number;
  name: string;

  constructor( providedOptions: DogOptions ) {
    const options = merge( { age: 0 }, providedOptions );
    this.age = options.age;
    this.name = options.name;
  }

  printAge() {
    console.log( this.age );
  }
}

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

const PERSON_DEFAULTS = {
  // (0) (7) New pattern doesn't use `required()` for non-optional options. (like for `name`)
  hasShirt: true,
  height: 50, // (1)
  attitude: '',
  personitude: 'very much so',
  age: 0,
  dogOptions: { age: 2 }
};

class Person {
  dog: Dog;

  constructor( providedOptions: PersonOptions ) {

    // Access before merge, only because it's required.
    console.log( providedOptions.name );

    const options = merge( {}, PERSON_DEFAULTS, providedOptions );

    this.dog = new Dog( options.dogOptions );
  }
}

type EmployeeOptions = {
  isAwesome?: boolean,
  isRequiredAwesome: boolean
} & Omit<PersonOptions, 'attitude'>;

class Employee extends Person {
  constructor( providedOptions: EmployeeOptions ) {

    // before merge because it is required
    console.log( providedOptions.isRequiredAwesome );

    const options = merge( {
        isAwesome: true, // (2)
        // hasShirt: false, // (3)
        // personitude: 'hello', // (4).a
        // attitude: 'cool' // (5).a
        // personitude: PERSON_DEFAULTS.personitude, // (4).b This is one way to indicate to the type system that personitude will be used in the constructor
        age: 5
      },
      // PERSON_DEFAULTS, // (4).c This is one way to indicate to the type system that personitude will be used in the constructor
      providedOptions );

    // (5) Use a strategy like (4).b (4).c to "tell" TypeScript that options has an attitude attribute
    // Or just define it there in the first place, like (5).a
    // options.attitude = 'cool';

    // (4) This would only work if you supply (4)(a) (b) or (c) above.
    // const x: string = options.personitude;
    // console.log( x );

    // (4) If you have optional usage sites in the constructor, you can leave it optional in the merge types
    const a = ( m?: string ) => {};
    a( options.personitude );

    // (4) Merge knows age is defined here because it appears in Employee's merge
    console.log( 'My age is', options.age - 1 ); // cool people seem younger

    // TODO: why is this case useful? https://github.com/phetsims/chipper/issues/1128
    if ( options.hasOwnProperty( 'dogOptions' ) ) {
      // console.log( 'Nondefault dog options, I AM GETTING A DOG', options.dogOptions ); // cool people seem younger
    }

    super( options );
  }
}

class EmployeeOfTheMonth extends Employee {
  constructor( providedOptions?: EmployeeOptions ) { // (8), note that if options are optional, then they get a question mark here.

    const options = merge( {
      // name: 'John, so cool', // TODO: why doesn't this fail when commented out! It is a required argument to EmployeeOptions but providedOptions is optional?  https://github.com/phetsims/chipper/issues/1128
      isRequiredAwesome: true
    }, providedOptions );

    super( options );
  }
}

class WilderOptionsTypescriptTestModel {
  private bob: Employee;
  private charlie: Employee;
  private alice: EmployeeOfTheMonth;

  constructor() {

    this.bob = new Employee( {
      isRequiredAwesome: true, // (2)
      isAwesome: false, // (2)
      dogOptions: { age: 3, name: 'dog name' },
      name: 'Bob' // (1)
    } );
    this.charlie = new Employee( {
      isRequiredAwesome: true, // (2)
      isAwesome: false, // (2)
      name: 'Charlie', // (1) if you comment this out, it will be an error because it is a required option
      height: 49, // (1)
      hasShirt: true // (3)

      // countryOfOrigin: 'america' ERROR countryOfOrigin is not in any known options.
      // attitude: 'hi' // ERROR (5) not allowed in EmployeeOptions
    } );

    this.alice = new EmployeeOfTheMonth(); // (8) no argument needed because everything is optional.
  }
}

wilder.register( 'WilderOptionsTypescriptTestModel', WilderOptionsTypescriptTestModel );
export default WilderOptionsTypescriptTestModel;