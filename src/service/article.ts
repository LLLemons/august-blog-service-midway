/*
 * @Author: Lemon
 * @Date: 2021-05-15 15:28:50
 * @LastEditors: Lemon
 * @LastEditTime: 2021-05-16 01:38:22
 * @FilePath: /august-blog-service-midway/src/service/article.ts
 */

import { Inject, Provide } from "@midwayjs/decorator";
import { InjectEntityModel } from "@midwayjs/orm";
import { Repository } from "typeorm";
import { Repository as RepositoryModel } from './../entity/repository'
import { Article } from "../entity/article";
import { UserService } from "./user";
import { CommonPaginatedProps, QueryArticlePaginatedProps } from "../interface";

@Provide()
export class ArticleService {

  @InjectEntityModel(Article) articleModel: Repository<Article>

  @InjectEntityModel(RepositoryModel) repositoryModel: Repository<RepositoryModel>

  async save({ title, content, aId, rId }) {
    const repository = await this.repositoryModel.findOne({ id: rId })
    if (!aId) {
      const article = new Article()
      article.title = title
      article.content = content
      article.repository = repository
      return this.articleModel.save(article)
    }
    const article = await this.articleModel.findOne({
      id: aId
    })
    article.title = title
    article.content = content
    return this.articleModel.save(article)
  }

  async query(queryArticleProps: QueryArticlePaginatedProps) {
    const { pageNo, pageSize, rId } = queryArticleProps
    const limit = +pageSize
    const offset = limit * (+pageNo - 1)
    const repository = this.repositoryModel.findOne({ id: rId })
    const [list, total] = await this.articleModel.findAndCount({
      where: { repository },
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
    return this.articleModel.findOne({
      where: { id },
      relations: ['repository']
    })
  }
}