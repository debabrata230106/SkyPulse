import NodeCache from "node-cache";

const cache = new NodeCache({
  stdTTL: 600 // store for 10 minutes
});

export default cache;