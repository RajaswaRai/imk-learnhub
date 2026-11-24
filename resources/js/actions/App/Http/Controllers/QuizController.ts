import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\QuizController::show
 * @see app/Http/Controllers/QuizController.php:13
 * @route '/quizzes/stage/{stage}'
 */
export const show = (args: { stage: string | number } | [stage: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/quizzes/stage/{stage}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\QuizController::show
 * @see app/Http/Controllers/QuizController.php:13
 * @route '/quizzes/stage/{stage}'
 */
show.url = (args: { stage: string | number } | [stage: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { stage: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    stage: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        stage: args.stage,
                }

    return show.definition.url
            .replace('{stage}', parsedArgs.stage.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\QuizController::show
 * @see app/Http/Controllers/QuizController.php:13
 * @route '/quizzes/stage/{stage}'
 */
show.get = (args: { stage: string | number } | [stage: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\QuizController::show
 * @see app/Http/Controllers/QuizController.php:13
 * @route '/quizzes/stage/{stage}'
 */
show.head = (args: { stage: string | number } | [stage: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\QuizController::show
 * @see app/Http/Controllers/QuizController.php:13
 * @route '/quizzes/stage/{stage}'
 */
    const showForm = (args: { stage: string | number } | [stage: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\QuizController::show
 * @see app/Http/Controllers/QuizController.php:13
 * @route '/quizzes/stage/{stage}'
 */
        showForm.get = (args: { stage: string | number } | [stage: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\QuizController::show
 * @see app/Http/Controllers/QuizController.php:13
 * @route '/quizzes/stage/{stage}'
 */
        showForm.head = (args: { stage: string | number } | [stage: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
/**
* @see \App\Http\Controllers\QuizController::submit
 * @see app/Http/Controllers/QuizController.php:46
 * @route '/quizzes/stage/{stage}'
 */
export const submit = (args: { stage: string | number } | [stage: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: submit.url(args, options),
    method: 'post',
})

submit.definition = {
    methods: ["post"],
    url: '/quizzes/stage/{stage}',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\QuizController::submit
 * @see app/Http/Controllers/QuizController.php:46
 * @route '/quizzes/stage/{stage}'
 */
submit.url = (args: { stage: string | number } | [stage: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { stage: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    stage: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        stage: args.stage,
                }

    return submit.definition.url
            .replace('{stage}', parsedArgs.stage.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\QuizController::submit
 * @see app/Http/Controllers/QuizController.php:46
 * @route '/quizzes/stage/{stage}'
 */
submit.post = (args: { stage: string | number } | [stage: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: submit.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\QuizController::submit
 * @see app/Http/Controllers/QuizController.php:46
 * @route '/quizzes/stage/{stage}'
 */
    const submitForm = (args: { stage: string | number } | [stage: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: submit.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\QuizController::submit
 * @see app/Http/Controllers/QuizController.php:46
 * @route '/quizzes/stage/{stage}'
 */
        submitForm.post = (args: { stage: string | number } | [stage: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: submit.url(args, options),
            method: 'post',
        })
    
    submit.form = submitForm
/**
* @see \App\Http\Controllers\QuizController::review
 * @see app/Http/Controllers/QuizController.php:90
 * @route '/quizzes/stage/{stage}/review'
 */
export const review = (args: { stage: string | number } | [stage: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: review.url(args, options),
    method: 'get',
})

review.definition = {
    methods: ["get","head"],
    url: '/quizzes/stage/{stage}/review',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\QuizController::review
 * @see app/Http/Controllers/QuizController.php:90
 * @route '/quizzes/stage/{stage}/review'
 */
review.url = (args: { stage: string | number } | [stage: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { stage: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    stage: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        stage: args.stage,
                }

    return review.definition.url
            .replace('{stage}', parsedArgs.stage.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\QuizController::review
 * @see app/Http/Controllers/QuizController.php:90
 * @route '/quizzes/stage/{stage}/review'
 */
review.get = (args: { stage: string | number } | [stage: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: review.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\QuizController::review
 * @see app/Http/Controllers/QuizController.php:90
 * @route '/quizzes/stage/{stage}/review'
 */
review.head = (args: { stage: string | number } | [stage: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: review.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\QuizController::review
 * @see app/Http/Controllers/QuizController.php:90
 * @route '/quizzes/stage/{stage}/review'
 */
    const reviewForm = (args: { stage: string | number } | [stage: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: review.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\QuizController::review
 * @see app/Http/Controllers/QuizController.php:90
 * @route '/quizzes/stage/{stage}/review'
 */
        reviewForm.get = (args: { stage: string | number } | [stage: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: review.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\QuizController::review
 * @see app/Http/Controllers/QuizController.php:90
 * @route '/quizzes/stage/{stage}/review'
 */
        reviewForm.head = (args: { stage: string | number } | [stage: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: review.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    review.form = reviewForm
const QuizController = { show, submit, review }

export default QuizController