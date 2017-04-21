class HomeController < ApplicationController

  def home
    search_query = params[:query]
    if search_query.nil?
      @products = BackendClient.get_all_products 1, 50, nil
    else
      @products = BackendClient.search_products_by_name search_query
    end
  end

  def get_all_products
    category = params[:category_selected_id]
    @products = BackendClient.get_all_products(1, 50, category)
    render 'home'
  end
end
