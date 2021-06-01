
import { Pixel } from '../models/Pixel';
import { useEffect, useRef } from 'react';

export interface ImageProps {
    pixels: Pixel[][];
    blockFactor: number;
}

const EditedImage = (props: ImageProps): JSX.Element => {
    const imageCanvas = useRef<HTMLCanvasElement>(null);
    
    const drawCirclesOnPixels = (pixels: Pixel[][]): void => {
        const halfFactor = props.blockFactor / 2;
        let currentCenterX = halfFactor;
        let currentCenterY = halfFactor;
        if (imageCanvas.current) {
            const context = imageCanvas.current.getContext("2d");
            if (context) {
                for (const pixelRow of pixels) {
                    for (let i = 0; i < pixelRow.length; i++) {
                        context.beginPath();
                        context.arc(currentCenterX, currentCenterY, 3.33, 0, 2 * Math.PI, false);
                        context.stroke();
                        context.closePath();
                        context.beginPath();
                        context.arc(currentCenterX, currentCenterY, 0.5, 0, 2 * Math.PI, false);
                        context.stroke();
                        context.closePath();         
                        currentCenterX += props.blockFactor;
                    }
                    currentCenterX = halfFactor;
                    currentCenterY += props.blockFactor;
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(drawImage, [props.pixels]);

    return (<canvas width={800} height={800} ref={imageCanvas}></canvas>);
};

export default EditedImage;