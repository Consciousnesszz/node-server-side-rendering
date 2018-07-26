import Router from 'koa-router';

const router = new Router();

router.get('/', async (ctx, next) => {
  console.log(ctx);
});

export default router;
