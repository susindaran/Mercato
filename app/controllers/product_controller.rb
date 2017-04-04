class ProductController < ApplicationController
  def get_product
    @product = BackendClient.get_product params[:product_id]
  end
  def add_to_cart
     body = params[:payload]
     p params
     body['customer_id'] = session[:customer_id]
     begin
       BackendClient.add_product_to_cart body
        session[:cart_count] += 1
       render json: {Message: 'Item added to cart successfully'}
     rescue => e
       if e.respond_to?(:response)
         render plain: e.response.net_http_res.body, status: e.response.code
       else
         render plain: 'Internal Server Error', status: 500
       end
     end

    end

end

