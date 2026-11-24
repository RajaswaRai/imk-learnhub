import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../wayfinder'
/**
* @see \App\Http\Controllers\ProgressController::__invoke
 * @see app/Http/Controllers/ProgressController.php:10
 * @route '/progress'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/progress',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ProgressController::__invoke
 * @see app/Http/Controllers/ProgressController.php:10
 * @route '/progress'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProgressController::__invoke
 * @see app/Http/Controllers/ProgressController.php:10
 * @route '/progress'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ProgressController::__invoke
 * @see app/Http/Controllers/ProgressController.php:10
 * @route '/progress'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})
const progress = {
    index: Object.assign(index, index),
}

export default progress