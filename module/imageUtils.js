const IMAGE_PATH = 'public/images/';

import fs from 'fs';
import path from 'path';

// post 입력받은 이미지 파일 저장 후 링크 반환 함수 만들어줘
export const saveImage = async image => {
    // Log the image object for debugging

    // Check if image has the expected structure
    if (!image || !image.path || !image.filename) {
        throw new Error('파일이 유효하지 않습니다.');
    }

    const { path: tempPath, filename, mimetype } = image;

    // Split the mimetype to get the file extension
    const fileExtension = mimetype.split('/')[1];

    // Define the path where the file will be saved
    const filePath = path.join(IMAGE_PATH, `${filename}.${fileExtension}`);

    // Create a read stream from the temporary path
    const readStream = fs.createReadStream(tempPath);

    // Create a write stream to save the file
    const writeStream = fs.createWriteStream(filePath);

    // Pipe the read stream to the write stream
    readStream.pipe(writeStream);

    // Return a promise that resolves when the file is fully written
    return new Promise((resolve, reject) => {
        writeStream.on('finish', () => {
            resolve(`File saved to ${filePath}`);
        });
        writeStream.on('error', error => {
            reject(`Error saving file: ${error.message}`);
        });
    });
};

// post 입력받은 이미지 파일 삭제 함수 만들어줘
const deleteImage = async imagePath => {
    fs.unlinkSync(imagePath);
};
