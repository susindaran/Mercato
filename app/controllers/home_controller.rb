class HomeController < ApplicationController

  def home
    @products = BackendClient.get_all_products 1, 50, nil
  end

  def get_all_products
    category = params[:category_selected_id]
    @products = BackendClient.get_all_products(1, 50, category)
    render 'home'
  end
end
