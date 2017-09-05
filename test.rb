require 'open-uri'
require 'rubygems'
require 'nokogiri'

# uri = 'https://www.bestbuy.com/site/searchpage.jsp?st=smart+tv&_dyncharset=UTF-8&id=pcat17071&type=page&sc=Global&cp=1&nrp=&sp=&qp=&list=n&af=true&iht=y&usc=All+Categories&ks=960&keys=keys'
uri = 'https://www.bestbuy.com/site/searchpage.jsp?cp=2&searchType=search&st=smart%20tv&_dyncharset=UTF-8&id=pcat17071&type=page&sc=Global&nrp=&sp=&qp=&list=n&af=true&iht=y&usc=All%20Categories&ks=960&keys=keys'
doc = Nokogiri::HTML(open(uri))

results_summary = doc.css('div.results-summary')
words = results_summary[0].text.split
results_per_page = words[5].to_i - words[3].to_i + 1
total_results = words[7].to_i
total_pages = (total_results / results_per_page.to_f).ceil


if __FILE__ == $PROGRAM_NAME
  all_results = []
  (1..8).to_a.each do |page|
    page_uri = 'https://www.bestbuy.com/site/searchpage.jsp?cp=' + page.to_s + '&searchType=search&st=smart%20tv&_dyncharset=UTF-8&id=pcat17071&type=page&sc=Global&nrp=&sp=&qp=&list=n&af=true&iht=y&usc=All%20Categories&ks=960&keys=keys'
    page_doc = Nokogiri::HTML(open(page_uri))
    items = page_doc.css('div.list-item')
    all_results += items
  end

  titles = []
  reviews = []
  ratings = []
  all_results.each do |result|
    # title = result.css('div.sku-title h4 a')
    # titles << title.text
    # num = result.css('span.number-of-reviews').text
    # if num == ""
    #   reviews << 0
    # else
    #   reviews << num.to_i
    # end
    rating = result.css('span.star-rating-value').text
    if rating == ""
      ratings << nil
    else
      ratings << rating.to_f
    end
  end
  p ratings
end
