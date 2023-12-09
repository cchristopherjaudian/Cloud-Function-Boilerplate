import express from "express"
import { AccountSignup } from "../handlers/account"

const router = express.Router()

router.post('/signup', AccountSignup)

export default router
