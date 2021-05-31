import { Pixel } from "../models/Pixel";

export function getGrayscaledImage(pixelMatrix: Pixel[][]): Pixel[][] {
    const grayScaleImage: Pixel[][] = [];
    for (let rowIndex = 0; rowIndex < pixelMatrix.length; rowIndex++) {
        for (let columnIndex = 0; columnIndex < pixelMatrix[rowIndex].length; columnIndex++) {
            if (grayScaleImage[rowIndex]) {
                grayScaleImage[rowIndex].push(getGrayscalePixel(pixelMatrix[rowIndex][columnIndex]));
            } else {
                grayScaleImage[rowIndex] = [pixelMatrix[rowIndex][columnIndex]];
            }
        }
    }
    return grayScaleImage;
}

function getGrayscalePixel(pixel: Pixel) {
    return new Pixel(pixel.getIntensity(), pixel.getIntensity(), pixel.getIntensity(), pixel.getAlphaChannel());
}




