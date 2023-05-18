import express,{Request, Response} from "express";
import GraphController from '../../controllers/graphController'
const router = express.Router()

// middleware that is specific to this router
// router.use((req, res, next) => {
//   console.log('Time: ', Date.now())
//   next()
// })
// define the home page route
router.get('/graph-data/:id', (req:Request, res:Response) => {
  GraphController().getGraphDataById(req, res)
  // res.send('Birds home page')
})
// define the about route
router.get('/about', (req:Request, res:any) => {
  res.json('')
})

export default router