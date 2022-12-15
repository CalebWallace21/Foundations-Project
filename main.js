const baseURL = "http://localhost:4001"

const addCandy = document.querySelector(`#add-btn`)
const candyContain = document.querySelector(`#candy-container`)

const createCandyBox = (candy) => {
    const candyBox = document.createElement('section')
    candyBox.classList.add(`candy-box`)

    candyBox.innerHTML = `
    <h3 id = 'candy-name'>${candy.name}</h3>
    <img alt = 'Candy Image' src= ${candy.picture} />
    
    <section id='candy-content'>
        <button id='minus-rating' onclick="updateCandy(${candy.id}, 'minus')">Minus</button>
        Rating: ${candy.rating}
        <button id='plus-rating' onclick="updateCandy(${candy.id}, 'plus')">Plus</button>
    </section>
    <button id='remove-btn' onclick="deleteCandy(${candy.id})">Remove</button>
    `

    candyContain.appendChild(candyBox)
}

const displayCandy = (array) => {
    for (let i=0; i < array.length; i++) {
        createCandyBox(array[i])
    }
}

const getAllCandy = () => {
    axios.get(`${baseURL}/candy`)
    .then((res) => {
        displayCandy(res.data)
    })
    .catch((err) => {
        alert(err)
    }) 
}

const addCandyFunc = () => {
    candyContain.innerHTML = ''

    const name = document.querySelector(`#name`)
    const rating = document.querySelector(`#rating`)
    const picture = document.querySelector(`#image`)

    let bodyObj = {
        name: name.value,
        rating: rating.value,
        picture: picture.value
    }

    axios.post(`${baseURL}/addCandy`, bodyObj)
    .then((res) => {
        name.value = ''
        rating.value = ''
        picture.value = ''

        displayCandy(res.data)
    })
    .catch((err) => {
        console.log(err)
    })
}

const deleteCandy = (id) => {
    axios.delete(`${baseURL}/deleteCandy/${id}`)
    .then((res) => {
        candyContain.innerHTML = ''
        displayCandy(res.data)
    })
    .catch((err) => {
        console.log(err)
    })
}

const updateCandy = (id, type) => {
    axios.put(`${baseURL}/rateCandy/${id}`, {type})
    .then((res) => {
        candyContain.innerHTML = ''
        displayCandy(res.data)
    })
    .catch((err) => {
        console.log(err.message)
    })
}

addCandy.addEventListener(`click`, addCandyFunc)

getAllCandy()