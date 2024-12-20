const express = require("express");
const {
    handleGetAllUsers ,
    handleGetUserById ,
    handleUpdateUserById,
    handleDeleteUserById,
    handleCreateNewUser,
  } = require('../controllers/user')

const router = express.Router();

// initially we were doing , const app = express();

// but here we are using router

// these routes are helpful to maintain a large number of routes
/*--------------------------------------------------------------------------------------------
app.route('/user/').get(()=>{}) 
  
is equivalent to

app.use("/users" , userRouter) where inside userRouter we have .route('/').get(()=>{})
-------------------------------------------------------------------------------------------*/

//REST Api
router
.route('/')
.get(handleGetAllUsers)
.post(handleCreateNewUser);


router.
    route('/:id')
    .get(handleGetUserById)
    .patch(handleUpdateUserById)
    .delete(handleDeleteUserById);




module.exports = router;