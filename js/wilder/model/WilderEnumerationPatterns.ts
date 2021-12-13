// Copyright 2021, University of Colorado Boulder

/**
 * Demonstrates using PhET Enumerations
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */

import Property from '../../../../axon/js/Property.js';
import wilder from '../../wilder.js';
import StringEnumerationProperty from '../../../../axon/js/StringEnumerationProperty.js';
import RichEnumerationProperty from '../../../../axon/js/RichEnumerationProperty.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import RichEnumeration from '../../../../phet-core/js/RichEnumeration.js';

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

    type PetChoice = 'dog' | 'cat';

    const p1 = new Property<PetChoice>( 'cat' );
    p1.set( 'dog' );
    p1.value = 'cat';

    /************************************************************************
     * Level 2: String union type and ability to get the values at runtime.
     * Use this when you need values, and it is OK to be a string.
     * Filename = AnimalChoice.ts
     */

    const AnimalChoiceValues = [ 'panda', 'tiger' ] as const; // The values
    type AnimalChoice = typeof AnimalChoiceValues[number]; // Type

    // Then...
    // register the AnimalChoiceValues with the namespace
    // export { AnimalChoiceValues };
    // export default AnimalChoice;

    // Sample usage
    const p2 = new StringEnumerationProperty<AnimalChoice>( AnimalChoiceValues, 'tiger', {
      tandem: providedOptions.tandem.createTandem( 'animalChoiceProperty' )
    } );
    p2.link( animal => {
      // console.log( animal );
    } );
    p2.value = 'panda';
    p2.value = 'tiger';

    /************************************************************************
     * Level 3: Rich enumeration types
     * Use this when you need methods or data on the enumeration values.
     */
    class MammalType {
      static PUPPY = new MammalType();
      static KITTY = new MammalType();

      // Gets a list of keys, values and mapping between them.  For use in RichEnumerationProperty and PhET-iO
      static enum = new RichEnumeration<MammalType>( MammalType, {
        phetioDocumentation: 'Describes the type of the mammal.'
      } );

      sayHello() {
        console.log( 'hello' );
      }

      // Emulate a sealed class, so no other clients can create instances of type MammalType
      private constructor() { }
    }

    const mammalTypeProperty = new RichEnumerationProperty( MammalType, MammalType.KITTY, {
      tandem: providedOptions.tandem.createTandem( 'mammalTypeProperty' )
    } );
    mammalTypeProperty.link( x => x.sayHello() );
    mammalTypeProperty.value = MammalType.KITTY;

    // p3.value = MammalType.WRONG; // type error
    // p3.value = 'left';  // type error
  }
}

wilder.register( 'WilderEnumerationPatterns', WilderEnumerationPatterns );
export default WilderEnumerationPatterns;