
let faceapi = require("face-api.js");
let canvas = require("canvas");
let fetch = require("node-fetch");
let path = require("path");

const { Canvas, Image, ImageData } = canvas;
faceapi.env.monkeyPatch({ fetch: fetch });
faceapi.env.monkeyPatch({Canvas, Image, ImageData });

//Ig is not really needed, implemented only to keep the same format

async function detectFaces(ig, url) {
    const referenceImage = await canvas.loadImage(url);

    await faceapi.nets.tinyFaceDetector.loadFromDisk(path.join(__dirname, '../models'));
    await faceapi.nets.ageGenderNet.loadFromDisk(path.join(__dirname, '../models'));
    await faceapi.nets.faceLandmark68Net.loadFromDisk(path.join(__dirname, '../models'));
    const detections = await faceapi.detectAllFaces(referenceImage, new faceapi.TinyFaceDetectorOptions()).withAgeAndGender();
    if(detections.length == 0) {
        return false;
    }
    return detections;
}

module.exports = detectFaces;