import express from "express"
import { create, deleteUser, getAll, getOne, updateUser } from "../controller/userController.js"

const route = express.Router()

route.post("/create", create)
route.get("/allusers", getAll)
route.get("/getOne/:id", getOne)
route.put("/update/:id", updateUser)
route.delete("/delete/:id", deleteUser)
export default route