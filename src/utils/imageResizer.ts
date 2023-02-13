import Resizer from "react-image-file-resizer";

interface FileResizer {
    file: File;
    width: number;
    height: number;
    extention?: string;
}
const fileResizer = ({ file, width, height, extention }: FileResizer) =>
    new Promise((resolve) => {
        Resizer.imageFileResizer(
            file,
            width,
            height,
            extention ? extention : "JPEG",
            100,
            0,
            (uri) => {
                resolve(uri);
            },
            "base64"
        );
    });

export default fileResizer