
import { Pixel } from '../models/Pixel';
import { useEffect, useRef } from 'react';

export interface ImageProps {
    pixels: Pixel[][];
}

const EditedImage = (props: ImageProps): JSX.Element => {
    const imageCanvas = useRef<HTMLCanvasElement>(null);
    
    const drawCirclesOnPixels = (pixels: Pixel[][]): void => {
        let currentCenterX = 3.5;
        let currentCenterY = 3.5;
        if (imageCanvas.current) {
            const context = imageCanvas.current.getContext("2d");
            if (context) {
                for (const pixelRow of pixels) {
                    for (let i = 0; i < pixelRow.length; i++) {
                        context.beginPath();
                        context.arc(currentCenterX, currentCenterY, 2, 0, 2 * Math.PI, false);
                        context.stroke();
                        context.closePath();
                        context.beginPath();
                        context.arc(currentCenterX, currentCenterY, 0.5, 0, 2 * Math.PI, false);
                        context.stroke();
                        context.closePath();         
                        currentCenterX += 7;
                    }
                    currentCenterX = 3.5;
                    currentCenterY += 7;
                }
            }
        }
    }

    const drawImage = (): void => {
        if (imageCanvas.current) {
            const context = imageCanvas.current.getContext("2d");
            const newImageData: number[] = props.pixels.reduce((accumulation: number[], currentPixelRow: Pixel[]) => {
                for (const pixel of currentPixelRow) {
                    accumulation.push(pixel.getRedChannel());
                    accumulation.push(pixel.getGreenChannel());
                    accumulation.push(pixel.getBlueChannel());
                    accumulation.push(pixel.getAlphaChannel());
                }
                return accumulation;
            }, []);
            
            const pixelDataForImage = new ImageData(Uint8ClampedArray.from(newImageData), props.pixels.length, props.pixels.length);
            if (context)
                context.putImageData(pixelDataForImage, 0, 0);
            drawCirclesOnPixels(props.pixels);
        }
    }

    useEffect(drawImage, [props.pixels]);

    return (<canvas width={800} height={800} ref={imageCanvas}></canvas>);
};

export default EditedImage;