const express = require(`express`)
const cors = require(`cors`)

const app = express()

app.use(express.json())
app.use(cors())

const {getCandy, addCandy, deleteCandy, rateCandy} = require(`./controller`)

app.get(`/candy`, getCandy)
app.post(`/addCandy`, addCandy)
app.delete(`/deleteCandy/:id`, deleteCandy)
app.put(`/rateCandy/:id`, rateCandy)


app.listen(4001, () => console.log (`Server is up on port 4001`))