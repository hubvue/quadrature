export type NumstrToArray<T extends string, Arr extends string[] = []> = `${Arr['length']}` extends T ? Arr : NumstrToArray<T, [...Arr, '']>
