/*
 * @Author: Lemon
 * @Date: 2021-05-15 15:38:37
 * @LastEditors: Lemon
 * @LastEditTime: 2021-05-15 16:05:32
 * @FilePath: /august-blog-service-midway/src/controller/repository.ts
 */

import { ALL, Body, Controller, Get, Inject, Param, Post, Provide, Query, Validate } from "@midwayjs/decorator";
import { CreateRepositoryDTO, QueryRepositoryDTO } from "../dto/repository";
import { RepositoryService } from "../service/repository";

@Provide()
@Controller('/api/v1/repository', { middleware: ['jwtMiddleware'] })
export class RepositoryController {

  @Inject() repositoryService: RepositoryService

  @Validate()
  @Post('/') async create(@Body(ALL) createRepositoryProps: CreateRepositoryDTO) {
    return this.repositoryService.create(createRepositoryProps)
  }

  @Validate()
  @Get('/') async query(@Query(ALL) queryRepositoryProps: QueryRepositoryDTO) {
    return this.repositoryService.query(queryRepositoryProps)
  }

  @Get('/:id') async queryOne(@Param('id') id: number) {
    return this.repositoryService.queryOneWidthArticle(id)
  }
}