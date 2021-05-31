import { Pixel } from "../models/Pixel";

export function createCombinedPixel(pixelsToCombine: Pixel[]): Pixel {
    const redChannels = [];
    const blueChannels = [];
    const greenChannels = [];
    const alphaChannels = [];
    for (const pixel of pixelsToCombine){
        redChannels.push(pixel.getRedChannel());
        greenChannels.push(pixel.getGreenChannel());
        blueChannels.push(pixel.getBlueChannel());
        alphaChannels.push(pixel.getAlphaChannel());
    }
    return getCombinedPixel(redChannels, greenChannels, blueChannels, alphaChannels);
}

function getCombinedPixel(reds: number[], greens: number[], blues: number[], alphas: number[]): Pixel {
    const redAverage = getAverageColor(reds);
    const greenAverage = getAverageColor(greens);
    const blueAverage = getAverageColor(blues);
    const alphaAverage = getAverageColor(alphas);
    return new Pixel(redAverage, greenAverage, blueAverage, alphaAverage);
}

function getAverageColor(colors: number[]): number {
    return colors.reduce((channelAccumulation: number, colorChannelValue: number): number => {
        return channelAccumulation += colorChannelValue;
    }, 0) / colors.length;
}