const task = document.querySelector('.description');
const answer = document.querySelector('.answer');
const btn = document.querySelectorAll('.btn');

const description = {
    1: "Задание 1: Создать объект pet со свойствами type (тип питомца - кошка/собака/...), name (имя питомца) и sound (издаваемый звук). Создать метод объекта say, который в качетсве аргумента принимает текст. При вызове метода pet.say() должна возвращаться строка \"\<type\> \<name\> говорит \<передаваемый текст\>\". Если передаваемый текст отсутствует, возвращаем издаваемый звук.",
    2: "Задание 2: Дан объект с продуктами. Написать код, который создаст новый объект с типами продуктов и их количеством.",
    3: "Задание 3: Создать объект cars, состоящий из 10 автомобилей. Ключи объекта - названия популярных марок автомобилей. Значения объекта - объект, содержащий в себе цвет автомобиля, страну-производителя, год выпуска (разброс годов ~ 20 лет). Вывести всю информации о трёх самых молодых автомобилях. Вывести всю информацию о трех самых старых автомобилях."
}

// Task 1
const pet = {
    petName: "Barsik",
    petType: "Cat",
    petSound: "meow",
    say: function (el) {
        return el ? `<div class="addList"> ${this.petType} ${this.petName} says "${el}" </div>` : `<div class="addList"> ${this.petType} ${this.petName} says "${this.petSound}" </div>`
    },
}

// Task 2
const products = {
    "Potato": "Овощи",
    "Carrot": "Овощи",
    "Banana": "Фрукты",
    "Orange": "Фрукты",
    "Apple": "Фрукты",
    "Strawberry": "Ягоды",
    "Tomato": "Овощи",
    "Melon": "Фрукты",
    "Lemon": "Фрукты"
}

const list = {
    "Фрукты": 0,
    "Овощи": 0,
    "Ягоды": 0
}

//Применяется для обновления списка после переключения страницы
const listNull = () => {
    let tmp = 1
    for (let i in list) {
        list[i] = 0
        if (tmp > 3) {
            delete list[i]
        }
        tmp++
    }
}

let listArr = []

const listProduct = () => {
    for (let i in products) {
        list[products[i]]++
    }
}
listProduct()

const listStr = () => {
    for (let i in list) {
        listArr.push(`<div class="addList">${i} &#129185; ${list[i]}</div>`)
    }
}
listStr()

//Task 3
const cars = {
    "Toyota": {
        color: "Black",
        year: 2001
    },
    "Ford": {
        color: "Gray",
        year: 2013
    },
    "Nissan": {
        color: "White",
        year: 2010
    },
    "KIA": {
        color: "Brown",
        year: 2005
    },
    "Mercedes-Benz": {
        color: "Black",
        year: 2016
    },
    "Mazda": {
        color: "Red",
        year: 2013
    },
    "Volkswagen": {
        color: "Gray",
        year: 1998
    },
    "Mitsubishi": {
        color: "Blue",
        year: 2010
    },
    "LADA": {
        color: "Orangered",
        year: 2014
    },
    "Lexus": {
        color: "Gray",
        year: 2019
    }
}

let carsSort = []
const carsPush = () => {
    for (let i in cars) {
        carsSort.push([cars[i].color, i, cars[i].year])
    }
}
carsPush()

const sorted = (el) => {
    return el.sort((a, b) => {
        return a[2] - b[2]
    }).splice(3, el.length - 6)
}

sorted(carsSort)

const newCars = (el) => {
    return `<div class="addList"> ${carsSort[el][0]} ${carsSort[el][1]} (${carsSort[el][2]} model year) - an new car </div>`
}

const oldCars = (el) => {
    return `<div class="addList"> ${carsSort[el][0]} ${carsSort[el][1]} (${carsSort[el][2]} model year) - an old car </div>`
}

let carsArr = []

const conclusion = () => {
    for (let i = 0; i < carsSort.length; i++) {
        i < Math.floor(carsSort.length / 2) ? carsArr.push(oldCars(i)) : carsArr.push(newCars(i))
    }
}
conclusion()

//Result
const output = {
    1: pet.say(),
    2: listArr.join(''),
    3: carsArr.join('')
}

let temp = ''

const input = document.createElement('input')
input.type = 'text'
input.placeholder = 'Например: "Привет"'
input.addEventListener('input', (event) => {
    if (count === 1) {
        temp = pet.say(event.target.value.charAt(0).toUpperCase() + event.target.value.slice(1))
    } else if (count === 2) {
        temp = event.target.value.split(' ');
    } else if (count === 3) {
        temp = event.target.value.split(' ');
    }
});

const button = document.createElement('button')
button.type = 'button'
button.textContent = 'Add'
button.addEventListener('click', () => {
    if (temp && count === 1) {
        answer.innerHTML = temp
        answer.append(input, button)
        input.value = ''
        temp = ''
    } else if (temp.length === 3 && temp[1] === '-' && count === 2) {
        temp[2] = temp[2].charAt(0).toUpperCase() + temp[2].slice(1)
        if (list[temp[2]]) {
            list[temp[2]]++
        } else {
            list[temp[2]] = 1
        }
        listArr = []
        listStr()
        answer.innerHTML = listArr.join('')
        answer.append(input, button)
        input.value = ''
        temp = ''
    } else if (temp.length === 3 && +temp[2] >= 1900 && +temp[2] <= 2024 && count === 3) {
        temp[0] = temp[0].charAt(0).toUpperCase() + temp[0].slice(1)
        temp[1] = temp[1].charAt(0).toUpperCase() + temp[1].slice(1)
        carsSort.push(temp)
        sorted(carsSort)
        carsArr = []
        conclusion()
        answer.innerHTML = carsArr.join('')
        answer.append(input, button)
        input.value = ''
        temp = ''
    }
})

task.innerHTML = description[1]
answer.innerHTML = output[1]
answer.append(input, button)
let count = 1

for (let el of btn) {
    el.addEventListener('click', () => {
        input.value = ''
        temp = ''
        if (el.classList.contains('left') && count > 1) {
            count--
        } else if (el.classList.contains('right') && count < 3) {
            count++
        }
        if (count === 1) {
            input.placeholder = 'Например: "Привет"'
        } else if (count === 2) {
            listNull()
            listProduct()
            input.placeholder = 'Например: Яблоко - Фрукты'
        } else if (count == 3) {
            carsSort = []
            carsPush()
            input.placeholder = 'Например: Серый Опель 2020'
        }
        answer.innerHTML = output[count]
        answer.append(input, button)
        task.innerHTML = description[count]
    })
}
