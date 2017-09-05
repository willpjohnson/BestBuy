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

require 'test_helper'

class SearchResultItemTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
