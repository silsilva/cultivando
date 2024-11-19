import algoliasearch from "algoliasearch";

const client = algoliasearch(process.env.ALGOLIAKEY, process.env.ALGOLIAKEY2);

const indexComercio = client.initIndex("comercio");

export { indexComercio };
