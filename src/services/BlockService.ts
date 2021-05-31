import { blockPixels } from "../maps/blockPixels";
import { Pixel } from "../models/Pixel";
import { getPixelatedImage } from "./PixelationService";

export function getBlockImage(pixelMatrix: Pixel[][], blockFactor: number): Pixel[][] {
    const pixelatedImage = getPixelatedImage(pixelMatrix, blockFactor);
    return pixelatedImage.map(pixelRow => pixelRow.map(pixel => getBlockPixelFromPixel(pixel)));
}

function getBlockPixelFromPixel(pixel: Pixel): Pixel {
    let closestBlockPixel: Pixel = new Pixel(0, 0, 0, 0);
    let overallDifference: number = Infinity;
    for (const blockPixel of blockPixels) {
        let difference;
        difference = Math.abs(pixel.getRedChannel() - blockPixel.getRedChannel());
        difference += Math.abs(pixel.getGreenChannel() - blockPixel.getGreenChannel());
        difference += Math.abs(pixel.getBlueChannel() - blockPixel.getBlueChannel());
        if (overallDifference) {
            if (overallDifference > difference) {
                overallDifference = difference;
                closestBlockPixel = blockPixel;
            }
        } else {
            overallDifference = difference;
            closestBlockPixel = blockPixel;
        }
    }
    return closestBlockPixel;
}
