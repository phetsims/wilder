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
 * class Employee (subtype)
 * `new Employee` (usage)
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
 * This is the type of providedOptions, the constructor parameter.
 * B. The options that the specific type defines and uses. This is SubclassSelfOptions, the first generic parameter to
 * optionize.js.
 * C. The options that are available after merge within the type (constructor or elsewhere), and always consist of
 * SubclassSelfOptions (B), but could also potentially consist of supertype options, but only if opting in.  This
 * variable is typically named options.
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

////////////////////////////////////////////////////////////////////////////////////////////////
// Basic Examples that utilize common PhET options patterns.

// Here is a classic Super class implementation, let's call it Item

type ItemOptions = {
  children?: Item[];
  x?: number;
  y?: number
};

class Item {
  private children: Item[];
  private x: number;
  private y: any;

  constructor( providedOptions?: ItemOptions ) {

    // In the simplest case, optionize just takes the options that this class defines.
    const options = optionize<ItemOptions>( {
      children: [],
      x: 0,
      y: 0
    }, providedOptions );
    this.children = options.children;
    this.x = options.x;
    this.y = options.y;
  }

  getChildren() {
    return this.children;
  }
}

const items: Item[] = [];


////////
// Example One: Basic subtype creates options and uses supertype options:
type MyItemSelfOptions = {
  mySpecialNumber?: number
};

type MyItemOptions = MyItemSelfOptions & ItemOptions;

class MyItem extends Item {
  private mySpecialNumber: number;

  constructor( providedOptions?: MyItemOptions ) {

    // Here optionize takes all options that it defines, and also its parent options so that those are allowed to be
    // passed through the super call. By default, optionize knows what the combined type of "providedOptions" (defaults to SelfOptions & ParentOptions).
    const options = optionize<MyItemSelfOptions, ItemOptions>( {
      mySpecialNumber: 2,
      x: 10,
      y: 10
      // blarg: false // ERROR - optionize knows what options from this class and the parent are allowed, and no others are accepted.
    }, providedOptions );

    super( options );

    this.mySpecialNumber = options.mySpecialNumber;
  }
}

items.push( new MyItem() );
items.push( new MyItem( { mySpecialNumber: 4 } ) );
items.push( new MyItem( { x: 100, y: 100 } ) );


////////
// Example Two: A Required parameter

type TreeItemSelfOptions = {
  treeType: 'cedar' | 'pine'
}
type TreeItemOptions = TreeItemSelfOptions & ItemOptions;

class TreeItem extends Item {
  private treeType: TreeItemSelfOptions[ 'treeType' ];

  constructor( providedOptions: TreeItemOptions ) {
    const options = optionize<TreeItemSelfOptions, ItemOptions>( {}, providedOptions );
    super( options );
    this.treeType = options.treeType;
  }
}

// items.push( new TreeItem() ); // ERROR: required parameter
items.push( new TreeItem( { treeType: 'cedar' } ) );
items.push( new TreeItem( {
  treeType: 'pine',
  children: [ new Item() ] // eslint-disable-line no-html-constructors
} ) );


////////
// Example Three: nested options
type ItemContainerOptions = {
  nodeOptions?: ItemOptions
};

class ItemContainer {
  private node: Item;

  constructor( providedOptions: ItemContainerOptions ) {
    const options = optionize<ItemContainerOptions>( {
      nodeOptions: {
        x: 5,
        y: 5
      }
    }, providedOptions );

    this.node = new Item( options.nodeOptions ); // eslint-disable-line no-html-constructors
  }
}

const container = new ItemContainer( {
  nodeOptions: {
    children: [ new MyItem() ]
  }
} );
console.log( container );


////////
// Example Four: Narrowing parent options' scope

// Another way to do this in this case would be Pick<ItemOptions, 'children'>, depending on opt-in/opt-out preference for narrowing API
type StationaryItemOptions = Omit<ItemOptions, 'x' | 'y'>

class StationaryItem extends Item {
  constructor( providedOptions?: StationaryItemOptions ) {

    // Here, since there are no self options, and instead just modified parent options, pass the public options in as the parent options
    const options = optionize<{}, StationaryItemOptions>( {}, providedOptions );

    super( options );
  }
}

items.push( new StationaryItem() );
// items.push( new StationaryItem( { x: 6 } ) ); // ERROR

////////
// Example Five: Using a parent option in the subtype constructor

// It is a bit safer in common code to keep this alias, even when identical. This way, if you export your public
// options, you don't skip a level and need to do a global refactor if you want to add an option to this subtype.
type ChildrenAdapterItemOptions = ItemOptions

class ChildrenAdapterItem extends Item {
  constructor( providedOptions?: ChildrenAdapterItemOptions ) {

    // Adding the third argument makes sure that children is known to be defined, for usage later in the constructor
    const options = optionize<{}, ChildrenAdapterItemOptions, 'children'>( {
      children: [ new MyItem() ]
    }, providedOptions );

    // Without the 'children' type in optionize, typescript would think that options.children could be undefined
    options.children.push( new MyItem() );

    super( options );
  }
}

items.push( new ChildrenAdapterItem() );
items.push( new ChildrenAdapterItem( { children: [ new MyItem() ] } ) );
items.push( new ChildrenAdapterItem( { children: [ new MyItem() ], x: 10, y: 10 } ) );

////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
// Below is a class hierarchy meant to exercise the complete feature set (and limitation set) of the current options
// pattern. It is much more complicated, and it is recommended to start in the above examples.

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

  // (6) (I) If it is optional here, then it better be in the default options or providedOptions, otherwise, just make
  // it required here for more type safety and less flexibility.
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

  private isAwesome: boolean;
  private isRequiredAwesome: boolean;
  private age: number;

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

    this.isAwesome = options.isAwesome;
    this.isRequiredAwesome = options.isRequiredAwesome;
    this.age = options.age;
  }
}

type EmployeeOfTheMonthOptions = Omit<EmployeeOptions, 'isRequiredAwesome'>

class EmployeeOfTheMonth extends Employee {
  constructor( providedOptions: EmployeeOfTheMonthOptions ) { // (8), note that if options are optional, then they get a question mark here.

    const options = optionize<{}, EmployeeOptions, 'isRequiredAwesome', EmployeeOfTheMonthOptions>( {
      // name: 'Bob', // Limitation (I) why doesn't this fail when commented out! It is a required argument to EmployeeOptions but providedOptions is optional?  https://github.com/phetsims/chipper/issues/1128
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

    this.alice = new EmployeeOfTheMonth( {
      name: 'Melissa' // (8) if not for limitation (I), EmployeeOfTheMonth would always have name 'Bob'
    } );
  }
}

wilder.register( 'WilderOptionsPatterns', WilderOptionsPatterns );
export default WilderOptionsPatterns;