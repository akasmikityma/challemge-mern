import express from 'express';
import { getAllProductTransactions, getBarData, getallstatictics, getDataByCategory ,allCombined} from './controller';
export const apirouter=express.Router();

apirouter.get('/api/getAll',getAllProductTransactions);
apirouter.get('/api/getStats',getallstatictics);
apirouter.get('/api/barData',getBarData);
apirouter.get('/api/getItemspercategory',getDataByCategory);
apirouter.get('/api/allcombined',allCombined)