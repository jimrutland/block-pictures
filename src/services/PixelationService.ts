import { Pixel } from "../models/Pixel";
import { createCombinedPixel } from './PixelCombiner';

export function getPixelatedImage(pixelMatrix: Pixel[][], factor: number): Pixel[][] {
    const pixelatedImage: Pixel[][] = [];
    for (let rowIndex = 0; rowIndex < pixelMatrix.length; rowIndex += factor) {
        for (let columnIndex = 0; columnIndex < pixelMatrix[rowIndex].length; columnIndex += factor) {
            const combinedPixel = createCombinedPixel(getChunkOfPixelsFromPosition(pixelMatrix, rowIndex, columnIndex, factor));
            for (let i = 0; i < factor; i++) {
                for (let j = 0; j < factor; j++) {
                    if (pixelatedImage[rowIndex + i]) {
                        pixelatedImage[rowIndex + i][columnIndex + j] = combinedPixel;
                    } else {
                        pixelatedImage[rowIndex + i] = [combinedPixel];
                    }
                }
            }
        }
    }
    return pixelatedImage;
}

function getChunkOfPixelsFromPosition(pixelMatrix: Pixel[][], rowIndex: number, columnIndex: number, factor: number): Pixel[] {
    const pixelChunk: Pixel[] = [];
    for (let i = 0; i < factor; i++) {
        for  (let j = 0; j < factor; j++) {
            if (pixelMatrix[rowIndex + i] && pixelMatrix[rowIndex + i][columnIndex + j])
                pixelChunk.push(pixelMatrix[rowIndex + i][columnIndex + j]);
            else
                break;
        }
    }
    return pixelChunk;
}




