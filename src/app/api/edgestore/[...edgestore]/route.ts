import { initEdgeStore } from '@edgestore/server';
import { createEdgeStoreNextHandler } from '@edgestore/server/adapters/next/app';
import { z } from 'zod';
 
const es = initEdgeStore.create();
 
 
const edgeStoreRouter = es.router({
  publicFiles: es.fileBucket()

  .input(
    z.object({
      type:z.enum(["purchases","profile"]),
    })
  )
  .path(({input})=>[{type:input.type}])
  
  .beforeDelete(({ ctx, fileInfo }) => {
    console.log('beforeDelete', ctx, fileInfo);
    return true; // allow delete
  }),
});

 
const handler = createEdgeStoreNextHandler({
  router: edgeStoreRouter,
});
 
export { handler as GET, handler as POST };
 
 

export type EdgeStoreRouter = typeof edgeStoreRouter;