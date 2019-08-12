"use strict";
//  Chance 2.0
//  http://chancejs.com
//  (c) 2013 Victor Quinn
//  Chance may be freely distributed or modified under the MIT license.
exports.__esModule = true;
var MersenneTwister_1 = require("./MersenneTwister");
function Chance(seed) {
    var _this = this;
    console.log('this seed is', seed);
    console.log('instantiating mersenne twister');
    this.seed = seed;
    // If no generator function was provided, use our MT
    this.mt = new MersenneTwister_1.MersenneTwister(this.seed);
    this.random = function () { return _this.mt.random(_this.seed); };
    console.log('here is some random', this.random());
    console.log('here is some random', this.random());
    console.log('here is some random', this.random());
    console.log('here is some random', this.random());
    console.log('here is some random', this.random());
    return this;
}
exports.Chance = Chance;
