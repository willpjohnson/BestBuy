require 'open-uri'
require 'rubygems'
require 'nokogiri'

class SearchResultsController < ApplicationController
  def index
    @searches = SearchResult.all
    render :index
  end

  def show
    @search_result = SearchResult.last
    render :show
  end

  def create
    @search_result = SearchResult.update
    render :show
  end
end
