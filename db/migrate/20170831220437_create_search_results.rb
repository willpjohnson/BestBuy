class CreateSearchResults < ActiveRecord::Migration[5.0]
  def change
    create_table :search_results do |t|
      t.integer :total_smart_tv
      t.integer :samsung_smart_tv
      t.integer :lg_smart_tv
      t.integer :toshiba_smart_tv
      t.integer :sony_smart_tv
      t.integer :samsung_smart_tv_top3
      t.integer :lg_smart_tv_top3
      t.integer :toshiba_smart_tv_top3
      t.integer :sony_smart_tv_top3

      t.integer :total_curved_tv
      t.integer :samsung_curved_tv
      t.integer :lg_curved_tv
      t.integer :toshiba_curved_tv
      t.integer :sony_curved_tv
      t.integer :samsung_curved_tv_top3
      t.integer :lg_curved_tv_top3
      t.integer :toshiba_curved_tv_top3
      t.integer :sony_curved_tv_top3

      t.timestamps
    end
  end
end
