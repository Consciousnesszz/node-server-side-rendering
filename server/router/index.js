import Router from 'koa-router';
import clientRender from '../middleware/clientRender';

const router = new Router();

router.get('/', async (ctx) => {
  ctx.body = await clientRender(ctx);
});

router.get('/user', async (ctx) => {
  ctx.body = await clientRender(ctx);
});

export default router;
