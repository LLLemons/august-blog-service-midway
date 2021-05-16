/*
 * @Author: Lemon
 * @Date: 2021-05-14 20:33:47
 * @LastEditors: Lemon
 * @LastEditTime: 2021-05-15 15:05:05
 * @FilePath: /august-blog-service-midway/src/lib/token/index.ts
 */

import { User } from '../../entity/user';
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

export const loginToken = (data: User, expires = 7200) => {
  const exp = Math.floor(Date.now() / 1000) + expires;
  var privateKey = fs.readFileSync(
    path.join(__dirname, './../key/jwtRS256.key')
  );
  const token = jwt.sign({ data, exp }, privateKey, { algorithm: 'RS256' });
  return token;
};

export const verifyToken = (token: any) => {
  var publicKey = fs.readFileSync(
    path.join(__dirname, './../key/jwtRS256.key.pub')
  );
  let res = {} as User;
  try {
    const result = jwt.verify(token, publicKey, { algorithms: 'RS256' }) || {};
    const { exp } = result,
      current = Math.floor(Date.now() / 1000);
    if (current <= exp) res = result.data || {};
  } catch (e) {
    console.log(e, '----');
  }
  return res;
};
