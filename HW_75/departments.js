const mongoose = require('mongoose');

const departmentsSchema = new mongoose.Schema({
    name: String,
    employees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'employee' }]
});

departmentsSchema.methods.print = function () {
    console.log(this.name);
    this.employees.forEach(employee => {
        if (employee.print) {
            employee.print();
        } else {
            console.log("couldn't find the employee schema", employee);
        }
    });
};

module.exports = mongoose.model('department', departmentsSchema);