// Copyright 2021, University of Colorado Boulder

/**
 * Demonstrates using PhET Options patterns via destructuring.
 *
 * Constraints that PhET needs to support in its options pattern (copied from WilderOptionsDestructuringModel)
 * 0. Some values are optional and some are required (like config)
 * 1. from usage to supertype (pass children through to Node, not used by subtype)
 * 2. from usage to subtype, supertype doesn't know about this option
 * 3. declared in supertype, new default in subtype, optionally passed by usage
 * 4. optionally passed by usage, used in subtype, defined in supertype (either with subtype default or without)
 * 5. Subtype requires usage doesn't pass in, subtype defines and passes to super ("attitude" option)
 * 6. Support for sub-options patterns throughout (like visiblePropertyOptions)
 * 7. Parent has config (required params too)
 * 8. Run the entire test but instead of config, there should be options?: XXX instead of config: (required)
 * 9. Make sure all optional options have defaults.
 * 10. Mutually exclusive options
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import wilder from '../../wilder.js';

// You can mention the age or the height of a dog, but not both.
type DogOptions = {
  age: number; height?: never
} | {
  age?: never; height: number
};

class Dog {
  age: number;

  constructor( options: DogOptions ) {
    let { age } = options;
    const { height } = options;

    // infer height from age;
    if ( age === undefined ) {
      age = height! / 10;
    }

    this.age = age;
  }
}

// 0
type ElectronOptions = {
  energy?: number,
  id: string
};

class Electron {
  energy: number;
  id: string;

  constructor( options: ElectronOptions ) {
    const { energy = 0, id } = options;
    this.energy = energy;
    this.id = id;
  }

  /*@public*/
  toString() {return 'Electron: energy=' + this.energy + ', id=' + this.id;}
}

type MyPropertyOptions = {
  phetioReadOnly?: boolean
};

type NodeOptions = {
  visible?: boolean,
  opacity?: number,
  visiblePropertyOptions?: MyPropertyOptions
};


class MyProperty {
  constructor( options: MyPropertyOptions ) {}
}

class Node {
  visible: boolean;
  opacity: number;
  visibleProperty: MyProperty;

  constructor( options: NodeOptions = {} ) {
    const { visible = true, opacity = 1.0, visiblePropertyOptions = {} } = options;
    this.visible = visible;
    this.opacity = opacity;
    this.visibleProperty = new MyProperty( visiblePropertyOptions );
  }

  // @public
  toString() {
    return 'Node: visible=' + this.visible;
  }
}

class InvisiblePanel extends Node {
  constructor( options: NodeOptions = {} ) {

    // (4)
    console.log( options.visible );

    // (3)
    super( { ...options, ...{ visible: false } } );
  }

  // @public
  toString() {
    return 'InvisibleNode: visible=' + this.visible;
  }
}

type InfoPanelOptions = {
  title?: string
} & Omit<NodeOptions, 'opacity'>;

class InfoPanel extends Node {

  // (5) User cannot pass in opacity, it is hard-coded here
  constructor( options: InfoPanelOptions = {} ) {
    const { title = 'default title' } = options;

    console.log( 'info panel title: ' + title );

    // (3)
    super( { ...options, ...{ visible: false } } );
  }

  // @public
  toString() {
    return 'InvisibleNode: visible=' + this.visible;
  }
}

class WilderOptionsDestructuringModel {
  constructor() {

    console.log( '######## START WilderOptionsDestructuringModel' );

    const electron = new Electron( {
      id: 'first electron'
    } );
    console.log( electron.toString() );
    const node = new Node(); // eslint-disable-line
    console.log( node.toString() );

    const invisiblePanel = new InvisiblePanel();
    console.log( invisiblePanel.toString() );

    const transparentPanel = new InfoPanel( {
      title: 'The Info',
      visible: true,
      visiblePropertyOptions: {
        phetioReadOnly: false
      }
      // opacity: 7 // TYPE ERROR :)
    } );
    console.log( transparentPanel.toString() );

    const n = new Node( { // eslint-disable-line
      visiblePropertyOptions: {
        phetioReadOnly: true
        // , somethingOther: 'test' // TYPE ERROR :)
      }
      // ,somethingElse: 'blue' // TYPE ERROR :)
    } );
    console.log( n.toString() );

    const d1 = new Dog( { age: 7 } );
    const d2 = new Dog( { height: 123 } );
    console.log( d1 );
    console.log( d2 );

    console.log( '######## END WilderOptionsDestructuringModel' );
  }
}

wilder.register( 'WilderOptionsDestructuringModel', WilderOptionsDestructuringModel );
export default WilderOptionsDestructuringModel;