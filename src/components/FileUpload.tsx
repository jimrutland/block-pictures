
import * as React from 'react';
import Button from '@material-ui/core/Button';

export interface FileUploadProps {
    setImage: (image: HTMLImageElement) => void;
}

const FileUpload = (props: FileUploadProps): JSX.Element => {
    const imageLoaded = (event: React.ChangeEvent) => {
        const urlCreator = window.URL || window.webkitURL;
        const fileUploadElement = event.target as HTMLInputElement;
        if (fileUploadElement && fileUploadElement.files) {
            const uploadedFile = fileUploadElement.files[0];
            const image = new Image();
            image.onload = () => {
                props.setImage(image);
            };
            if (uploadedFile) {
                image.src = urlCreator.createObjectURL(uploadedFile);
            }
        }
    };
    return (<Button
        variant="contained"
        component="label"
        >
        Upload File
        <input
            id="fileUploadInput"
            type="file"
            accept="image/*"
            onChange={imageLoaded}
            hidden
        />
    </Button>);
};

export default FileUpload;