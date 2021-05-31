import { Pixel } from "../models/Pixel";

export function getColorShiftedImage(pixelMatrix: Pixel[][]): Pixel[][] {
    return pixelMatrix.map(pixelRow => {
        return pixelRow.map(pixel => {
            return new Pixel(pixel.getGreenChannel(), pixel.getBlueChannel(), pixel.getRedChannel(), pixel.getAlphaChannel());
        });
    });
}




