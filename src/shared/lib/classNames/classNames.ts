type Mods = Record<string, boolean | string>

// for additional
// eslint-disable-next-line default-param-last
export function classNames(
  cls: string,
  additional: string[] = [],
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
