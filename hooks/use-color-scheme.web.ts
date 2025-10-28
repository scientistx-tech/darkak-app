// For web we also force the light theme by default. The previous implementation
// attempted to return the platform color scheme after hydration which caused
// the UI to switch to dark mode when the browser/system preference was dark.
// Returning a constant 'light' keeps the site visually stable.
export function useColorScheme(): 'light' {
  return 'light';
}

export default useColorScheme;
