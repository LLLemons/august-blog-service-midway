/*
 * @Author: Lemon
 * @Date: 2021-05-14 17:10:45
 * @LastEditors: Lemon
 * @LastEditTime: 2021-05-16 00:21:06
 * @FilePath: /august-blog-service-midway/src/entity/article.ts
 */

import { EntityModel } from "@midwayjs/orm";
import { Column, CreateDateColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Repository } from "./repository";



@EntityModel('article')
export class Article {
  @PrimaryGeneratedColumn({
    type: 'int',
  })
  id: number;

  @Column({
    type: 'longtext',
    nullable: false
  })
  title: string;

  @Column({
    type: 'longtext',
    nullable: false
  })
  content: string;

  @ManyToOne(type => Repository, repository => repository.articles)
  repository: Repository;

  @CreateDateColumn({ type: 'timestamp' })
  createdTime: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedTime: Date;

}

