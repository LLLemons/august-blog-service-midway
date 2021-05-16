/*
 * @Author: Lemon
 * @Date: 2021-05-15 15:28:50
 * @LastEditors: Lemon
 * @LastEditTime: 2021-05-16 01:48:03
 * @FilePath: /august-blog-service-midway/src/service/repository.ts
 */

import { Inject, Provide } from "@midwayjs/decorator";
import { InjectEntityModel } from "@midwayjs/orm";
import { Repository } from "typeorm";
import { Article } from "../entity/article";
import { Repository as RepositoryModel } from "../entity/repository";
import { CreatedRepositoryProps, QueryRepositoryProps } from "../interface";
import { UserService } from "./user";

@Provide()
export class RepositoryService {

  @Inject() userService: UserService

  @InjectEntityModel(RepositoryModel) repositoryModel: Repository<RepositoryModel>
  @InjectEntityModel(Article) articleModel: Repository<Article>

  async create(createdRepositoryProps: CreatedRepositoryProps) {
    const user = await this.userService.getUserInfo()
    const repository = new RepositoryModel()
    repository.title = createdRepositoryProps.title
    repository.description = createdRepositoryProps.description
    repository.user = user
    return this.repositoryModel.save(repository)
  }

  async query(queryRepositoryProps: QueryRepositoryProps) {
    const { pageNo, pageSize } = queryRepositoryProps
    const limit = +pageSize
    const offset = limit * (+pageNo - 1)
    const userInfo = await this.userService.getUserInfo()
    const [list, total] = await this.repositoryModel.findAndCount({
      where: { user: userInfo },
      skip: offset,
      take: limit
    })
    return {
      list,
      total
    }
  }

  async queryOne(id: number) {
    console.log(id)
    return this.repositoryModel.findOne({
      where: { id },
      relations: ['user']
    })
  }
  async queryOneWidthArticle(id: number) {
    console.log(id)
    const repository = await this.repositoryModel.findOne({
      where: { id },
      relations: ['user']
    })
    const [articles] = await this.articleModel.findAndCount({
      where: {
        repository
      }
    })
    return {
      ...repository,
      articles
    }
  }
}