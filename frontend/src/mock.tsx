import { Course } from "./interfaces";

export const coursesMocks: Course[] = [
    {
        id: '1',
        title: 'ИУЭС обязательно что-то придумает',
        img: '/mocks/1.png',
        description: 'description',
        type: 'designer',
        steps: [
            {
                id: '1',
                order: 1,
                lessons: [
                    {
                        id: '1',
                        title: 'урок  первый УДачно...',
                        img: '/mocks/lesson1.png',
                        description: 'Вам предложен урок такой-то такой-то его суть заключается в сути. выбери свой ввыбор и начните обучиение новым шняжкам.',
                        tasks: [
                            {
                                id: '1',
                                description: 'Есть, пить, спать, глотать, жарить, печь',
                                type: 'one',
                                answers: 'Есть, пить, спать, глотать, жарить, печь'.split(', '),
                                rightAnsewrs: ['Есть'],
                            },
                            {
                                id: '2',
                                description: 'Вторая Задача',
                                type: 'many',
                                answers: 'Есть, пить, спать, глотать, жарить, печь'.split(', '),
                                rightAnsewrs: 'Есть, пить, спать, глотать'.split(', '),
                            },{
                                id: '3',
                                description: 'Вторая Задача ЧТо??',
                                type: 'open',
                                // answers: 'Есть, пить, спать, глотать, жарить, печь'.split(', '),
                                rightAnsewrs: ['Есть'],
                            },
                        ],
                    },
                    {
                        id: '2',
                        title: 'урок  второй УДачно...',
                        img: '/mocks/1.png',
                        description: 'Вам предложен 222222 урок такой-то такой-то его суть заключается в сути. выбери свой ввыбор и начните обучиение новым шняжкам.',

                        tasks: [
                            {
                                id: '1',
                                description: 'Есть, пить, спать, глотать, жарить, печь',
                                type: 'one',
                                answers: 'Есть, пить, спать, глотать, жарить, печь'.split(', '),
                                rightAnsewrs: ['Есть'],
                            },
                            {
                                id: '2',
                                description: 'Вторая Задача',
                                type: 'many',
                                answers: 'Есть, пить, спать, глотать, жарить, печь'.split(', '),
                                rightAnsewrs: 'Есть, пить, спать, глотать'.split(', '),
                            },{
                                id: '3',
                                description: 'Вторая Задача ЧТо??',
                                type: 'open',
                                // answers: 'Есть, пить, спать, глотать, жарить, печь'.split(', '),
                                // rightAnsewrs: 'Есть, пить, спать, глотать'.split(', '),
                            },
                        ],
                    },
                ]
            }, 
            {
                id: '2',
                order: 2,
                lessons: [{
                        id: '3',
                        title: 'урок  третий УДачно...',
                        img: '/mocks/2.png',
                        description: 'Вам предложен 333333 урок 33333 такой-то такой-то его суть заключается в сути. выбери свой ввыбор и начните обучиение новым шняжкам.',

                        tasks: [
                            {
                                id: '1',
                                description: 'Есть, пить, спать, глотать, жарить, печь',
                                type: 'one',
                                answers: 'Есть, пить, спать, глотать, жарить, печь'.split(', '),
                                rightAnsewrs: ['Есть'],
                            },
                            {
                                id: '2',
                                description: 'Вторая Задача',
                                type: 'many',
                                answers: 'Есть, пить, спать, глотать, жарить, печь'.split(', '),
                                rightAnsewrs: 'Есть, пить, спать, глотать'.split(', '),
                            },{
                                id: '3',
                                description: 'Вторая Задача ЧТо??',
                                type: 'open',
                                // answers: 'Есть, пить, спать, глотать, жарить, печь'.split(', '),
                                // rightAnsewrs: 'Есть, пить, спать, глотать'.split(', '),
                            },
                        ],
                    },{
                        id: '4',
                        title: 'урок  шестой УДачно...',
                        img: '/mocks/3.png',
                        description: 'Вам предложен урок 444444444 такой-то такой-то его суть заключается в сути. выбери свой ввыбор и начните обучиение новым шняжкам.',

                        tasks: [
                            {
                                id: '1',
                                description: 'Есть, пить, спать, глотать, жарить, печь',
                                type: 'one',
                                answers: 'Есть, пить, спать, глотать, жарить, печь'.split(', '),
                                rightAnsewrs: ['Есть'],
                            },
                            {
                                id: '2',
                                description: 'Вторая Задача',
                                type: 'many',
                                answers: 'Есть, пить, спать, глотать, жарить, печь'.split(', '),
                                rightAnsewrs: 'Есть, пить, спать, глотать'.split(', '),
                            },{
                                id: '3',
                                description: 'Вторая Задача ЧТо??',
                                type: 'open',
                                // answers: 'Есть, пить, спать, глотать, жарить, печь'.split(', '),
                                // rightAnsewrs: 'Есть, пить, спать, глотать'.split(', '),
                            },
                        ],
                    },
                ]}, {
                    id: '3',
                    order: 3,
                    lessons: [{
                        id: '5',
                        title: 'урок  Пятый УДачно...',
                        img: '/mocks/4.png',
                        description: 'Вам предложен5555 урок555555 такой-то такой-то его суть заключается в сути. выбери свой ввыбор и начните обучиение новым шняжкам.',

                        tasks: [
                            {
                                id: '1',
                                description: 'Есть, пить, спать, глотать, жарить, печь',
                                type: 'one',
                                answers: 'Есть, пить, спать, глотать, жарить, печь'.split(', '),
                                rightAnsewrs: ['Есть'],
                            },
                            {
                                id: '2',
                                description: 'Вторая Задача',
                                type: 'many',
                                answers: 'Есть, пить, спать, глотать, жарить, печь'.split(', '),
                                rightAnsewrs: 'Есть, пить, спать, глотать'.split(', '),
                            },{
                                id: '3',
                                description: 'Вторая Задача ЧТо??',
                                type: 'open',
                                // answers: 'Есть, пить, спать, глотать, жарить, печь'.split(', '),
                                // rightAnsewrs: 'Есть, пить, спать, глотать'.split(', '),
                            },
                        ],
                    },
                ]
            },
        ]
    },{
        id: '2',
        title: 'ИУЭС обязательно что-то придумает',
        img: '/mocks/2.png',
        description: 'description',
        type: 'devoloper',
        steps: [
            {
                id: '1',
                order: 1,

                lessons: []
            },
        ]
    },{
        id: '3',
        title: 'ИУЭС обязательно что-то придумает',
        img: '/mocks/3.png',
        description: 'description',
        type: 'designer',
        steps: [
            {
                id: '1',
                order: 1,

                lessons: []
            },
        ]
    },{
        id: '4',
        title: 'ИУЭС обязательно что-то придумает',
        img: '/mocks/4.png',
        description: 'description',
        type: 'devoloper',
        steps: [
            {
                id: '1',
                order: 1,

                lessons: []
            },
        ]
    },
]