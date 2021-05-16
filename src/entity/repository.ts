/*
 * @Author: Lemon
 * @Date: 2021-05-14 17:10:45
 * @LastEditors: Lemon
 * @LastEditTime: 2021-05-16 00:18:16
 * @FilePath: /august-blog-service-midway/src/entity/repository.ts
 */

import { EntityModel } from "@midwayjs/orm";
import { Column, CreateDateColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Article } from "./article";
import { User } from "./user";



@EntityModel('repository')
export class Repository {
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
    nullable: true
  })
  description?: string;

  @ManyToOne(type => User, user => user.repositories)
  user: User;

  @OneToMany(type => Article, article => article.repository)
  articles: Article

  @CreateDateColumn({ type: 'timestamp' })
  createdTime: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedTime: Date;

}

