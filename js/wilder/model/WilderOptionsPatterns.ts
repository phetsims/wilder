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
 * (9) The type checker indicates if you specified an unknown key
 * (10) IDE support navigates from usage sites to key declarations.
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
 *
 * Current limitations of the options pattern:
 * (I) Required parameters of parent options can potentially be specified by defaults in the subtype, or through
 * providedOptions. The current optionize does not know where it comes from, and cannot guarantee that its return value has the required parameter.
 * (II) Using the third type parameter for nested options is not ideal. The "Required" piece isn't deep, so defaults aren't filled in as required.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */

import optionize from '../../../../phet-core/js/optionize.js';
import wilder from '../../wilder.js';

type DogOptions = {
  name: string;
  age?: number;
  isGood?: boolean;
};

class Dog {
  age: number;
  name: string;
  isGood?: boolean; // Note that since there was no default, Typescript knows it must support undefined

  constructor( providedOptions: DogOptions ) {
    const options = optionize<DogOptions>( {
      age: 0,
      isGood: true
    }, providedOptions );
    this.age = options.age;
    this.name = options.name;

    this.isGood = options.isGood;
  }

  printAge() {
    console.log( this.age );
  }
}

type PersonSelfOptions = {
  name: string; // (1)
  hasShirt?: boolean;
  height?: number;
  attitude?: string; // (5)
  personitude?: string,

  // (6) (I) If it is optional here, then it better be in the providedOptions, otherwise, just make it required here for more type safety and less flexibility.
  dogOptions?: Partial<DogOptions>;
  age?: number;
}

type PersonOptions = PersonSelfOptions & {}; // no parent options

class Person {
  dog: Dog;

  constructor( providedOptions: PersonOptions ) {

    const options = optionize<PersonSelfOptions>( {
      // (0) (7) New pattern doesn't use `required()` for non-optional options. (like for `name`)
      hasShirt: true,
      height: 7, // <-- I commented this out to see this ERROR
      attitude: '',
      personitude: 'very much so',
      age: 0,
      dogOptions: { isGood: false }
    }, providedOptions );
    options.dogOptions;
    options.age;
    options.hasShirt;

    // (I) Remove type cast because name should be known to come from providedOptions. Alternatively, you can specify as
    // part of PersonOptions that we must get dogOptions.name. This counteracts the `Partial` and lets it be known in
    // the Person constructor that dogOptions is complete at this point.
    this.dog = new Dog( options.dogOptions as DogOptions );
  }
}

type EmployeeSelfOptions = {
  isAwesome?: boolean;
  isRequiredAwesome: boolean;
  age?: number;
};

type EmployeeOptions = EmployeeSelfOptions & Omit<PersonOptions, 'attitude'>;

class Employee extends Person {
  constructor( providedOptions: EmployeeOptions ) {

    // before merge because it is required
    console.log( providedOptions.isRequiredAwesome );

    const options = optionize<EmployeeSelfOptions, PersonOptions, 'personitude' | 'dogOptions', EmployeeOptions>( {
        // blarg: true,
        isAwesome: true, // (2)
        // hasShirt: false, // (3)
        // personitude: 'hello', // (4).a
        // attitude: 'cool' // (5).a
        personitude: 'personable',
        age: 5,
        dogOptions: {
          isGood: true
        }
      },
      // PERSON_DEFAULTS, // (4).c This is one way to indicate to the type system that personitude will be used in the constructor
      providedOptions );

    // (5) Use a strategy like (4).b (4).c to "tell" TypeScript that options has an attitude attribute
    // Or just define it there in the first place, like (5).a
    // options.attitude = 'cool';

    // (4) This would only work if you supply (4)(a) (b) or (c) above.
    // const x: string = options.personitude;
    // console.log( x );

    // (II) dogOptions.isGood is still potentially undefined when using in the constructor, even though we added `dogOptions` as a key in the third arg
    // console.log( options.dogOptions.isGood );

    // (4) If you have optional usage sites in the constructor, you can leave it optional in the merge types
    const a = ( m?: string ) => {};
    a( options.personitude );

    // (4) Merge knows age is defined here because it is optional in EmployeeSelfOptions, so it must have a default.
    console.log( 'My age is', options.age - 1 ); // cool people seem younger

    super( options );
  }
}

class EmployeeOfTheMonth extends Employee {
  constructor( providedOptions?: EmployeeOptions ) { // (8), note that if options are optional, then they get a question mark here.

    const options = optionize<{}, EmployeeOptions>( {
      // name: 'Bob, so cool', // Limitation (I) why doesn't this fail when commented out! It is a required argument to EmployeeOptions but providedOptions is optional?  https://github.com/phetsims/chipper/issues/1128
      isRequiredAwesome: true
    }, providedOptions );

    super( options );
  }
}

class WilderOptionsPatterns {
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
      hasShirt: true, // (3)
      dogOptions: { name: 'other dog name' }


      // countryOfOrigin: 'america' ERROR countryOfOrigin is not in any known options.
      // attitude: 'hi' // ERROR (5) not allowed in EmployeeOptions
    } );

    this.alice = new EmployeeOfTheMonth(); // (8) no argument needed because everything is optional.
  }
}

wilder.register( 'WilderOptionsPatterns', WilderOptionsPatterns );
export default WilderOptionsPatterns;