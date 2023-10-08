const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer')
const employeeController = require('../app/api/controllers/employees');
const { validate, empValidationRules } = require('../validators/employees');
const employeeModel = require('../app/api/models/employees');
const companyModel = require('../app/api/models/companies');

// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: 'irulsyn@gmail.com',
//         pass: 'Lazada1234$'
//     }
// });
router.get('/', employeeController.getAll);
// router.post('/', movieController.create);
router.post('/add', empValidationRules(), validate, (req, res) => {

    employeeModel.create({
        name: req.body.name,
        email: req.body.email,
        phone_number: req.body.phone_number,
        jobtittle: req.body.jobtittle,

        company_id: req.body.company_id,
    
    })
    .then(emp => res.json({ status: 201, code: "201", data: emp, message: "employee added successfully!!! and email sent to employee" }))
}

);
router.get('/:employeeId', employeeController.getById);
router.put('/:employeeId', employeeController.updateById);
// router.get("/:companyId/employees", async (req, res) => {
//     let employeelist = [];
//     let data_employe = await employeeModel.find({ company_id: req.params.companyId })
//     if (data_employe != undefined && data_employe != null) {
//         for (let data_employes of data_employe) {
//             employeelist.push({ id: data_employes._id, name: data_employes.name, phone_number: data_employes.telephone_number, jobtittle: data_employes.jobtittle });
//         }
//     }

//     companyModel.findOne({ _id: req.params.companyId }, function (err, companies) {
//         if (err) {
//             next(err);
//         } else {
//             let result_new = { status: 200, code: "200", data: { "id": companies._id, "company_name": companies.company_name, "is_active": companies.is_active, "employees": employeelist }, message: "Success" }
//             res.json(result_new);
//         }

//     });

// });

router.delete('/:employeeId', employeeController.deleteById);

module.exports = router;