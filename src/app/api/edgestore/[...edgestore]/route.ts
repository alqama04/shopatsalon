import { initEdgeStore } from '@edgestore/server';
import { createEdgeStoreNextHandler } from '@edgestore/server/adapters/next/app';
import { z } from 'zod';
 
const es = initEdgeStore.create();
 
 
const edgeStoreRouter = es.router({
  publicFiles: es.fileBucket({
    maxSize:1024*1024*5,
    accept: ['image/jpeg', 'image/jpg','image/png','image/webp', 'application/pdf']
  })

  .input(
    z.object({
      type:z.enum(["purchases","orders"]),
    })
  )
  .path(({input})=>[{type:input.type}])
  
  .beforeDelete(({ ctx, fileInfo }) => {
    return true; 
  }),
});

 
const handler = createEdgeStoreNextHandler({
  router: edgeStoreRouter,
});
 
export { handler as GET, handler as POST };
 
 

export type EdgeStoreRouter = typeof edgeStoreRouter;