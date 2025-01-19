const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const url = process.env.MONGODB_URI

console.log('connected to', url)

mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: { type: String,
    minlength: 3,
    required: true
  },
  number: {
    type: String,
    minlength: 8,
    validate: {
      validator: function(v) {
        const regex = /^(\d{2}|\d{3})-\d+$/
        console.log(`Validating: ${v}, Result: ${regex.test(v)}`)
        return regex.test(v)
      },
      message: props => `${props.value} is not a valid number format! Expected format: 'XX-XXXXXXX' or 'XXX-XXXXXXX'.`
    },
    required: true
  }
}
)
personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)