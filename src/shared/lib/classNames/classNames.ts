export type Mods = Record<string, boolean | string | undefined>

export function classNames(
  cls: string,
  additional: Array<string | undefined> = [],
  mods: Mods = {},
): string {
  return [
    cls,
    ...additional.filter(Boolean),
    ...Object.entries(mods)
      // eslint-disable-next-line no-unused-vars
      .filter(([classNames, value]) => Boolean(value))
      .map(([classNames]) => classNames),
  ].join(' ');
}
