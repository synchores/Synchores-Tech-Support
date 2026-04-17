import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  HttpCode,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import type { File } from 'multer';
import { extname, join } from 'path';
import { existsSync, mkdirSync } from 'fs';

const UPLOAD_DIR = join(process.cwd(), 'uploads', 'landing-page');
const ALLOWED_MIME_PREFIXES = ['image/', 'video/'];
const MAX_FILE_SIZE = 50 * 1024 * 1024;

// Ensure upload directory exists
if (!existsSync(UPLOAD_DIR)) {
  mkdirSync(UPLOAD_DIR, { recursive: true });
}

@Controller('landing-page/upload')
export class FileUploadController {
  @Post('image')
  @HttpCode(200)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: UPLOAD_DIR,
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          const ext = extname(file.originalname);
          cb(null, `${randomName}${ext}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        const isAllowed = ALLOWED_MIME_PREFIXES.some((prefix) =>
          file.mimetype.startsWith(prefix),
        );

        if (!isAllowed) {
          cb(
            new BadRequestException('Only image and video files are allowed'),
            false,
          );
        } else {
          cb(null, true);
        }
      },
      limits: {
        fileSize: MAX_FILE_SIZE,
      },
    }),
  )
  uploadImage(@UploadedFile() file: File) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    return {
      message: 'Media uploaded successfully',
      path: `/uploads/landing-page/${file.filename}`,
      filename: file.filename,
    };
  }
}
