
export type LoginFormValues = {
  email: string;
  password: string;
};


export interface ISubAdmin {
  _id?: string
  name: string
  email: string
  password: string
  isDelete: boolean
  isActive: boolean
  createdAt?: Date
  updatedAt?: Date
}