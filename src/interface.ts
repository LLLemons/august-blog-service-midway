export interface UserRegisterProps {
  email: string;
  password: string;
  avatar?: string
}

export interface UserLoginProps {
  email: string;
  password: string;
}

export interface UserUpdateProps {
  avatar?: string;
  password?: string;
}

export interface CreatedRepositoryProps {
  title: string;
  description?: string;
}

export interface CommonPaginatedProps {
  pageNo?: number;
  pageSize?: number
}

export interface QueryArticlePaginatedProps extends CommonPaginatedProps {
  rId?: number
}

export interface QueryRepositoryProps extends CommonPaginatedProps {
}

export enum SocketRequestEvent {
  GREET = 'greet',
  SAVE = 'save'
}

export enum SocketResponseEvent {
  GREET = 'greetResult',
  SAVE = 'saveResult'
}
