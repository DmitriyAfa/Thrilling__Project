
type Mods = Record<string, boolean | string>

export function classNames(cls: string, additional: string[] = [], mods?: Mods): string {
  return [
    cls,
    ...additional.filter(Boolean),
    mods ? Object.entries(mods)
      .filter(([classNames, value]) => Boolean(value))
      .map(([classNames, value]) => classNames) : ''
  ].join(' ')
}

