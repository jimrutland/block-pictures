import { Pixel } from "../models/Pixel";

export function getPixelsForCanvas(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D): Pixel[][] {
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height).data;
    const pixels: Pixel[][] = [];
    let pixelRow: Pixel[] = [];
    let count = 0;
    for (let index = 0; index <= imageData.length; index += 4) {
        const red = imageData[index];
        const green = imageData[index + 1];
        const blue = imageData[index + 2];
        const alpha = imageData[index + 3];
        const pixel = new Pixel(red, green, blue, alpha);
        if (count === canvas.width) {
            count = 0;
            pixels.push([...pixelRow]);
            pixelRow = [pixel];
        } else {
            pixelRow.push(pixel);
        }
        count++;
    }
    return pixels;
}