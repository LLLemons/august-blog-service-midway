/*
 * @Author: Lemon
 * @Date: 2021-05-14 17:10:45
 * @LastEditors: Lemon
 * @LastEditTime: 2021-05-15 16:40:26
 * @FilePath: /august-blog-service-midway/src/entity/user.ts
 */

import { EntityModel } from "@midwayjs/orm";
import { Column, CreateDateColumn, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Repository } from "./repository";



@EntityModel('user')
export class User {
  @PrimaryGeneratedColumn({
    type: 'int',
  })
  id: number;

  @Column({
    type: 'longtext',
    nullable: false,
  })
  email: string;

  @Column({
    type: 'longtext',
    nullable: true
  })
  avatar?: string;

  @Column({
    type: 'longtext',
    nullable: false,
    select: false
  })
  password: string;

  @OneToMany(type => Repository, repository => repository.user)
  repositories: Repository[]

  @CreateDateColumn({ type: 'timestamp' })
  createdTime: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedTime: Date;

}

