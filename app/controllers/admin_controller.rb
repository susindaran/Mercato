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
    response = BackendClient.get_all_categories
    @categories = []
    response['categories'].each do |category|
      @categories.push [category['category_name'], category['category_id']]
    end
    @product = Product.new
  end

  def create_product
    data = params[:product]
    begin
      BackendClient.add_product data
      render json: {Message: 'Product added successfully'}
    rescue => e
      if e.respond_to?(:response)
        render plain: e.response.net_http_res.body, status: e.response.code
      else
        render plain: 'Internal Server Error', status: 500
      end
    end
  end

  def edit_product
    response = BackendClient.get_all_categories
    @categories = []
    response['categories'].each do |category|
      @categories.push [category['category_name'], category['category_id']]
    end
    response = BackendClient.get_product params[:product_id]
    response['category_prefix'] = response['product_id'][0..2]
    @product = Product.new response
  end

  def update_product
    data = params[:product]
    begin
      BackendClient.update_product data, params[:product_id]
      render json: {Message: 'Product updated successfully'}
    rescue => e
      if e.respond_to?(:response)
        render plain: e.response.net_http_res.body, status: e.response.code
      else
        render plain: 'Internal Server Error', status: 500
      end
    end
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

  def all_shipments
    @shipments = BackendClient.get_all_shipments(1, 2, 'ALL')
  end

  def shipment_table
    p params[:type].upcase
    @shipments = BackendClient.get_all_shipments(params[:page], params[:size], params[:type].upcase)
    p @shipments['total_count']
    respond_to do | format |
      format.js
    end
  end

  def update_shipment_status
    shipment_id = params[:shipment_id]
    status = params[:status]
    body = {
        shipment_ids: [shipment_id],
        status: status
    }
    begin
      BackendClient.update_shipment_status body
      render json: {Message: 'Shipment status changed successfully'}
    rescue => e
      if e.respond_to?(:response)
        render plain: e.response.net_http_res.body, status: e.response.code
      else
        render plain: 'Internal Server Error', status: 500
      end
    end
  end
end
