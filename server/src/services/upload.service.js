import multer from "multer";
import sharp from "sharp";
import { fileTypeFromBuffer } from "file-type";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB
});

const prosesinGambar = async (buffer, originalName) => {
  const infoFile = await fileTypeFromBuffer(buffer);
  const namaFileBaru = `${path.parse(originalName).name}_${Date.now()}.${
    infoFile.ext
  }`;
  const pathBaru = path.join(__dirname, "uploads", namaFileBaru);

  await sharp(buffer)
    .resize({
      width: 800,
      height: 800,
      fit: "cover",
      position: "centre",
      withoutEnlargement: true,
    })
    .toFormat(infoFile.ext)
    .toFile(pathBaru);
  return path.basename(pathBaru);
};
