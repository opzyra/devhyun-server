import { IsNotEmpty } from "class-validator";

export default class UploadParam {
  @IsNotEmpty({ message: "파일을 선택해주세요." })
  file!: Express.Multer.File;
}
