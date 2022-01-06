// Copyright 2021-2022, University of Colorado Boulder

/**
 * Demonstrates using PhET Enumerations
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */

import wilder from '../../wilder.js';
import StringEnumerationProperty from '../../../../axon/js/StringEnumerationProperty.js';
import RichEnumerationProperty from '../../../../axon/js/RichEnumerationProperty.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import RichEnumeration from '../../../../phet-core/js/RichEnumeration.js';
import EnumerationValue from '../../../../phet-core/js/EnumerationValue.js';

type WilderEnumerationPatternsOptions = {
  tandem: Tandem
};

class WilderEnumerationPatterns {
  constructor( providedOptions: WilderEnumerationPatternsOptions ) {

    /************************************************************************
     * Level 1: String union type.
     * Use this when you need a type, but not values.
     * Strings are idiomatic for TypeScript enumerations, they are type safe and easy to understand in the debugger.
     */

    type PetChoice = 'DOG' | 'CAT';
    // export default PetChoice;

    // sample usage
    const x: PetChoice = 'DOG';
    // const y: PetChoice = 'PARROT'; // Error
    console.log( x );
    const favoritePet = ( choice: PetChoice ) => {
      console.log( 'my favorite pet is:', choice );
    };
    favoritePet( 'CAT' );

    /************************************************************************
     * Level 2: String union type and ability to get the values at runtime.
     * Use this when you need values, and it is OK to be a string.
     * Filename = AnimalChoice.ts
     */

    const AnimalChoiceValues = [ 'PANDA', 'TIGER' ] as const; // The values
    type AnimalChoice = typeof AnimalChoiceValues[number]; // Type

    // Then...
    // register the AnimalChoiceValues with the namespace
    // export { AnimalChoiceValues };
    // export default AnimalChoice;

    // Sample usage
    const animalChoiceProperty = new StringEnumerationProperty<AnimalChoice>( AnimalChoiceValues, 'TIGER', {
      tandem: providedOptions.tandem.createTandem( 'animalChoiceProperty' )
    } );
    animalChoiceProperty.link( animal => {
      // console.log( animal );
    } );
    animalChoiceProperty.value = 'PANDA';
    animalChoiceProperty.value = 'TIGER';

    /************************************************************************
     * Level 3: Rich enumeration types
     * Use this when you need methods or data on the enumeration values.
     */
    class MammalType extends EnumerationValue {
      static PUPPY = new MammalType();
      static KITTY = new MammalType();

      // Gets a list of keys, values and mapping between them.  For use in RichEnumerationProperty and PhET-iO
      // TODO: Let's try to get rid of the type parameter here to avoid the duplication (we think we can make it infer it), https://github.com/phetsims/chipper/issues/1106
      static enumeration = new RichEnumeration<MammalType>( MammalType, {
        phetioDocumentation: 'Describes the type of the mammal.'
      } );

      sayHello() {
        console.log( 'hello' );
      }

      // Emulate a sealed class, so no other clients can create instances of type MammalType
      private constructor() { super(); }
    }

    const mammalTypeProperty = new RichEnumerationProperty( MammalType.KITTY, {
      tandem: providedOptions.tandem.createTandem( 'mammalTypeProperty' )
    } );
    mammalTypeProperty.link( x => x.sayHello() );
    mammalTypeProperty.value = MammalType.KITTY;
    console.log( MammalType.KITTY.name );

    // p3.value = MammalType.WRONG; // type error
    // p3.value = 'left';  // type error
  }
}

wilder.register( 'WilderEnumerationPatterns', WilderEnumerationPatterns );
export default WilderEnumerationPatterns;