/**
 * Override the platform color scheme hook to force the app to use light theme by default.
 *
 * Many components in the app import `useColorScheme` from `@/hooks/use-color-scheme`.
 * Previously this re-exported the platform hook which returns the system preference
 * (and could be 'dark'). To make the entire app render with the light design by
 * default, we return a constant 'light' value here. This is a minimal, low-risk
 * change — if you want a runtime toggle later we can implement a context/AsyncStorage
 * backed solution.
 */
export function useColorScheme(): 'light' {
	return 'light';
}

export default useColorScheme;
