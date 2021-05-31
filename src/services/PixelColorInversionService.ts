import { Pixel } from "../models/Pixel";

export function getInvertedColorImage(pixelMatrix: Pixel[][]): Pixel[][] {
    const invertedImage: Pixel[][] = [];
    for (let rowIndex = 0; rowIndex < pixelMatrix.length; rowIndex++) {
        for (let columnIndex = 0; columnIndex < pixelMatrix[rowIndex].length; columnIndex++) {
            const pixel = pixelMatrix[rowIndex][columnIndex];
            const invertedPixel = new Pixel(
                255 - pixel.getRedChannel(),
                255 - pixel.getGreenChannel(),
                255 - pixel.getBlueChannel(),
                pixel.getAlphaChannel()
            );
            if (invertedImage[rowIndex]) {
                invertedImage[rowIndex][columnIndex] = invertedPixel;
            } else {
                invertedImage[rowIndex] = [invertedPixel];
            }
        }
    }
    return invertedImage;
}