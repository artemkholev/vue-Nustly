import { Controller, Get, Param, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';

@Controller('dist/files')
export class FilesController {
  @ApiOperation({ summary: 'Получение фотографии' })
  @ApiResponse({ status: 200 })
  @Get(':pathPicture/:namePicture')
  getPicture(
    @Param('pathPicture') pathPicture,
    @Param('namePicture') namePicture,
    @Res() res: Response,
  ) {
    res.sendFile(namePicture, {
      root: `./dist/files/${pathPicture}`,
    });
  }
}
