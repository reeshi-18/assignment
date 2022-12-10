import express from 'express';
import controller from '../app/controllers/controllers';
global.__basedir = process.cwd();

const router = express.Router()

router.get("/", (req,res) => {
    controller.showData(req,res)
})

router.get("/search", (req,res) => {
    controller.searchData(req,res)
})

router.get("/pagination", (req,res) => {
    controller.getPageData(req,res)
})
export default router;