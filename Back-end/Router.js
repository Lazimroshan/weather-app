const express=require('express')
const { createuser } = require('./Controllers/User/Userhandles')
const loginuser = require('./Controllers/Login')

const { deleteloc, createlocation, getlocations } = require('./Controllers/User/Mylocationshandle')


const router=express.Router()


router.route('/Createuser').post(createuser)
router.route('/Login').post(loginuser)
router.route('/Loc').post(createlocation)
router.route('/Delloc').delete(deleteloc)
router.route('/getloc/:id').get(getlocations)

module.exports=router