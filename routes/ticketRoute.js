import express from 'express';

import { buyTicket, buytickets, getticketbyfan } from '../controllers/ticketController.js';
  
const router = express.Router();

router
  .route('/tickets/:fanId/:matchId')
  .get(buyTicket);
  
router
  .route('/tickets/:fanId')
  .get(getticketbyfan);

export default router;