export function search_throgh(arr, search_str, priceFlag, price, compare_callback){
  if((!search_str || search_str.length === 0) && !priceFlag) return arr;
  const arr_after_search = arr.filter(value => compare_callback(value, search_str, priceFlag, price));
  return arr_after_search;
}

export function compare_to_offer(offer, search_str, priceFlag, price){
  search_str = search_str.toLowerCase();

  const isFound = (offer.data.name.toLowerCase().includes(search_str)
  || offer.data.description.toLowerCase().includes(search_str));

  return priceFlag ? isFound && offer.data.price >= price : isFound;
}

