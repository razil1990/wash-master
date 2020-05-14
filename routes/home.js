const {Router} = require('express')
const express = require('express')
const multer  = require('multer')
const {check, validationResult} = require('express-validator')
const upload = multer()
const router = Router()
const phoneValid = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
const keys = require('../keys')
const SMSru = require('sms_ru')
const sms = new SMSru(keys.PHONE_NUMBER, keys.PASSWORD)

  
router.get('/', (req, res) => {
  res.render('index', {
  title: 'Ремонт стиральных машин',
  })
})

router.post('/', [
  check('name', ' ').isAlpha(['ru-RU']).withMessage('*Имя должно содержать не менее 3 букв на кириллице').isLength({min: 3, max: 12}),
  check('phone').custom((value) => {
    if (!phoneValid.test(value)) {
      throw new Error('*Введите корректный номер телефона')
    } 
      return true
    }),
    check('problem', '*Не более 50 символов').isLength({max: 50})
  ],
  
   
  upload.none(), (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array()
      })
    } else {
      res.status(200).json({ 
      })
      sms.sms_send({
        to: keys.PHONE_NUMBER,
        text:  `${req.body.phone}, ${req.body.problem}`
      }, function(e){
        console.log(e.description)
      })
     
      req.body.name = null
      req.body.phone = null
    }
  })

 

  module.exports = router