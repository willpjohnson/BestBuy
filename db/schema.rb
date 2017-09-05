# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170905175519) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "search_result_items", force: :cascade do |t|
    t.integer  "search_result_id"
    t.string   "search_term"
    t.string   "brand"
    t.integer  "reviews"
    t.float    "rating"
    t.datetime "created_at",       null: false
    t.datetime "updated_at",       null: false
  end

  create_table "search_results", force: :cascade do |t|
    t.integer  "total_smart_tv"
    t.integer  "samsung_smart_tv"
    t.integer  "lg_smart_tv"
    t.integer  "toshiba_smart_tv"
    t.integer  "sony_smart_tv"
    t.integer  "samsung_smart_tv_top3"
    t.integer  "lg_smart_tv_top3"
    t.integer  "toshiba_smart_tv_top3"
    t.integer  "sony_smart_tv_top3"
    t.integer  "total_curved_tv"
    t.integer  "samsung_curved_tv"
    t.integer  "lg_curved_tv"
    t.integer  "toshiba_curved_tv"
    t.integer  "sony_curved_tv"
    t.integer  "samsung_curved_tv_top3"
    t.integer  "lg_curved_tv_top3"
    t.integer  "toshiba_curved_tv_top3"
    t.integer  "sony_curved_tv_top3"
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
  end

end
