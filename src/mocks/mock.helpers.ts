import {
  DefaultBodyType,
  HttpResponse,
  StrictRequest,
  StrictResponse,
} from "msw";

export const generateCollection = <
  Item extends any,
  ItemRaw extends any = any,
>({
  baseUri,

  getItem,
  getItemRaw,
  request,
  itemCount,
}: {
  baseUri: string;
  getItem: (id: number) => Item;
  getItemRaw?: (id: number) => ItemRaw;
  request: StrictRequest<DefaultBodyType>;
  itemCount?: number;
}): StrictResponse<any> => {
  const url = new URL(request.url);
  const partial = url.searchParams.get("partial");
  const perPage = Number(url.searchParams.get("perPage")) || 25;
  const page = Number(url.searchParams.get("page")) || 1;

  const items = Array.from({ length: itemCount || 0 }, (_, index) =>
    getItemRaw ? getItemRaw(index + 1) : getItem(index + 1),
  );
  const totalPages = Math.ceil(items.length / perPage);

  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;
  const paginatedItems = items.slice(startIndex, endIndex);
  const nextPage = page + 1;
  const hasNextPage = nextPage <= totalPages;
  url.searchParams.set("page", `${nextPage}`);

  const context = baseUri.split("/");
  const contextEntity = context[context.length - 1];
  return HttpResponse.json({
    "@context": `/api/contexts/${contextEntity}`,
    "@id": baseUri,
    "@type": "hydra:Collection",
    "hydra:member": paginatedItems,
    "hydra:view": {
      "@id": `${baseUri}?perPage=${perPage}&partial=true&page=${page}`,
      "@type": "hydra:PartialCollectionView",
      "hydra:next": hasNextPage
        ? `${baseUri}?${url.searchParams.toString()}`
        : "",
    },
    "hydra:search": {
      "@type": "hydra:IriTemplate",
      "hydra:template": "",
      "hydra:variableRepresentation": "BasicRepresentation",
      "hydra:mapping": [],
    },
    ...(partial === "false" && { "hydra:totalItems": itemCount || 0 }),
  });
};
