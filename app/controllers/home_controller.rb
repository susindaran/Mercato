class HomeController < ApplicationController

  def home
    @categories = BackendClient.get_all_categories
  end

  def get_all_products
  category= params[:category_selected_id]
    @products = BackendClient.get_all_products(params[:page], params[:size], category)
    respond_to do | format |
          format.js
    end
  end
end
