/**
 *
 * @typedef CountryCurrencies
 * @property {string} code
 * @property {string} name
 * @property {string} symbol
 */

/**
 * @typedef CountryArrayAPI
 * @property {string} name - Name of the country.
 * @property {string} alpha2Code
 * @property {string} alpha3Code
 * @property {string} capital
 * @property {string} region
 * @property {string} population
 * @property {string} area
 * @property {string} timezones
 * @property {string} borderRadius
 * @property {CountryCurrencies[]} currencies
 */

/**
 * @typedef {Function} CountriesStateSetter — Sets the value for countries.
 */

/**
 * @typedef {{route: {params: {region: string}}}} CountriesListScreenProps
 */

//Navigation:
/**
 * @typedef {{RegionListScreen: undefined, CountriesListScreen: undefined, CountryDetailScreen: undefined }} StudyStackParamList
 */

/**
 * @typedef {{StatisticsScreen: undefined, GameScreen: undefined }} GameStackParamList
 */

/**
 * @template T
 * @typedef {import('@react-navigation/native').TypedNavigator<T, import('@react-navigation/native').StackNavigationState<import('@react-navigation/native').ParamListBase>,  import('@react-navigation/native-stack/lib/typescript/src/types').NativeStackNavigationOptions, import('@react-navigation/native-stack/lib/typescript/src/types').NativeStackNavigationEventMap, ({ initialRouteName, children, screenListeners, screenOptions, ...rest}: import('@react-navigation/native-stack/lib/typescript/src/types').NativeStackNavigatorProps) => JSX.Element>} CreateNativeStackNavigatorResult
 */

/**
 * @typedef {{Study: undefined, Game: undefined}} BottomTabBarParamList
 */

/**
 * @template T
 * @typedef {import("@react-navigation/native").TypedNavigator<T, import("@react-navigation/native").TabNavigationState<import("@react-navigation/native").ParamListBase>, import('@react-navigation/bottom-tabs').BottomTabNavigationOptions, import('@react-navigation/bottom-tabs/lib/typescript/src/types').BottomTabNavigationEventMap, ({ initialRouteName, backBehavior, children, screenListeners, screenOptions, sceneContainerStyle, lazy, tabBarOptions, ...rest }: import('@react-navigation/core').DefaultNavigatorOptions<import('@react-navigation/routers').ParamListBase, import('@react-navigation/routers').TabNavigationState<import('@react-navigation/routers').ParamListBase>, import('@react-navigation/bottom-tabs').BottomTabNavigationOptions, import('@react-navigation/bottom-tabs/lib/typescript/src/types').BottomTabNavigationEventMap> & import('@react-navigation/routers').TabRouterOptions & import('@react-navigation/bottom-tabs/lib/typescript/src/types').BottomTabNavigationConfig)=> JSX.Element>} CreateBottomTabNavigatorType
 */

//Navigation//
