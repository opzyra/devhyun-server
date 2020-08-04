import { Request, Response } from "express";

import pify from "pify";
import multer from "multer";
import randomString from "random-string";
import sharp from "sharp";
import mkdirs from "node-mkdirs";
import { format } from "date-fns";

export interface IUploadResponse {
  mimetype: string;
  extension: string;
  name: string;
  size: number;
  src: string;
}

const dypth = format(new Date(), "yyyyMMdd");
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "./uploads/" + dypth);
  },
  filename(req, file, cb) {
    const extension = file.mimetype.split("/")[1];
    cb(
      null,
      (() => {
        return randomString({ length: 20 })
          .concat(dypth)
          .split("")
          .sort(function () {
            return 0.5 - Math.random();
          })
          .join("");
      })() +
        "." +
        extension
    );
  },
});

const fileAllowExt = (ext: string) => {
  const extList = [
    "jpge",
    "jpeg",
    "jpg",
    "png",
    "bmp",
    "gif",
    "heic",
    "heif",
    "pdf",
    "hwp",
    "zip",
    "alz",
    "rar",
    "ppt",
    "xlsx",
    "xls",
    "doc",
  ];
  for (let i = 0; i < extList.length; i++) {
    const regx = new RegExp(ext.toLowerCase());
    if (regx.exec(extList[i])) {
      return true;
    }
  }
  return false;
};

const imageAllowExt = (ext: string) => {
  const extList = ["jpge", "jpeg", "jpg", "png", "gif", "bmp", "heic", "heif"];
  for (let i = 0; i < extList.length; i++) {
    const regx = new RegExp(ext.toLowerCase());
    if (regx.exec(extList[i])) {
      return true;
    }
  }
  return false;
};

const multerFile = pify(
  multer({
    storage,
    limits: {
      files: 1,
      fileSize: 1024 * 1024 * 5,
    },
    fileFilter: (req, file, cb) => {
      const fname = file.originalname;
      const ext = fname.substr(fname.lastIndexOf(".") + 1, fname.length);
      if (!fileAllowExt(ext)) {
        cb(new Error(`${ext} 파일은 업로드할 수 없습니다.`));
        return;
      }
      cb(null, true);
    },
  }).single("file")
);

const multerImage = pify(
  multer({
    storage,
    limits: {
      files: 1,
      fileSize: 1024 * 1024 * 5,
    },
    fileFilter: (req, file, cb) => {
      const fname = file.originalname;
      const ext = fname.substr(fname.lastIndexOf(".") + 1, fname.length);
      if (!imageAllowExt(ext)) {
        cb(new Error(`이미지 파일만 업로드할 수 없습니다.`));
        return;
      }
      cb(null, true);
    },
  }).single("file")
);

const file = async (
  req: Request,
  res: Response
): Promise<IUploadResponse | void> => {
  mkdirs("./uploads/" + dypth);

  try {
    await multerFile(req, res);
  } catch (error) {
    if (error instanceof Error) {
      if (error.message == "File too large") {
        error.message = "파일의 최대 허용 크기는 5MB입니다.";
      }
    }
    throw error;
  }

  const { file } = req;

  if (!file) {
    res.status(500).json({ message: "파일이 존재하지 않습니다." });
    return;
  }

  const mimetype = file.mimetype;
  const extension = file.mimetype.split("/")[1];
  const name = file.originalname;
  const size = file.size;
  const src = `${process.env.APP_DOMAIN}/uploads/${dypth}/${file.filename}`;

  return { mimetype, extension, name, size, src };
};

const image = async (
  req: Request,
  res: Response
): Promise<IUploadResponse | void> => {
  mkdirs("./uploads/" + dypth);

  try {
    await multerImage(req, res);
  } catch (error) {
    if (error instanceof Error) {
      if (error.message == "File too large") {
        error.message = "이미지 파일 최대 허용 크기는 5MB입니다.";
      }
    }
    throw error;
  }

  const { file } = req;

  if (!file) {
    res.status(500).json({ message: "파일이 존재하지 않습니다." });
    return;
  }

  const mimetype = file.mimetype;
  const extension = file.mimetype.split("/")[1];
  const name = file.originalname;
  const size = file.size;
  const src = `${process.env.APP_DOMAIN}/uploads/${dypth}/${file.filename}`;

  return { mimetype, extension, name, size, src };
};

const thumbnail = async (
  req: Request,
  res: Response,
  option: { width: string; height: string }
): Promise<IUploadResponse | void> => {
  const { width, height } = option;

  mkdirs("./uploads/" + dypth);

  try {
    await multerImage(req, res);
    await sharp(`./uploads/${dypth}/${req.file.filename}`)
      .resize(parseInt(width), parseInt(height))
      .toFile(`./uploads/${dypth}/th_${req.file.filename}`);
  } catch (error) {
    if (error instanceof Error) {
      if (error.message == "File too large") {
        error.message = "이미지 파일 최대 허용 크기는 5MB입니다.";
      }
    }
    throw error;
  }

  const { file } = req;

  if (!file) {
    res.status(500).json({ message: "파일이 존재하지 않습니다." });
    return;
  }

  const mimetype = file.mimetype;
  const extension = file.mimetype.split("/")[1];
  const name = "th_" + file.originalname;
  const size = file.size;
  const src = `${process.env.APP_DOMAIN}/uploads/${dypth}/th_${file.filename}`;

  return { mimetype, extension, name, size, src };
};

export default {
  file,
  image,
  thumbnail,
};
