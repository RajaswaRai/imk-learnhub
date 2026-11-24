import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
* @see \App\Http\Controllers\LearningPathController::__invoke
 * @see app/Http/Controllers/LearningPathController.php:11
 * @route '/learning-path'
 */
export const show = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/learning-path',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\LearningPathController::__invoke
 * @see app/Http/Controllers/LearningPathController.php:11
 * @route '/learning-path'
 */
show.url = (options?: RouteQueryOptions) => {
    return show.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\LearningPathController::__invoke
 * @see app/Http/Controllers/LearningPathController.php:11
 * @route '/learning-path'
 */
show.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\LearningPathController::__invoke
 * @see app/Http/Controllers/LearningPathController.php:11
 * @route '/learning-path'
 */
show.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\LearningPathController::__invoke
 * @see app/Http/Controllers/LearningPathController.php:11
 * @route '/learning-path'
 */
    const showForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\LearningPathController::__invoke
 * @see app/Http/Controllers/LearningPathController.php:11
 * @route '/learning-path'
 */
        showForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\LearningPathController::__invoke
 * @see app/Http/Controllers/LearningPathController.php:11
 * @route '/learning-path'
 */
        showForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
const learningPath = {
    show: Object.assign(show, show),
}

export default learningPath