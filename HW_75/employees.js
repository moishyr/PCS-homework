const mongoose = require('mongoose');

const employeesSchema = new mongoose.Schema({
    name: {
        first: String,
        last: String
    },
    salary: String,
    department: {type: String, ref: 'department'}
});

employeesSchema.methods.print = function () {
    console.log('- ', this.name.first, this.name.last, this.salary);
};

module.exports = mongoose.model('employee', employeesSchema);