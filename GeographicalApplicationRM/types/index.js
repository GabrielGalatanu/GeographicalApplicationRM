/**
 *
 * @typedef CountryCurrencies
 * @property {string} code
 * @property {string} name
 * @property {string} symbol
 */

/**
 * @typedef CountryDTOData
 * @property {string} name - Name of the country.
 * @property {string} alpha2Code
 * @property {string} alpha3Code
 * @property {string} capital
 * @property {string} region
 * @property {number} population
 * @property {number} area
 * @property {string} timezones
 * @property {string} borderRadius
 * @property {{png: string}} flags
 * @property {CountryCurrencies[]} currencies
 */

/**
 * @typedef Country
 * @property {string} name
 * @property {string} alpha2Code
 * @property {string} flagURL
 * @property {string} capital
 * @property {number} population
 * @property {number} area
 * @property {string} currency
 */

/**
 * @typedef RegionDTOData
 * @property {string} region
 */

/**
 * @typedef {React.Dispatch<React.SetStateAction<Country>>} CountryStateSetter — Sets the value for a country.
 */

/**
 * @typedef {React.Dispatch<React.SetStateAction<CountryDTOData[]>>} CountriesStateSetter — Sets the value for countries.
 */

//https errors:

// typization for getAllCountriesByRegionAPI:
/**
 * @typedef CountryDTO
 * @property {{promiseType: 'CountryDTO', json: CountryDTOData[]}} data
 */

/**
 * @typedef CountryFetchFailedData
 * @property {string} message
 * @property {number} status
 */
/**
 * @typedef CountryFetchFailed
 * @property {{promiseType: ('CountryFetchFailed'), json: CountryFetchFailedData}} data
 */

/**
 * @typedef CountryFetchErrorData
 * @property {string} message
 */
/**
 * @typedef CountryFetchError
 * @property {{promiseType: ('CountryFetchError'), json: CountryFetchErrorData}} data
 */

// typization for getAllRegionsAPI:
/**
 * @typedef RegionDTO
 * @property {{promiseType: 'RegionDTO', json: RegionDTOData[]}} data
 */

/**
 * @typedef RegionFetchFailedData
 * @property {string} message
 */
/**
 * @typedef RegionFetchFailed
 * @property {{promiseType: ('RegionFetchFailed'), json: RegionFetchFailedData}} data

/**
 * @typedef RegionFetchFailedError
 * @property {string} message
 */
/**
 * @typedef RegionFetchError
 * @property {{promiseType: ('RegionFetchError'), json: RegionFetchFailedError}} data
 */

//https errors//

//Navigation:
/**
 * @typedef {{RegionListScreen: undefined, CountriesListScreen: {region: string}, CountryDetailScreen: {country: string} }} StudyStackParamList
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

//Screen navigation:
/**
 * @typedef {import('@react-navigation/native-stack').NativeStackScreenProps<StudyStackParamList, 'RegionListScreen'>} RegionListScreenProps
 */

/**
 * @typedef {import('@react-navigation/native-stack').NativeStackScreenProps<StudyStackParamList, 'CountriesListScreen'>} CountriesListScreenProps
 */
//Screen navigation//

//Navigation//
