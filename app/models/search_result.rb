# == Schema Information
#
# Table name: search_results
#
#  id                     :integer          not null, primary key
#  total_smart_tv         :integer
#  samsung_smart_tv       :integer
#  lg_smart_tv            :integer
#  toshiba_smart_tv       :integer
#  sony_smart_tv          :integer
#  samsung_smart_tv_top3  :integer
#  lg_smart_tv_top3       :integer
#  toshiba_smart_tv_top3  :integer
#  sony_smart_tv_top3     :integer
#  total_curved_tv        :integer
#  samsung_curved_tv      :integer
#  lg_curved_tv           :integer
#  toshiba_curved_tv      :integer
#  sony_curved_tv         :integer
#  samsung_curved_tv_top3 :integer
#  lg_curved_tv_top3      :integer
#  toshiba_curved_tv_top3 :integer
#  sony_curved_tv_top3    :integer
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#

class SearchResult < ApplicationRecord
  validates :total_smart_tv, presence: true

  has_many :search_result_items,
    class_name: :SearchResultItem,
    foreign_key: :search_result_id

  def self.update
    smart_tv = SearchResult.get_results('https://www.bestbuy.com/site/searchpage.jsp?cp=', '&searchType=search&st=smart%20tv&_dyncharset=UTF-8&id=pcat17071&type=page&sc=Global&nrp=&sp=&qp=&list=n&af=true&iht=y&usc=All%20Categories&ks=960&keys=keys')
    curved_tv = SearchResult.get_results('https://www.bestbuy.com/site/searchpage.jsp?cp=', '&searchType=search&st=curved%20smart%20tv&_dyncharset=UTF-8&id=pcat17071&type=page&sc=Global&nrp=&sp=&qp=&list=n&af=true&iht=y&usc=All%20Categories&ks=960&keys=keys')
    return SearchResult.new({
      total_smart_tv: smart_tv[:all_results].length,
      samsung_smart_tv: smart_tv[:brands][:samsung].length,
      lg_smart_tv: smart_tv[:brands][:lg].length,
      toshiba_smart_tv: smart_tv[:brands][:toshiba].length,
      sony_smart_tv: smart_tv[:brands][:sony].length,
      samsung_smart_tv_top3: smart_tv[:brands_top3][:samsung].length,
      lg_smart_tv_top3: smart_tv[:brands_top3][:lg].length,
      toshiba_smart_tv_top3: smart_tv[:brands_top3][:toshiba].length,
      sony_smart_tv_top3: smart_tv[:brands_top3][:sony].length,
      total_curved_tv: curved_tv[:all_results].length,
      samsung_curved_tv: curved_tv[:brands][:samsung].length,
      lg_curved_tv: curved_tv[:brands][:lg].length,
      toshiba_curved_tv: curved_tv[:brands][:toshiba].length,
      sony_curved_tv: curved_tv[:brands][:sony].length,
      samsung_curved_tv_top3: curved_tv[:brands_top3][:samsung].length,
      lg_curved_tv_top3: curved_tv[:brands_top3][:lg].length,
      toshiba_curved_tv_top3: curved_tv[:brands_top3][:toshiba].length,
      sony_curved_tv_top3: curved_tv[:brands_top3][:sony].length
      })
    if @search_result.save
      {smart_tv => "smart_tv", curved_tv => "curved_tv"}.each do |search_term, search_term_text|
        search_term[:all_results].each_with_index do |result, idx|
          item = SearchResultItem.new({
            search_result_id: @search_result.id,
            search_term: search_term_text,
            reviews: search_term[:reviews][idx],
            rating: search_term[:ratings][idx]
          })
          item.save
        end
      end
    end
    return @search_result
  end




  def self.get_results(first_half, second_half)
    # Figure out how many results per page, how many pages, and how many total results
    uri = first_half + "1" + second_half
    doc = Nokogiri::HTML(open(uri))
    results_summary = doc.css('div.results-summary')
    words = results_summary[0].text.split
    results_per_page = words[5].to_i - words[3].to_i + 1
    total_results = words[7].to_i
    total_pages = (total_results / results_per_page.to_f).ceil

    #Put all search results in an array
    all_results = []
    (1..total_pages).to_a.each do |page|
      page_uri = first_half + page.to_s + second_half
      page_doc = Nokogiri::HTML(open(page_uri))
      items = page_doc.css('div.list-item')
      all_results += items
    end

    # Seperate into titles, reviews, and ratings
    titles = []
    reviews = []
    ratings = []
    all_results.each do |result|
      title = result.css('div.sku-title h4 a')
      titles << title.text

      num_reviews = result.css('span.number-of-reviews').text
      if num_reviews == ""
        reviews << 0
      else
        reviews << num_reviews.to_i
      end

      rating = result.css('span.star-rating-value').text
      if rating == ""
        ratings << nil
      else
        ratings << rating.to_f
      end
    end


    # Check for frequency of each brand
    brands = {samsung: [], lg: [], toshiba: [], sony: []}
    titles.each_with_index do |result, idx|
      words = result.split
      brands[:samsung] << idx if words.include?("Samsung")
      brands[:lg] << idx if words.include?("LG")
      brands[:toshiba] << idx if words.include?("Toshiba")
      brands[:sony] << idx if words.include?("Sony")
    end
    brands_top3 = {samsung: [], lg: [], toshiba: [], sony: []}
    titles[0..2].each_with_index do |result, idx|
      words = result.split
      brands_top3[:samsung] << idx if words.include?("Samsung")
      brands_top3[:lg] << idx if words.include?("LG")
      brands_top3[:toshiba] << idx if words.include?("Toshiba")
      brands_top3[:sony] << idx if words.include?("Sony")
    end


    return {all_results: all_results, brands: brands, brands_top3: brands_top3, reviews: reviews, ratings: ratings}
  end

end
