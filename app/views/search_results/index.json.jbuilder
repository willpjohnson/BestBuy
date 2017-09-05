@searches.each do |search|
  json.set! search.id do
    json.id search.id
    json.created_at search.created_at

    json.total_smart_tv search.total_smart_tv
    json.samsung_smart_tv search.samsung_smart_tv
    json.lg_smart_tv search.lg_smart_tv
    json.toshiba_smart_tv search.toshiba_smart_tv
    json.sony_smart_tv search.sony_smart_tv
    json.samsung_smart_tv_top3 search.samsung_smart_tv_top3
    json.lg_smart_tv_top3 search.lg_smart_tv_top3
    json.toshiba_smart_tv_top3 search.toshiba_smart_tv_top3
    json.sony_smart_tv_top3 search.sony_smart_tv_top3
    json.total_curved_tv search.total_curved_tv
    json.samsung_curved_tv search.samsung_curved_tv
    json.lg_curved_tv search.lg_curved_tv
    json.toshiba_curved_tv search.toshiba_curved_tv
    json.sony_curved_tv search.sony_curved_tv
    json.samsung_curved_tv_top3 search.samsung_curved_tv_top3
    json.lg_curved_tv_top3 search.lg_curved_tv_top3
    json.toshiba_curved_tv_top3 search.toshiba_curved_tv_top3
    json.sony_curved_tv_top3 search.sony_curved_tv_top3

    json.search_result_items search.search_result_items
  end
end
