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
end
