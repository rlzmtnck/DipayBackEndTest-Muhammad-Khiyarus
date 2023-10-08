const express = require('express');
const router = express.Router();
const companyController = require('../app/api/controllers/companies');
const { validate, compValidationRules } = require ('../validators/companies');
const companyModel = require('../app/api/models/companies');
const employeeModel = require('../app/api/models/employees');


router.get('/', companyController.getAll);
// router.post('/', movieController.create);
router.post('/add', compValidationRules(), validate, (req, res) => {

    companyModel.create({
      company_name: req.body.company_name,
      telephone_number: req.body.telephone_number,
      is_active: req.body.is_active,
      address: req.body.address,
      
    }).then(comp => res.json({status:201, code:"201", data:comp, message: "Company added successfully!!!"}))
  }

);
router.get('/:companyId', companyController.getById);
router.put('/:companyId', companyController.updateById);
router.get("/:companyId/employees", async (req, res) => {
    let employeelist = [];

    let data_employe = await employeeModel.find({ company_id: req.params.companyId })
    if (data_employe != undefined && data_employe != null) {
        for (let data_employes of data_employe) {
            employeelist.push({ id: data_employes._id, name: data_employes.name, phone_number: data_employes.phone_number, jobtittle: data_employes.jobtittle });
        }
    }

    companyModel.findOne({ _id: req.params.companyId }, function (err, companies) {
        if (err) {
            next(err);
        } else {
            let employees = employeelist
            let result_new = { status: 200, code: "200", data: { "id": companies._id, "company_name": companies.company_name, "is_active": companies.is_active, employees }, message: "Success" }
            res.json(result_new);
        }

    });

});
router.put("/:companyId/set_active", (req, res) => {
    console.log(req.params.companyId)
    companyModel.findByIdAndUpdate( { _id: req.params.companyId },{$set:{is_active:true}},{
        new: true,
      },(error,result)=>{
        console.log(result)
        if(error){
              console.log(error);
              return next(error);
         }
         res.json({status:201, code:"201",data:{"id": result._id, "is_active": result.is_active}, message:'Success'});
         });
});

router.delete('/:companyId', companyController.deleteById);

module.exports = router;