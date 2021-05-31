import * as React from 'react';
import { useEffect, useRef } from 'react';
import { Pixel } from '../models/Pixel';
import { getPixelsForCanvas } from '../services/CanvasToPixels';

export interface PictureCanvasProps {
    image: HTMLImageElement;
    setRawPixelMatrix: (pixels: Pixel[][]) => void;
}

const PictureCanvas = (props: PictureCanvasProps): JSX.Element => {
        const canvasRef = useRef<HTMLCanvasElement>(null);
        
    const drawImage = () => {
        if (props.image) {
            const canvas = canvasRef.current;
            if (canvas) {
                const canvasContext = canvas.getContext('2d');
                if (canvasContext) {
                    canvasContext.clearRect(0, 0, canvas.width, canvas.height)
                    drawImageOnCanvas().then(() => {
                        getPixelsFromCanvas();
                    });
                }
            }
        }
    };

    const drawImageOnCanvas = async () => {
        const canvas = canvasRef.current;
        if (canvas) {
            const resizedImage = await getResizedImageToCanvas(canvas);
            const xOffset = resizedImage.width < canvas.width ? ((canvas.width - resizedImage.width) / 2) : 0;
            const yOffset = resizedImage.height < canvas.height ? ((canvas.height - resizedImage.height) / 2) : 0;
            const context = canvas.getContext('2d');
            if(context) {
                context.drawImage(resizedImage, xOffset, yOffset, resizedImage.width, resizedImage.height);
            }
        }
    }

    const getResizedImageToCanvas = (canvas: HTMLCanvasElement): Promise<HTMLImageElement> => {
        const wrh = props.image.width / props.image.height;
        let newWidth = canvas.width;
        let newHeight = newWidth / wrh;
        if (newHeight > canvas.height) {
            newHeight = canvas.height;
            newWidth = newHeight * wrh;
        }
        return createImage(props.image.src, newWidth, newHeight);
    }

    const createImage = (src: string, width: number, height: number): Promise<HTMLImageElement> => {
        const newImg = new Image(width, height);
        newImg.src = src;
        return new Promise<HTMLImageElement>(resolve => {
            newImg.onload = () => {
                resolve(newImg);
            }
        }); 
    }

    const getPixelsFromCanvas = () => {
        if (canvasRef.current) { 
            const context = canvasRef.current.getContext('2d');
            if (context) {
                const asciiArtMatrix = getPixelsForCanvas(canvasRef.current, context);
                props.setRawPixelMatrix(asciiArtMatrix);
            }
        }
    };

    useEffect(drawImage, [props.image]);

    return (
        <canvas
            ref={canvasRef}
            width={800}
            height={800}
            id="canvas">
        </canvas>
    );
};

export default PictureCanvas;