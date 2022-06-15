// Copyright 2021-2022, University of Colorado Boulder

/**
 * Demonstrates using PhET Options patterns with inheritance and composition.
 * See https://github.com/phetsims/phet-info/blob/master/doc/phet-software-design-patterns.md#options-typescript
 * for additional description.
 *
 * The general structure of options is to define the Type of options that are defined at each level of the hierarchy,
 * as well as a Type for the public, providedOptions for the constructor. Optionize should do the rest for you. All
 * options that are defined for subtype X should be declared in a type called XSelfOptions. The public API options
 * should be called XOptions. `optionize` will take these as type parameters, as well as parent options and any keys
 * that you will use from the parent options in the subtype constructor. See examples below and feel free to ask
 * @zepumph and @samreid questions as you have them. *
 *
 * NOTE: Instead of overwriting "options", you need to define a new variable so that TypeScript can give it a separate Type.
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
 * C. The options that are available after optionize within the type (constructor or elsewhere), and always consist of
 * SubclassSelfOptions (B), but could also potentially consist of supertype options, but only if opting in.
 *
 * Variable naming:
 * - Because typescript now codifies the difference between config and options, there is no need to have anything but "options"
 * as the variable name. As a developer consensus, we no longer need to name any parameters "config" in typescript.
 * - We cannot override the value of a variable and also change its type, thus the options argument must be named differently from the
 * value returned from the `optionize` call. It is conventional to call the parameter "providedOptions" and the optionized object "options".
 *
 *
 * Current limitations of the options pattern:
 * (I) Optionize still struggles in a couple cases to know that defaults has filled in a value. Right now using an
 * option in the constructor when you have provided a default for it in optionize can still type as (X | undefined).
 * This occurs in the following cases:
 *    - providing defaults for required parameters from parent options
 *    - providing defaults for anything in nested options
 * (II) Using the third type parameter for nested options is not ideal. The "Required" piece isn't deep, so defaults aren't filled in as required.
 * (III) Factoring out defaults into "DEFAULT_*_OPTIONS" causes a type inference that doesn't occur when providing an
 * object literal as the "defaults" argument to optionize. This means that you must provide a type where you declare the
 * defaults variable in order to get type safety about the contents of those defaults.
 * (IV) narrowing the type of a single option is a subtype, but using the full type in its constructor.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */

import optionize, { optionize3, OptionizeDefaults } from '../../../../phet-core/js/optionize.js';
import merge from '../../../../phet-core/js/merge.js';
import wilder from '../../wilder.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import EmptyObjectType from '../../../../phet-core/js/types/EmptyObjectType.js';

////////////////////////////////////////////////////////////////////////////////////////////////
// Basic Examples that utilize common PhET options patterns.

// Here is a classic Super class implementation, let's call it Item

type ItemOptions = {
  children?: Item[];
  x?: number;
  y?: number;
  size?: number | 'veryLarge';
};

class Item {
  private children: Item[];
  private x: number;
  private y: number;

  constructor( providedOptions?: ItemOptions ) {

    // In the simplest case, optionize just takes the options that this class defines.
    const options = optionize<ItemOptions>()( {
      children: [],
      x: 0,
      y: 0,
      size: 5
    }, providedOptions );
    this.children = options.children;
    this.x = options.x;
    this.y = options.y;
  }

  getChildren(): Item[] {
    return this.children;
  }
}

const items: Item[] = [];


////////
// Example One: Basic subtype creates options and uses supertype options:

// The convention is to name this private type "SelfOptions", though naming collisions below cause us to name them
// specific to each class.
type SelfOptions = {
  mySpecialNumber?: number;
};

type MyItemOptions = SelfOptions & ItemOptions;

class MyItem extends Item {
  private mySpecialNumber: number;

