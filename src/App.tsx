import { FormEvent, useState } from 'react';
import EditedImage from './components/EditedImage';
import FileUpload from './components/FileUpload';
import PictureCanvas from './components/PictureCanvas';
import { Pixel } from './models/Pixel';
import { getBlockImage } from './services/BlockService';
import Button from '@material-ui/core/Button';

export type ImageType = "pixelated" | "grayscale" | "invert" | "flip" | "shift" | "clear" | "block";

const App = (): JSX.Element => {
    const [image, setImage] = useState<HTMLImageElement>(new Image());
    const [editedPixels, setEditedPixels] = useState<Pixel[][]>([]);
    const [rawPixelMatrix, setRawPixelMatrix] = useState<Pixel[][]>([]);
    const [blockFactor, setBlockFactor] = useState<number>(11);

    const drawEditedImage = (imageType: ImageType) => {
        switch(imageType)  {
            case "clear":
                setEditedPixels([]);
                break;
            case "block":
                setEditedPixels(getBlockImage(rawPixelMatrix, blockFactor));
                break;
            default:
                break;
        }
    };

    return (
        <div id="appContainer">
            <div id="appHeader">
                Transform An Image Into Building Blocks
            </div>
            <div id="imageContainer">
                { editedPixels.length ? 
                    <EditedImage blockFactor={blockFactor} pixels={editedPixels} />
                    : <PictureCanvas image={image} setRawPixelMatrix={setRawPixelMatrix}/> }
            </div>
            <div id="buttons">
                <FileUpload setImage={setImage}/>
                <div id="sliderContainer">
                    <span>Block Size</span>
                    <input id="slider" type="range" min="9" max="15" value={blockFactor} onInput={(e: FormEvent<HTMLInputElement>) => {
                        const slider = e.target as HTMLInputElement;
                        setBlockFactor(parseInt(slider.value));
                    }}/>
                </div>
                <Button variant="contained" onClick={() => drawEditedImage("block")}> Turn Into Blocks </Button>
                <Button variant="contained" onClick={() => drawEditedImage("clear")}> Clear </Button>
            </div>
        </div>
    );
};
export default App