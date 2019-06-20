export function search_throgh(arr, search_str, compare_callback){
  if(!search_str || search_str.length === 0) return arr;
  const arr_after_search = arr.filter(value => compare_callback(value, search_str));
  return arr_after_search;
}

export function compare_to_offer(offer, search_str){
  search_str = search_str.toLowerCase();
  return offer.data.name.toLowerCase().includes(search_str)
  || offer.data.description.toLowerCase().includes(search_str);
}

