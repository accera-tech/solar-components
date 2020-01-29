export type FieldsOf<C> = {
  [key in keyof C]?: C[key];
}

export type Writeable<T extends { [x: string]: any }, K extends string> = {
  [P in K]: T[P];
}
