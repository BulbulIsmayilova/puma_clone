export const getVariant = (product) => {
    let localData = [];
    let lastIndex = product.categories.length
    let kod = `${product.categories[0].name}'s ${product.categories[lastIndex - 1].name}`
    product.variants.forEach(variant => {
        if(variant.images.length === 0 ) return
        const checkSpec = localData.some(element => element.specs.color === variant.specs.color);
        if (!checkSpec) {
            localData.push({
                ...variant,
                productTitle: product.title,
                productSlug: product.slug,
                productCategory : kod
            });
        }
    });
    return localData;
};
 
