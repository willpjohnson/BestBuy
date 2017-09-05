class CreateSearchResultItems < ActiveRecord::Migration[5.0]
  def change
    create_table :search_result_items do |t|
      t.integer :search_result_id
      t.string :search_term
      t.string :brand
      t.integer :reviews
      t.float :rating
      t.timestamps
    end
  end
end
