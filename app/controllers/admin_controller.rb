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
end
