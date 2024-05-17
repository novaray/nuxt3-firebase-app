import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

// Image 이름과 중복되서 ImageService로 변경
export class ImageService {
  static uploadImage(file: File) {
    const storage = getStorage();
    const fileName = `${uuidv4()}.${this.getExtension(file.name)}`;
    const storageRef = ref(storage, `images/${fileName}`);
    return this.compressImage(file)
      .then((compressedFile) => uploadBytes(storageRef, compressedFile))
      .then((uploadResult) => getDownloadURL(uploadResult.ref))
      .then((url) => url);
  }

  private static getExtension(fileName: string) {
    return fileName.split('.').pop();
  }

  private static async compressImage(file: File) {
    // 그냥 import시에 오류가 생겨 함수 안으로 이동
    // https://github.com/ericnograles/browser-image-resizer/issues/77
    const { readAndCompressImage } = await import('browser-image-resizer');
    return readAndCompressImage(file, { quality: 0.8 });
  }
}
