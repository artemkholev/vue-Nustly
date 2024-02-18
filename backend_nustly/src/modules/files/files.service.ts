import { Injectable, NotFoundException } from '@nestjs/common';
import { Response } from 'express';

@Injectable()
export class FilesService {
  async getFile(res: Response, pathPicture: string, namePicture: string) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const fs = require('fs');
      if (fs.existsSync(`./dist/files/${pathPicture}/${namePicture}`)) {
        res.sendFile(namePicture, {
          root: `./dist/files/${pathPicture}`,
        });
      }
    } catch (err) {
      throw new NotFoundException();
    }
  }
}
