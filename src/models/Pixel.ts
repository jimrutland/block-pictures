
export class Pixel {
    private red;
    private green;
    private blue;
    private alpha;

    constructor(red: number, green: number, blue: number, alpha: number) {
        this.red = red;
        this.green = green;
        this.blue = blue;
        this.alpha = alpha;
    }

    public getRedChannel(): number {
        return this.red;
    }

    public getBlueChannel(): number {
        return this.blue;
    }

    public getGreenChannel(): number {
        return this.green;
    }

    public getAlphaChannel(): number {
        return this.alpha;
    }

    public getIntensity(): number {
        return (this.red + this.green + this.blue) / 3;
    }
}