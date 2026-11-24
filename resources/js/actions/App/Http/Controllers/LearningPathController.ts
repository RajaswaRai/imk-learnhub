import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\LearningPathController::__invoke
 * @see app/Http/Controllers/LearningPathController.php:13
 * @route '/learning-path'
 */
const LearningPathController = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: LearningPathController.url(options),
    method: 'get',
})

LearningPathController.definition = {
    methods: ["get","head"],
    url: '/learning-path',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\LearningPathController::__invoke
 * @see app/Http/Controllers/LearningPathController.php:13
 * @route '/learning-path'
 */
LearningPathController.url = (options?: RouteQueryOptions) => {
    return LearningPathController.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\LearningPathController::__invoke
 * @see app/Http/Controllers/LearningPathController.php:13
 * @route '/learning-path'
 */
LearningPathController.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: LearningPathController.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\LearningPathController::__invoke
 * @see app/Http/Controllers/LearningPathController.php:13
 * @route '/learning-path'
 */
LearningPathController.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: LearningPathController.url(options),
    method: 'head',
})
export default LearningPathController