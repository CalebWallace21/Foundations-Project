const candy = require('./db.json')
let globalId = 6

module.exports = {
    getCandy: (req, res) => {
        res.status(200).send(candy)
    },

    addCandy: (req, res) => {
        const {name, picture, rating} = req.body

        const newCandy = {
            id: globalId,
            name,
            picture,
            rating
        }

        candy.push(newCandy)
        globalId++

        res.status(200).send(candy)
    },

    deleteCandy: (req, res) => {
        let {id} = req.params
        const index = candy.findIndex((elem) => elem.id === +id)

        candy.splice(index, 1)
        res.status(200).send(candy)
    },

    rateCandy: (req, res) => {
        let {id} = req.params
        let {type} = req.body

        let index = candy.findIndex(elem => elem.id === +id)

        if(candy[index].rating === 1 && type === `minus`){
            res.status(400).send(`Cannot go below 1`)
        }
        else if(candy[index].rating === 10 && type === `plus`){
            res.status(400).send(`Cannot go above 10`)
        }else if(type === `plus`){
            candy[index].rating += 1
            res.status(200).send(candy)
        }
        else if(type === `minus`){
            candy[index].rating -= 1
            res.status(200).send(candy)
        }
        else{
            res.sendStatus(400)
        }
    }

}