  constructor( providedOptions?: MyItemOptions ) {

    // Here optionize takes all options that it defines, and also its parent options so that those are allowed to be
    // passed through the super call. By default, optionize knows what the combined type of "providedOptions" (defaults
    // to SelfOptions & ParentOptions).
    const options = optionize<MyItemOptions, SelfOptions, ItemOptions>()( {
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
  treeType: 'cedar' | 'pine';
}
type TreeItemOptions = TreeItemSelfOptions & ItemOptions;

class TreeItem extends Item {
  private treeType: TreeItemSelfOptions[ 'treeType' ];

  constructor( providedOptions: TreeItemOptions ) {
    const options = optionize3<TreeItemOptions, TreeItemSelfOptions, ItemOptions>()( {}, providedOptions );
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
  nodeOptions?: ItemOptions;
};

class ItemContainer {
  private node: Item;

  constructor( providedOptions: ItemContainerOptions ) {
    const options = optionize<ItemContainerOptions>()( {
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
// Example Three Prime: nested options where you do not provide defaults for them.
type ItemContainer2Options = {
  nodeOptions?: ItemOptions;
};

class ItemContainer2 {
  private node: Item;

  constructor( providedOptions: ItemContainer2Options ) {

    // TODO: Explicitly omit here until we can work out a way for optionize to detect nested options directly. https://github.com/phetsims/chipper/issues/1128
    const options = optionize<ItemContainer2Options, StrictOmit<ItemContainer2Options, 'nodeOptions'>>()( {}, providedOptions );

    this.node = new Item( options.nodeOptions ); // eslint-disable-line no-html-constructors
  }
}

const container2 = new ItemContainer2( {
  nodeOptions: {
    children: [ new MyItem() ]
  }
} );
console.log( container2 );


////////
// Example Four: Narrowing parent options' scope

type StationaryItemSelfOptions = EmptyObjectType;

// Another way to do this in this case would be Pick<ItemOptions, 'children'>, depending on opt-in/opt-out preference for narrowing API
type StationaryItemOptions = StationaryItemSelfOptions & StrictOmit<ItemOptions, 'x' | 'y'>;

class StationaryItem extends Item {
  constructor( providedOptions?: StationaryItemOptions ) {

    // Here, since there are no self options, and instead just modified parent options, pass the public options in as the parent options
    const options = optionize<StationaryItemOptions, StationaryItemSelfOptions, ItemOptions>()( {}, providedOptions );

    super( options );
  }
}

items.push( new StationaryItem() );
// items.push( new StationaryItem( { x: 6 } ) ); // ERROR

////////
// Example Five: Using a parent option in the subtype constructor

type ChildrenAdapterItemSelfOptions = EmptyObjectType;

// It is a bit safer in common code to keep this alias, even when identical. This way, if you export your public
// options, you don't skip a level and need to do a global refactor if you want to add an option to this subtype.
type ChildrenAdapterItemOptions = ChildrenAdapterItemSelfOptions & ItemOptions

class ChildrenAdapterItem extends Item {
  constructor( providedOptions?: ChildrenAdapterItemOptions ) {

    // Adding the third argument makes sure that children is known to be defined, for usage later in the constructor
    const options = optionize<ChildrenAdapterItemOptions, ChildrenAdapterItemSelfOptions, ItemOptions>()( {
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


////////
// Example Six: Using a DEFAULTS* variable instead of an object literal, please note this explains Limitation (III).

// Another way to do this in this case would be Pick<ItemOptions, 'children'>, depending on opt-in/opt-out preference for narrowing API
type OtherItemSelfOptions = {
  thing?: number;
  stuff?: string;
};

type OtherItemOptions = OtherItemSelfOptions & ItemOptions;

class OtherItem extends Item {
  constructor( providedOptions?: OtherItemOptions ) {

    // NOTE: You must apply a type here in order to get "blarg" to error when uncommented
    const OTHER_ITEM_DEFAULTS: OptionizeDefaults<OtherItemSelfOptions, ItemOptions, 'x'> = {
      thing: 10,
      stuff: 'some stuff',
      x: 10,
      y: 10
      // ,blarg: 'hi' // ERROR
    };

    // Here, since there are no self options, and instead just modified parent options, pass the public options in as the parent options
    const options = optionize3<OtherItemOptions, OtherItemSelfOptions, ItemOptions>()( {}, OTHER_ITEM_DEFAULTS, providedOptions );

    super( options );

    this.test( options.x );
    this.test( options.thing );
  }

  test( x: number ): void {
    console.log( x );
  }
}

items.push( new OtherItem() );

////////
// Example Seven: Everything is required

// Another way to do this in this case would be Pick<ItemOptions, 'children'>, depending on opt-in/opt-out preference for narrowing API
type RequiredThingOptions = {
  requiredNumber: number;
  requriedString: string;
  // optional?: number; // Uncomment to get the error in the optionize defaults.
};


class RequiredThing {
  constructor( providedOptions?: RequiredThingOptions ) {

    // Here, since there are no self options, and instead just modified parent options, pass the public options in as the parent options
    const options = optionize<RequiredThingOptions>()( {

      // TODO: this should error, it is required and shouldn't have a default, but you have to have one or more optional
      //       items in the options for that to occur. https://github.com/phetsims/chipper/issues/1128
      requiredNumber: 10
    }, providedOptions );

    console.log( options.requiredNumber );
  }
}

console.log( new RequiredThing() );

////////
// Example Eight: An option is generic

class MyGeneric<G> {
  optionalThing: G | undefined;

  constructor( optionalThing?: G ) {
    this.optionalThing = optionalThing;
  }
}

type WrapTypeOptions<T> = {
  favoriteGeneric?: MyGeneric<T>;
};


class WrapType<T> {
  favoriteGeneric: MyGeneric<T>;

  constructor( providedOptions?: WrapTypeOptions<T> ) {
    const options = optionize<WrapTypeOptions<T>, WrapTypeOptions<T>>()( {
      favoriteGeneric: new MyGeneric<T>()
    }, providedOptions );

    this.favoriteGeneric = options.favoriteGeneric;
  }

  getFavoriteItemProperty(): MyGeneric<T> {
    return this.favoriteGeneric;
  }
}

console.log( new WrapType() );
console.log( new WrapType( {
  favoriteGeneric: new MyGeneric<boolean>( true )
} ) );
console.log( new WrapType( {
  favoriteGeneric: new MyGeneric<boolean>()
} ) );

////////
// Example Nine: A work around to Limitation (I)
type HowSuper = 'totally' | 'a bit' | 'no, not really';

type SuperOptions = {
  howSuper: HowSuper;
}

class Super {
  howSuper: HowSuper;

  constructor( providedOptions: SuperOptions ) {
    this.howSuper = providedOptions.howSuper;
  }

  isSuper(): HowSuper {
    return this.howSuper;
  }
}

type KingSelfOptions = {
  hasGoodGroceries?: boolean;
}
type KingOptions = KingSelfOptions & Partial<SuperOptions>;

class King extends Super {
  constructor( providedOptions?: KingOptions ) {

    // Without the 4th type arg, the super() call doesn't know that howSuper has been provided. This is a workaround
    // for Limitation (I). Ideally, we wouldn't need the 4th parameter here.
    const options = optionize<KingOptions, KingSelfOptions, SuperOptions>()( {
      howSuper: 'totally',
      hasGoodGroceries: true
    } );
    super( options );
  }
}

const kingSuper = new King( {
  hasGoodGroceries: false
} );
console.log( kingSuper );


////////
// Example Ten: Defaults from your subtype AND from a common Constants object
// optionize currently only provides one argument to supply ALL defaults with, so you must merge them all into a
// variable (of type OptionizeDefaults<>) and pass that into optionize.
// TODO: improve on this pattern. Perhaps optionize can take two parameters sometimes and & them together to come up with the defaults? https://github.com/phetsims/chipper/issues/1128

const SIM_CONSTANTS = {
  ITEM_CONSTANTS: {
    x: 4,
    isSad: 'yes'
  }
};

type BlueItemSelfOptions = {
  isSad?: string;
}
type BlutItemOptions = BlueItemSelfOptions & ItemOptions;

class BlueItem extends Item {
  constructor( providedOptions?: BlutItemOptions ) {

    // NOTE: isSad can be provided either via the SIM_CONSTANTS objec, or in the object literal, but TypeScript knows
    // if you leave it out entirely.
    const defaults: OptionizeDefaults<BlueItemSelfOptions, ItemOptions> = merge( {}, SIM_CONSTANTS.ITEM_CONSTANTS, {
      y: 10,
      isSad: 'always'
    } );

    const options = optionize3<BlutItemOptions, BlueItemSelfOptions, ItemOptions>()( {}, defaults, providedOptions );

    super( options );

    this.test( options.isSad );
  }

  test( isSad: string ): void {
    console.log( isSad );
  }
}

items.push( new BlueItem() );


////////
// Example Eleven: demonstrating Limitation (IV)

type LargeItemSelfOptions = {
  size?: number;
};

type LargeItemOptions = LargeItemSelfOptions & ItemOptions;

class LargeItem extends Item {
  constructor( providedOptions?: LargeItemOptions ) {

    const options = optionize<LargeItemOptions, LargeItemSelfOptions, ItemOptions>()( {

      // Limitation (IV), I cannot use the type from ItemOptions, but instead I'm internally limited to the public narrowing API of just number.
      // size: 'veryLarge'
      size: 4 // TODO: delete this and use 'veryLarge' above instead

    }, providedOptions );

    super( options );
  }
}

// items.push( new LargeItem( { size: 'veryLarge' } ) ); // fails, good!
items.push( new LargeItem( { size: 7 } ) );
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
    const options = optionize<DogOptions, DogOptions>()( {
      age: 0,
      isGood: true
    }, providedOptions );
    this.age = options.age;
    this.name = options.name;

    this.isGood = options.isGood;
  }

  printAge(): void {
    console.log( this.age );
  }
}

type PersonSelfOptions = {
  name: string; // (1)
  hasShirt?: boolean;
  height?: number;
  attitude?: string; // (5)
  personitude?: string;

  // (6) (I) If it is optional here, then it better be in the default options or providedOptions, otherwise, just make
  // it required here for more type safety and less flexibility.
  dogOptions?: Partial<DogOptions>;
  age?: number;
}

type PersonOptions = PersonSelfOptions; // no parent options

class Person {
  dog: Dog;

  constructor( providedOptions: PersonOptions ) {

    const options = optionize<PersonOptions, PersonSelfOptions>()( {
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

    // Limitation (I): note that isGood is not recognized as being filled in because our optionize doesn't know about nested options.
    options.dogOptions.isGood;

    // Limitation (I) Remove type cast because name should be known to come from providedOptions. Alternatively, you can specify as
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

type EmployeeOptions = EmployeeSelfOptions & StrictOmit<PersonOptions, 'attitude'>;

class Employee extends Person {

  private isAwesome: boolean;
  private isRequiredAwesome: boolean;
  private age: number;

  constructor( providedOptions: EmployeeOptions ) {

    // before optionize because it is required
    console.log( providedOptions.isRequiredAwesome );

    const options = optionize<EmployeeOptions, EmployeeSelfOptions, PersonOptions>()( {
        // blarg: true,
        isAwesome: true, // (2)
        // hasShirt: false, // (3)
        // personitude: 'hello', // (4).a
        // personitude: PERSON_DEFAULTS.personitude (4).b
        // attitude: 'cool' // (5).a
        personitude: 'personable',
        age: 5,
        dogOptions: {
          isGood: true
        }
      },

      // (4).c This is one way to indicate to the type system that personitude will be used in the constructor
      // (III) Note that PERSON_DEFAULTS needs a type where defined, because it isn't an object literal.
      // PERSON_DEFAULTS,
      providedOptions );

    // (5) Use a strategy like (4).b (4).c to "tell" TypeScript that options has an attitude attribute
    // Or just define it there in the first place, like (5).a
    // options.attitude = 'cool';

    // (4) This would only work if you supply (4)(a) (b) or (c) above.
    // const x: string = options.personitude;
    // console.log( x );

    // (II) dogOptions.isGood is still potentially undefined when using in the constructor, even though we added `dogOptions` as a key in the third arg
    // console.log( options.dogOptions.isGood );

    // (4) If you have optional usage sites in the constructor, you can leave it optional in the optionize types
    const a = ( m?: string ) => {};
    a( options.personitude );

    // (4) Optionize knows age is defined here because it is optional in EmployeeSelfOptions, so it must have a default.
    console.log( 'My age is', options.age - 1 ); // cool people seem younger

    super( options );

    this.isAwesome = options.isAwesome;
    this.isRequiredAwesome = options.isRequiredAwesome;
    this.age = options.age;
  }
}

type EmployeeOfTheMonthOptions = StrictOmit<EmployeeOptions, 'isRequiredAwesome'>

class EmployeeOfTheMonth extends Employee {
  constructor( providedOptions: EmployeeOfTheMonthOptions ) { // (8), note that if options are optional, then they get a question mark here.

    const options = optionize<EmployeeOfTheMonthOptions, EmptyObjectType, EmployeeOptions>()( {
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


      // countryOfOrigin: 'america' // ERROR countryOfOrigin is not in any known options.
      // attitude: 'hi' // ERROR (5) not allowed in EmployeeOptions
    } );

    this.alice = new EmployeeOfTheMonth( {
      name: 'Melissa' // (8) if not for limitation (I), EmployeeOfTheMonth would always have name 'Bob'
    } );
  }
}

wilder.register( 'WilderOptionsPatterns', WilderOptionsPatterns );
export default WilderOptionsPatterns;