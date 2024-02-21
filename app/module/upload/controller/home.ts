import { EggLogger } from 'egg';
import { Inject, HTTPController, HTTPMethod, HTTPMethodEnum, Context, EggContext } from '@eggjs/tegg';
import { filesToMp4 } from 'app/extend/helper';

@HTTPController({
  path: '/api',
})
export class HomeController {
  @Inject()
  logger: EggLogger;

  @HTTPMethod({
    method: HTTPMethodEnum.POST,
    path: '/upload',
  })
  async upload(@Context() ctx: EggContext) {

    this.logger.info('upload request start');
    const mp4Links = await filesToMp4(ctx.request.files);
    this.logger.info('upload request end');

    return {
      mp4Links,
    };
  }
}
