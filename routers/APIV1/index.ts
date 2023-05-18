import express  from 'express';
import graph  from './graph';
import rack  from './rack';
import user from './user';

const router = express.Router();

router.use('/graph', graph);
router.use('/rack', rack);
router.use('/user', user);
module.exports = router;