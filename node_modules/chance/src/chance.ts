//  Chance 2.0
//  http://chancejs.com
//  (c) 2013 Victor Quinn
//  Chance may be freely distributed or modified under the MIT license.

import { MersenneTwister } from './MersenneTwister'

export function Chance(seed: number) {
    console.log('this seed is', seed)

    console.log('instantiating mersenne twister')
    this.seed = seed
    // If no generator function was provided, use our MT
    this.mt = new MersenneTwister(this.seed)
    this.random = () => this.mt.random(this.seed)
    console.log('here is some random', this.random())
    console.log('here is some random', this.random())
    console.log('here is some random', this.random())
    console.log('here is some random', this.random())
    console.log('here is some random', this.random())
    return this;
}

