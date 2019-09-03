export type FieldsOf<C> = {
  [key in keyof C]?: C[key];
}
