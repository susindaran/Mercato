class AdminController < ApplicationController

  before_action :require_admin, except: [:login]

  def login
    if current_user&.is_admin
      redirect_to admin_home_path
    end
  end

  def home

  end

  def all_products
    @product_count = BackendClient.get_product_count
  end

  def add_product

  end

  def product_table
    @product = BackendClient.get_products_paginated(params[:page], params[:size])
    respond_to do | format |
      format.js
    end
  end

  def delete_product
    product_id = params[:product_id]
    begin
      BackendClient.delete_product product_id
      render json: {Message: 'Product deleted successfully'}
    rescue => e
      if e.respond_to?(:response)
        render plain: e.response.net_http_res.body, status: e.response.code
      else
        render plain: 'Internal Server Error', status: 500
      end
    end
  end
end
