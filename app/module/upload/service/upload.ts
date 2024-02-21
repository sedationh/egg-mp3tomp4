import { SingletonProto, AccessLevel } from '@eggjs/tegg';

@SingletonProto({
  // 如果需要在上层使用，需要把 accessLevel 显示声明为 public
  accessLevel: AccessLevel.PUBLIC,
})
export class UploadService {

  // 封装业务
}
