# == Schema Information
#
# Table name: search_result_items
#
#  id               :integer          not null, primary key
#  search_result_id :integer
#  search_term      :string
#  brand            :string
#  reviews          :integer
#  rating           :integer
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#

class SearchResultItem < ApplicationRecord
  belongs_to :search_result,
    class_name: :SearchResult,
    foreign_key: :search_result_id
end
