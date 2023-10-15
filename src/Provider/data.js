import {useState} from "react";

export const category = {
    work: "work",
    hobby: "hobby",
    home: "home",
    eat: "eat"
}
export const levelImportance = {
    hard: "Важно",
    normal: "Не особо важно",
    easy: "Не важно"
}

// export const getTasks = () => {
//
//
//     return [
//         {
//             id: 1,
//             text: "Task1",
//             color: getColorTask()[0],
//             date: "2023-10-07",
//             category: category.work,
//             levelImportance: levelImportance.hard,
//
//         },
//         {
//             id: 2,
//             text: "Task2",
//             color: getColorTask()[1],
//             date: "2023-10-08",
//             category: category.hobby,
//             levelImportance: levelImportance.normal,
//
//         },
//         {
//             id: 3,
//             text: "Task3",
//             color: getColorTask()[2],
//             date: "2023-10-07",
//             category: category.eat,
//             levelImportance: levelImportance.easy,
//
//         },
//         {
//             id: 4,
//             text: "Task4",
//             color: getColorTask()[3],
//             date: "2023-10-09",
//             category: category.home,
//             levelImportance: levelImportance.hard,
//
//         }
//     ]
// }
export const getColorTask = () => {
    return ["#FFC8DD", "#CEEDC7", "#FF9494", "#FFD4B2", "#FFF6BD", "#D7E3FC"]
}
