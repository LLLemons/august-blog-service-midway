/*
 * @Author: Lemon
 * @Date: 2021-05-16 01:38:51
 * @LastEditors: Lemon
 * @LastEditTime: 2021-05-16 01:40:24
 * @FilePath: /august-blog-service-midway/src/controller/article.ts
 */

import { Provide, Controller, Inject, Validate, Get, Query, Param, ALL } from "@midwayjs/decorator"
import { QueryRepositoryDTO } from "../dto/repository"
import { ArticleService } from "../service/article"

@Provide()
@Controller('/api/v1/article', { middleware: ['jwtMiddleware'] })
export class ArticleController {

  @Inject() articleService: ArticleService

  @Validate()
  @Get('/') async query(@Query(ALL) queryRepositoryProps: QueryRepositoryDTO) {
    return this.articleService.query(queryRepositoryProps)
  }

  @Get('/:id') async queryOne(@Param('id') id: number) {
    return this.articleService.queryOne(id)
  }
}