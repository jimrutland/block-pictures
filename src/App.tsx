import { useState } from 'react';
import EditedImage from './components/EditedImage';
import FileUpload from './components/FileUpload';
import PictureCanvas from './components/PictureCanvas';
import { Pixel } from './models/Pixel';
import { getBlockImage } from './services/BlockService'

export type ImageType = "pixelated" | "grayscale" | "invert" | "flip" | "shift" | "clear" | "block";

const App = (): JSX.Element => {
    const [image, setImage] = useState<HTMLImageElement>(new Image());
    const [editedPixels, setEditedPixels] = useState<Pixel[][]>([]);
    const [rawPixelMatrix, setRawPixelMatrix] = useState<Pixel[][]>([]);

    const drawEditedImage = (imageType: ImageType) => {
        switch(imageType)  {
            case "clear":
                setEditedPixels([]);
                break;
            case "block":
                setEditedPixels(getBlockImage(rawPixelMatrix));
                break;
            default:
                break;
        }
    };

    return (
        <div id="appContainer">
            <div id="artContainer">
                <PictureCanvas
                    image={image} 
                    setRawPixelMatrix={setRawPixelMatrix}/>
                { editedPixels.length && <EditedImage pixels={editedPixels} /> }
            </div>
            <div id="buttons">
                <FileUpload setImage={setImage}/>
                <button onClick={() => drawEditedImage("block")}> Turn Into Blocks </button>
                <button onClick={() => drawEditedImage("clear")}> Clear </button>
            </div>
        </div>
    );
};

export default App