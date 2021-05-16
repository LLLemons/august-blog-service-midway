import { Rule, RuleType } from "@midwayjs/decorator";

export class CommonUserDTO {
  @Rule(RuleType.string().required().pattern(/^[a-zA-z0-9_\-\.]+@[a-zA-Z0-9_\-]+(\.[a-zA-Z0-9_\-]+)+$/)) email: string
  @Rule(RuleType.string().required()) password: string;
}

@Rule(CommonUserDTO)
export class UserRegisterDTO extends CommonUserDTO {
  @Rule(RuleType.string()) avatar: 'string'
}

@Rule(CommonUserDTO)
export class UserLoginDTO extends CommonUserDTO {
  @Rule(RuleType.string().required()) password: string;
}

export class UserUpdateDTO {
  @Rule(RuleType.string().required()) password?: string;
  @Rule(RuleType.string()) avatar?: 'string'
}