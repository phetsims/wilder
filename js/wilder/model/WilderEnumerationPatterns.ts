// Copyright 2021-2022, University of Colorado Boulder

/**
 * Demonstrates using PhET Enumerations
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */

import wilder from '../../wilder.js';
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
     * The primary enumeration pattern.
     */
    class MammalType extends EnumerationValue {
      static PUPPY = new MammalType();
      static KITTY = new MammalType();

      // Gets a list of keys, values and mapping between them.  For use in RichEnumerationProperty and PhET-iO
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

    /************************************************************************
     * Example: Augmenting an enumeration.
     * Use this only when you need to create a new enumeration that takes all the values of another enumeration and adds
     * more values. This should be rarely used.
     */
    class TreeType extends EnumerationValue {
      static ASH = new TreeType();
      static BIRCH = new TreeType();

      static enumeration = new RichEnumeration<TreeType>( TreeType );

      // no private constructor, since this must be accessible from the subtype
    }

    class SpecialTreeType extends TreeType {
      static CEDAR = new SpecialTreeType();

      static enumeration = new RichEnumeration<TreeType>( SpecialTreeType, {

        // Match any static member of SpecialTreeType that is instanceof TreeType, so it will include the existing ASH, BIRCH and also the new value CEDAR
        instanceType: TreeType
      } );
    }

    console.log( SpecialTreeType.enumeration.values ); // Prints ASH, BIRCH, CEDAR

    /************************************************************************
     * String union type.
     * Use this when you need a type, but not values.  You may see this more in legacy code, like LayoutBox,
     * or in APIs where it is preferable for options or parameters to be plain strings.
     * For instance: new LayoutBox({align:'top'});
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
     * String union type WITH runtime values.
     * Typically it will be preferable to use "The primary enumeration pattern." from above, but
     * special cases may require string union with runtime values.
     * Filename = AnimalChoice.ts
     */

    const AnimalChoiceValues = [ 'PANDA', 'TIGER' ] as const; // The values
    type AnimalChoice = typeof AnimalChoiceValues[number]; // Type

    // Then...
    // register the AnimalChoiceValues with the namespace
    // export { AnimalChoiceValues };
    // export default AnimalChoice;

    console.log( AnimalChoiceValues );// ['PANDA','TIGER']
    const testFunction = ( a: AnimalChoice ) => {
      console.log( 'hello: ' + a );
    };
    testFunction( 'PANDA' );
  }
}

wilder.register( 'WilderEnumerationPatterns', WilderEnumerationPatterns );
export default WilderEnumerationPatterns;