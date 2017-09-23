class CartController < ApplicationController
  require 'socket'
  def get_cart
    ip=Socket.ip_address_list.detect{|intf| intf.ipv4_private?}
    if ip.nil?
      @host_ip = 'localhost'
    else
      @host_ip = ip.ip_address
    end
    @cart_items = BackendClient.get_cart_items session[:customer_id]
    session[:cart_count] = @cart_items['count']
  end

  def delete_cart_item
    cart_id = params[:cart_id]
    begin
      BackendClient.delete_cart_item cart_id
      session[:cart_count] -= 1
      render json: {Message: 'Item deleted from cart successfully'}
    rescue => e
      if e.respond_to?(:response)
        render plain: e.response.net_http_res.body, status: e.response.code
      else
        render plain: 'Internal Server Error', status: 500
      end
    end
  end

  def update_cart_item
    begin
      BackendClient.update_cart_item params[:cart_id], params['payload']
      render json: {Message: 'Cart item updated successfully'}
    rescue => e
      if e.respond_to?(:response)
        render plain: e.response.net_http_res.body, status: e.response.code
      else
        render plain: 'Internal Server Error', status: 500
      end
    end
  end

  def checkout
    @user_data = BackendClient.get_customer(current_user[:customer_id])
    ip=Socket.ip_address_list.detect{|intf| intf.ipv4_private?}
    @host_ip = ip.ip_address if ip else 'localhost'
    @cart_items = BackendClient.get_cart_items session[:customer_id]
  end

  def tax_details
    state = params[:state]
    begin
      response = BackendClient.get_tax_details_of_state state
      render json: response
    rescue => e
      if e.respond_to?(:response)
        render plain: e.response.net_http_res.body, status: e.response.code
      else
        render plain: 'Internal Server Error', status: 500
      end
    end
  end

  def place_order
    payload = params[:payload]
    order_payload = {billing_address_id: payload['billing_address_id'].to_i, shipping_address_id: payload['shipping_address_id'].to_i}
    payment_payload = {card_number: payload['card_number']}
    begin
      order_response = BackendClient.place_order session[:customer_id], order_payload
      BackendClient.make_payment order_response['order_id'], payment_payload
      session[:cart_count] = 0
      render json: {Message: 'Cart item updated successfully'}
    rescue => e
      if e.respond_to?(:response)
        render plain: e.response.net_http_res.body, status: e.response.code
      else
        render plain: 'Internal Server Error', status: 500
      end
    end
  end

  def save_subscription_items
    payload = params[:payload]
    session[:subscribe_cart_ids] = payload['cart_ids']
    render json: {Message: 'Cart IDs saved for subscription'}
  end

  def subscription
    @user_data = BackendClient.get_customer(current_user[:customer_id])
    if session[:subscribe_cart_ids] == nil
      @user_data = BackendClient.get_cart_items session[:customer_id]
    else
      @cart_items = BackendClient.get_particular_cart_items session[:subscribe_cart_ids]
    end
    ip=Socket.ip_address_list.detect{|intf| intf.ipv4_private?}
    @host_ip = ip.ip_address if ip else 'localhost'
  end

  def subscribe
    payload = params[:payload]
    payload['customer_id'] = session[:customer_id]

    begin
      BackendClient.create_subscription payload
      render json: {Message: 'Subscription created successfully'}
    rescue => e
      if e.respond_to?(:response)
        render plain: e.response.net_http_res.body, status: e.response.code
      else
        render plain: 'Internal Server Error', status: 500
      end
    end
  end
end
