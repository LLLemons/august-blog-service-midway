/*
 * @Author: Lemon
 * @Date: 2021-05-15 15:41:06
 * @LastEditors: Lemon
 * @LastEditTime: 2021-05-15 15:59:59
 * @FilePath: /august-blog-service-midway/src/dto/repository.ts
 */

import { Rule, RuleType } from "@midwayjs/decorator";

export class CreateRepositoryDTO {
  @Rule(RuleType.string().required()) title: string;
  @Rule(RuleType.string().required()) description?: string;
}
export class QueryRepositoryDTO {
  @Rule(RuleType.number()) pageSize: number;
  @Rule(RuleType.number()) pageNo: number;
}