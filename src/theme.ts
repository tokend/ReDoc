import { darken, desaturate, lighten, readableColor, transparentize } from 'polished';

const orange: string = '#f2a100';
const green: string = '#33A494';
const blue: string = '#3a4180';
const lightBlue: string = '#0ea7ba';
const red: string = '#ef5350';

const fontFamily =
  ['Circular', 'Noto Sans', '-apple-system', 'BlinkMacSystemFont', 'sans-serif']
  .join(',');

const defaultTheme: ThemeInterface = {
  spacing: {
    unit: 5,
    sectionHorizontal: ({ spacing }) => spacing.unit * 8,
    sectionVertical: ({ spacing }) => spacing.unit * 8,
  },
  breakpoints: {
    small: '50rem',
    medium: '85rem',
    large: '105rem',
  },
  colors: {
    tonalOffset: 0.2,
    primary: {
      main: '#3a4180',
      light: ({ colors }) => lighten(colors.tonalOffset, colors.primary.main),
      dark: ({ colors }) => darken(colors.tonalOffset, colors.primary.main),
      contrastText: ({ colors }) => readableColor(colors.primary.main),
    },
    success: {
      main: green,
      light: ({ colors }) => lighten(colors.tonalOffset, colors.success.main),
      dark: ({ colors }) => darken(colors.tonalOffset, colors.success.main),
      contrastText: ({ colors }) => readableColor(colors.success.main),
    },
    warning: {
      main: orange,
      light: ({ colors }) => lighten(colors.tonalOffset, colors.warning.main),
      dark: ({ colors }) => darken(colors.tonalOffset, colors.warning.main),
      contrastText: '#ffffff',
    },
    error: {
      main: red,
      light: ({ colors }) => lighten(colors.tonalOffset, colors.error.main),
      dark: ({ colors }) => darken(colors.tonalOffset, colors.error.main),
      contrastText: ({ colors }) => readableColor(colors.error.main),
    },
    info: {
      main: blue,
      light: ({ colors }) => lighten(colors.tonalOffset, colors.info.main),
      dark: ({ colors }) => darken(colors.tonalOffset, colors.info.main),
      contrastText: ({ colors }) => readableColor(colors.info.main),
    },
    text: {
      primary: '#333333',
      secondary: ({ colors }) => lighten(colors.tonalOffset, colors.text.primary),
    },
    border: {
      dark: 'rgba(0,0,0, 0.1)',
      light: '#ffffff',
    },
    responses: {
      success: {
        color: ({ colors }) => colors.success.main,
        backgroundColor: ({ colors }) => transparentize(0.9, colors.success.main),
      },
      error: {
        color: ({ colors }) => colors.error.main,
        backgroundColor: ({ colors }) => transparentize(0.9, colors.error.main),
      },
      redirect: {
        color: '#ffa500',
        backgroundColor: ({ colors }) => transparentize(0.9, colors.responses.redirect.color),
      },
      info: {
        color: '#87ceeb',
        backgroundColor: ({ colors }) => transparentize(0.9, colors.responses.info.color),
      },
    },
    itemType: {
      entry: lightBlue,
      operation: green,
      transaction: blue,
    },
    http: {
      get: ({ colors }) => colors.success.main,
      post: ({ colors }) => colors.info.main,
      put: ({ colors }) => colors.info.dark,
      options: ({ colors }) => colors.warning.light,
      patch: ({ colors }) => colors.info.light,
      delete: ({ colors }) => colors.error.light,
      basic: '#999',
      link: '#31bbb6',
      head: '#c167e4',
    },
  },
  schema: {
    linesColor: theme =>
      lighten(
        theme.colors.tonalOffset,
        desaturate(theme.colors.tonalOffset, theme.colors.primary.main),
      ),
    defaultDetailsWidth: '75%',
    typeNameColor: theme => theme.colors.text.secondary,
    typeTitleColor: theme => theme.schema.typeNameColor,
    requireLabelColor: theme => theme.colors.error.main,
    labelsTextSize: '0.9em',
    nestingSpacing: '1em',
    nestedBackground: '#fafafa',
    arrow: {
      size: '1.1em',
      color: theme => theme.colors.text.secondary,
    },
  },
  typography: {
    fontSize: '14px',
    lineHeight: '1.5em',
    fontWeightRegular: '400',
    fontWeightBold: '600',
    fontWeightLight: '300',
    fontFamily,
    smoothing: 'antialiased',
    optimizeSpeed: true,
    headings: {
      fontFamily,
      fontWeight: '400',
      lineHeight: '1.6em',
    },
    code: {
      fontSize: '13px',
      fontFamily: 'Courier, monospace',
      lineHeight: ({ typography }) => typography.lineHeight,
      fontWeight: ({ typography }) => typography.fontWeightRegular,
      color: '#e53935',
      backgroundColor: 'rgba(38, 50, 56, 0.05)',
      wrap: false,
    },
    links: {
      color: ({ colors }) => colors.primary.main,
      visited: ({ typography }) => typography.links.color,
      hover: ({ typography }) => lighten(0.2, typography.links.color),
    },
  },
  menu: {
    width: '280px',
    backgroundColor: '#f5f6f9',
    fontSize: '16px',
    textColor: ({ colors }) => colors.primary.main,
    groupLabelColor: ({ colors }) => colors.primary.light,
    activeTextColor: theme =>
      theme.menu.textColor !== defaultTheme.menu!.textColor
        ? theme.menu.textColor
        : theme.colors.primary.main,
    groupItems: {
      textTransform: 'uppercase',
    },
    level1Items: {
      textTransform: 'none',
    },
    arrow: {
      size: '1.5em',
      color: theme => theme.menu.textColor,
    },
  },
  params: {
    underlinedHeader: {
      textTransform: 'uppercase',
    },
  },
  logo: {
    maxHeight: ({ menu }) => menu.width,
    maxWidth: ({ menu }) => menu.width,
    paddingTop: '20px',
    paddingBottom: '30px',
    paddingLeft: '20px',
    paddingRight: '20px',
    isCentered: false,
    gutter: '2px',
  },
  rightPanel: {
    backgroundColor: '#263238',
    width: '40%',
    textColor: '#ffffff',
    isHidden: false,
  },
  codeSample: {
    backgroundColor: ({ rightPanel }) => darken(0.1, rightPanel.backgroundColor),
    textColor: '#fff',
  },
};

