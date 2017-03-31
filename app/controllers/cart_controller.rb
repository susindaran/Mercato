class CartController < ApplicationController
  require 'socket'
  def get_cart
    ip=Socket.ip_address_list.detect{|intf| intf.ipv4_private?}
    @host_ip = ip.ip_address if ip else 'localhost'
    @cart_items = BackendClient.get_cart_items session[:customer_id]
  end

  def delete_cart_item
    cart_id = params[:cart_id]
    begin
      BackendClient.delete_cart_item cart_id
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
      BackendClient.update_cart_item params[:cart_id], params['cart']
      render json: {Message: 'Cart item updated successfully'}
    rescue => e
      if e.respond_to?(:response)
        render plain: e.response.net_http_res.body, status: e.response.code
      else
        render plain: 'Internal Server Error', status: 500
      end
    end
  end
end
