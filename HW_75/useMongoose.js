const mongoose = require('mongoose'),
    Employees = require('./employees'),
    Departments = require('./departments');

mongoose.connect('mongodb://127.0.0.1:27017/myBusiness');

mongoose.connection.on('error', err => {
    console.error(err);
});

mongoose.connection.on('open', () => {
    console.log('connected');

    const donald = new Employees({
        name: {
            first: 'Donald',
            last: 'Trump'
        },
        salary: '120000',
        department: 'Sales'
    }),
        hillary = new Employees({
            name: {
                first: 'Hillary',
                last: 'Clinton'
            },
            salary: '105000',
            department: 'Sales'
        }),
        barack = new Employees({
            name: {
                first: 'Barack',
                last: 'Obama'
            },
            salary: '85000',
            department: 'Marketing'
        }),
        bernie = new Employees({
            name: {
                first: 'Bernie',
                last: 'Sanders'
            },
            salary: '75000',
            department: 'Marketing'
        });

    donald.save();

    hillary.save(() => {
        const sales = new Departments({
            name: 'Sales'
        });
        sales.employees.push(hillary);
        sales.employees.push(donald);

        sales.save();
    });

    barack.save();

    bernie.save(() => {
        const marketing = new Departments({
            name: 'Marketing'
        });
        marketing.employees.push(barack);
        marketing.employees.push(bernie);

        marketing.save((err, res) => {
            if (err) {
                console.error(err);
            } else {
                Departments.find().populate('employees').exec((err, employees) => {
                    employees.forEach(employee => {
                        employee.print();
                    });
                });
            }
        });
    });
});