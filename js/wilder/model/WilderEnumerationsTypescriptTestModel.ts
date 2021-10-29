// Copyright 2021, University of Colorado Boulder

/**
 * Demonstrates using PhET Enumerations
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */

import Property from '../../../../axon/js/Property.js';
import wilder from '../../wilder.js';
import StringEnumerationProperty from './StringEnumerationProperty.js';
import RichEnumerationProperty from './RichEnumerationProperty.js';

class WilderEnumerationsTypescriptTestModel {}

/************************************************************************
 * Level 1: String union type.
 * Use this when you don't need values.
 * Strings are idiomatic for TypeScript enumrations, they are type safe and easy to understand in the debugger.
 */

type PetChoice = 'dog' | 'cat';

const p1 = new Property<PetChoice>( 'cat' );
p1.set( 'dog' );
p1.value = 'cat';

/************************************************************************
 * Level 2: String union type from DRY values.
 * Use this when you need values, and it is OK to be a string.
 */

const AnimalChoiceValues = [ 'panda', 'tiger' ] as const; // The values
type AnimalChoice = ( typeof AnimalChoiceValues )[number]; // Type
// export { AnimalChoice as default, AnimalChoiceValues };

const p2 = new StringEnumerationProperty<AnimalChoice>( AnimalChoiceValues, 'tiger' );
p2.link( ( animal: AnimalChoice ) => {
  console.log( animal );
} );
p2.value = 'panda';
p2.value = 'tiger';

/************************************************************************
 * Level 3: Rich enumeration types
 * Use this when you need methods on the enumeration values.
 * At runtime, values do not have a nice display by default
 */

class XDirection {
  static LEFT = new XDirection();
  static RIGHT = new XDirection();
  static phetioDocumentation = 'Describes the directionality of the ...';

  // @public
  sayHello() {
    console.log( 'hello' );
  }

  // Emulate a sealed class
  private constructor() { }
}

const p3 = new RichEnumerationProperty<XDirection>( XDirection, XDirection.LEFT );
p3.link( ( x: XDirection ) => {
  console.log( x );
  x.sayHello();
} );
p3.value = XDirection.RIGHT;
// p3.value = XDirection.WRONG;
// p3.value = 'left';

wilder.register( 'WilderEnumerationsTypescriptTestModel', WilderEnumerationsTypescriptTestModel );
export default WilderEnumerationsTypescriptTestModel;