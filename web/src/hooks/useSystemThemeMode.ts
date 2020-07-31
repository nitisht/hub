import React, { useEffect } from 'react';

export default function useSystemThemeMode(enabled: boolean, efective: string, dispatch: React.Dispatch<any>) {
  console.log('hola', enabled, efective);
  useEffect(() => {
    const themeModeFn = (e: MediaQueryListEvent) => {
      // const newColorScheme = e.matches ? 'dark' : 'light';
      if (!e.matches) {
        console.log('color change');
        dispatch({ type: 'updateEfectiveTheme', theme: efective === 'dark' ? 'light' : 'dark' });
      }
    };

    const currentMode = window.matchMedia(`(prefers-color-scheme: ${efective})`);

    const removeListener = () => {
      try {
        currentMode.removeEventListener('change', themeModeFn);
      } catch {
        try {
          currentMode.removeListener(themeModeFn);
        } catch {
          // Old browser
        }
      }
    };

    if (enabled) {
      try {
        currentMode.addEventListener('change', themeModeFn);
      } catch {
        try {
          currentMode.addListener(themeModeFn);
        } catch {
          // Old browser
        }
      }
    } else {
      removeListener();
    }
    return () => {
      if (enabled) {
        removeListener();
      }
    };
  }, [enabled]);
}
