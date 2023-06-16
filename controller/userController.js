const users = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//inserting the user

module.exports.register = async (req, res) => {
    try {
        const { firstName, lastName, email, password, phno } = req.body
        if (!(firstName && lastName && email && password)) {
            res.status(400).send('all input required')
        }
        let encryptPasswrd = await bcrypt.hash(password, 10)
        let userDetails = new users({
            firstName, lastName, email, mobileNo: phno, password: encryptPasswrd
        })

        userDetails.save().then(newOne => {
            console.log('newOne password---->', newOne)
            res.json({
                'Status': '200',
                'message': 'User added successfully',
                'Username': newOne.firstName,
                'Password': newOne.password,
                'userId':newOne._id
            })
        }).catch(err => {
            console.log(err)
            res.json({
                'Status': '400',
                'message': 'An unexpected Error'
            })
        })

    } catch (err) {
        console.log(err)
    }
}

module.exports.login = async (req, res) => {
    try {
        const {  Username, password } = req.body;
        if (!(Username && password)) {
            res.status(400).send('All input is required');
        }
        // console.log(firstName)
        users.findOne({ firstName:Username }).then(oldUser => {
            if (oldUser) {
                let passwordCheck = bcrypt.compare(password, oldUser.password)
                if (passwordCheck) {
                    const token = jwt.sign({ user_id: oldUser._id, userName:oldUser.firstName }, process.env.TOKEN_KEY, { expiresIn: "1h" })
                    const refreshToken= jwt.sign({ user_id: oldUser._id, userName:oldUser.firstName }, process.env.REFRESH_TOKEN, { expiresIn: "48h" })
                    let obj1 = { 'message': 'Login successfully!!!', token,refreshToken }
                    res.status(200).send(obj1)
                } else {
                    res.status(400).send("Invalid Credentials")
                }
            } else {
                res.status(400).send("Please register")
            }
        }).catch(err => {
            console.log(err)
        })
    } catch (err) {
        console.log(err)
    }
}

//show the list of users
module.exports.index = (req, res, next) => {
    users.find().then(response => {
        res.json(response)
    }).catch(error => {
        res.json({
            'message': 'An error occured '
        })
    })
}
//show the list of based on id

module.exports.show=(req,res,next)=>{
    let userId=req.body.userId

    users.findById(userId)
    .then(response=>{
        res.json({
            response
        })
    }).catch(error=>{
        res.json({
            'message': 'An error occured '
        })
    })
}


// //update an user

module.exports.update=(req,res,next)=>{
    const{userId,firstName,lastName,email,phno}=req.body
    let updateData={
        firstName, lastName, email, mobileNo: phno
    }
    users.findByIdAndUpdate(userId,{$set:updateData}).then(()=>{
        res.json({
            message:'employee updated successfully'
        })
    }).catch(error=>{
        res.json({
        'message':'An error occured!!'
        })
    })
}

//delete an user
module.exports.destroy=(req,res,next)=>{
    let userId=req.body.userId
    users.findByIdAndRemove(userId).then(()=>{
        res.json({
            message:"employee deleted successfully"
        })
    }).catch(err=>{
        res.json({
        'message':'An error occured!!'
        })
    })

}
