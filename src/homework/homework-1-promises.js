// Задача на проміс.
// Виконайте послідовне виконання промісу `arrayHandler` стільки разів, скільки елементів знаходиться
// в масиві array. Кожен наступний проміс повинен виконатись лише тоді коли попередній успішно завершився.
// Функція `arrayHandler` приймає аргументом значення з поточної ітерації масиву `array`

export const arrayHandler = (num) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (num % 2 === 0) {
        reject(new Error(`Error with number: ${num}`))
      } else {
        console.log(`Resolved: ${num}`)
        resolve(num)
      }
    }, num * 1000)
  })
}

const array = [1, 2, 3, 4, 5]

async function handleArray (array) {
  for (let i = 0; i < array.length; i++) {
    try {
      await arrayHandler(array[i])
    } catch (error) {
      console.error(error)
    }
  }
  console.log('All promises done;)')
}

handleArray(array)