export default defaultTheme;

export function resolveTheme(theme: ThemeInterface): ResolvedThemeInterface {
  const resolvedValues = {};
  let counter = 0;
  const setProxy = (obj, path: string) => {
    Object.keys(obj).forEach(k => {
      const currentPath = (path ? path + '.' : '') + k;
      const val = obj[k];
      if (typeof val === 'function') {
        Object.defineProperty(obj, k, {
          get() {
            if (!resolvedValues[currentPath]) {
              counter++;
              if (counter > 1000) {
                throw new Error(
                  `Theme probably contains circular dependency at ${currentPath}: ${val.toString()}`,
                );
              }

              resolvedValues[currentPath] = val(theme);
            }
            return resolvedValues[currentPath];
          },
          enumerable: true,
        });
      } else if (typeof val === 'object') {
        setProxy(val, currentPath);
      }
    });
  };

  setProxy(theme, '');
  return JSON.parse(JSON.stringify(theme));
}

export interface ColorSetting {
  main: string;
  light: string;
  dark: string;
  contrastText: string;
}

export interface HTTPResponseColos {
  color: string;
  backgroundColor: string;
}

export interface FontSettings {
  fontSize: string;
  fontWeight: string;
  fontFamily: string;
  lineHeight: string;
  color: string;
}

export interface ResolvedThemeInterface {
  spacing: {
    unit: number;
    sectionHorizontal: number;
    sectionVertical: number;
  };
  breakpoints: {
    small: string;
    medium: string;
    large: string;
  };
  colors: {
    tonalOffset: number;
    primary: ColorSetting;
    success: ColorSetting;
    warning: ColorSetting;
    error: ColorSetting;
    info: ColorSetting;
    border: {
      light: string;
      dark: string;
    };
    text: {
      primary: string;
      secondary: string;
    };
    responses: {
      success: HTTPResponseColos;
      error: HTTPResponseColos;
      redirect: HTTPResponseColos;
      info: HTTPResponseColos;
    };
    itemType: {
      transaction: string;
      operation: string;
      entry: string;
    };
    http: {
      get: string;
      post: string;
      put: string;
      options: string;
      patch: string;
      delete: string;
      basic: string;
      link: string;
      head: string;
    };
  };
  schema: {
    linesColor: string;
    defaultDetailsWidth: string;
    typeNameColor: string;
    typeTitleColor: string;
    requireLabelColor: string;
    labelsTextSize: string;
    nestingSpacing: string;
    nestedBackground: string;
    arrow: {
      size: string;
      color: string;
    };
  };
  typography: {
    fontSize: string;
    lineHeight: string;
    fontWeightLight: string;
    fontWeightRegular: string;
    fontWeightBold: string;
    fontFamily: string;

    smoothing: string;
    optimizeSpeed: boolean;

    code: FontSettings & {
      backgroundColor: string;
      wrap: boolean;
    };
    headings: {
      fontFamily: string;
      fontWeight: string;
      lineHeight: string;
    };

    links: {
      color: string;
      visited: string;
      hover: string;
    };
  };
  menu: {
    width: string;
    backgroundColor: string;
    fontSize: string;
    textColor: string;
    groupLabelColor: string;
    activeTextColor: string;
    groupItems: {
      textTransform: string;
    };
    level1Items: {
      textTransform: string;
    };
    arrow: {
      size: string;
      color: string;
    };
  };
  params: {
    underlinedHeader: {
      textTransform: string;
    };
  };
  logo: {
    maxHeight: string;
    maxWidth: string;
    paddingTop: string;
    paddingBottom: string;
    paddingLeft: string;
    paddingRight: string;
    isCentered: boolean;
    gutter: string;
  };
  rightPanel: {
    backgroundColor: string;
    textColor: string;
    isHidden: boolean;
    width: string;
  };
  codeSample: {
    backgroundColor: string;
    textColor: string;
  };

  extensionsHook?: (name: string, props: any) => string;
}

export type primitive = string | number | boolean | undefined | null;
export type AdvancedThemeDeep<T> = T extends primitive
  ? T | ((theme: ResolvedThemeInterface) => T)
  : AdvancedThemeObject<T>;
export type AdvancedThemeObject<T> = { [P in keyof T]?: AdvancedThemeDeep<T[P]> };
export type ThemeInterface = AdvancedThemeObject<ResolvedThemeInterface>;
