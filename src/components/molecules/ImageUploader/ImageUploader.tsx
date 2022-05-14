import './ImageUploader.scss';
import { Answer, Question } from '@/models';
import { createRef, useEffect, useState } from 'react';
import PlusIcon from '@/assets/images/plus-icon.png';
import Utils from '@/utils';
import { Button } from '@/components/atoms';

type ImageUploaderProps = {
    parentElement: Question | Answer;
    onImageChange: (image: string) => void;
    onUploadImageError: (error: string) => void;
};

function ImageUploader(props: ImageUploaderProps) {
    const imageRef = createRef<any>();
    const [uploadedImage, setUploadedImage] = useState('');

    useEffect(() => {
        setUploadedImage(props.parentElement.image ?? '');
    }, [props.parentElement.image]);

    async function uploadImage(event: any): Promise<void> {
        let uploadedFile: File = event.target.files?.length > 0 ? event.target.files[0] : null;

        // Validate that the uploaded file is an image before assigning it
        if (!uploadedFile?.type.includes('image')) {
            props.onUploadImageError('Uploaded file is not a valid image');
            return;
        }

        if (uploadedFile.size > import.meta.env.VITE_APP_UPLOAD_IMAGE_SIZE_LIMIT) {
            props.onUploadImageError(
                `Selected image exceeds the upload size limit of ${
                    import.meta.env.VITE_APP_UPLOAD_IMAGE_SIZE_LIMIT / 1000000
                } MB`
            );
            return;
        }

        // Base64 encode the image
        const encodedImage: string = await Utils.convertToBase64(uploadedFile);

        // Remove the image type prefix from the encoded image string
        const imageString: string = encodedImage.replace(/^data:image\/[a-z]+;base64,/, '');

        // Update the question/answers's image
        setUploadedImage(imageString);
        props.onImageChange(imageString);
    }

    function removeUploadedImage(): void {
        setUploadedImage('');
        props.onImageChange('');
    }

    return (
        <div>
            <Button
                className="is-transparent"
                image={uploadedImage ? `data:image/jpeg;base64,${uploadedImage}` : PlusIcon}
                onClick={() => imageRef.current.click()}
            />
            <input type="file" accept="image/png, image/jpeg, image/gif" hidden ref={imageRef} onChange={uploadImage} />
            {uploadedImage && <Button text="X" className="reset-btn is-transparent" onClick={removeUploadedImage} />}
        </div>
    );
}

export default ImageUploader;
