const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Creating a schema, sort of like working with an ORM
const recordSchema = new Schema({
	name: {
		type: String,
		required: [true, 'Name field is required.']
	},
	win_time: {
		type: Number,
		required: [true, 'number field is required.']
	}
})

// Creating a table within database with the defined schema
const Message = mongoose.model('record', recordSchema)

// Exporting table for querying and mutating
module.exports = Message
