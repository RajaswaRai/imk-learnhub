import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\LessonController::__invoke
 * @see app/Http/Controllers/LessonController.php:11
 * @route '/lessons/{lesson}'
 */
const LessonController = (args: { lesson: string | number } | [lesson: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: LessonController.url(args, options),
    method: 'get',
})

LessonController.definition = {
    methods: ["get","head"],
    url: '/lessons/{lesson}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\LessonController::__invoke
 * @see app/Http/Controllers/LessonController.php:11
 * @route '/lessons/{lesson}'
 */
LessonController.url = (args: { lesson: string | number } | [lesson: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { lesson: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    lesson: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        lesson: args.lesson,
                }

    return LessonController.definition.url
            .replace('{lesson}', parsedArgs.lesson.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\LessonController::__invoke
 * @see app/Http/Controllers/LessonController.php:11
 * @route '/lessons/{lesson}'
 */
LessonController.get = (args: { lesson: string | number } | [lesson: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: LessonController.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\LessonController::__invoke
 * @see app/Http/Controllers/LessonController.php:11
 * @route '/lessons/{lesson}'
 */
LessonController.head = (args: { lesson: string | number } | [lesson: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: LessonController.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\LessonController::__invoke
 * @see app/Http/Controllers/LessonController.php:11
 * @route '/lessons/{lesson}'
 */
    const LessonControllerForm = (args: { lesson: string | number } | [lesson: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: LessonController.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\LessonController::__invoke
 * @see app/Http/Controllers/LessonController.php:11
 * @route '/lessons/{lesson}'
 */
        LessonControllerForm.get = (args: { lesson: string | number } | [lesson: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: LessonController.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\LessonController::__invoke
 * @see app/Http/Controllers/LessonController.php:11
 * @route '/lessons/{lesson}'
 */
        LessonControllerForm.head = (args: { lesson: string | number } | [lesson: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: LessonController.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    LessonController.form = LessonControllerForm
export default LessonController