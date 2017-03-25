class SessionsController < ApplicationController
  include ClientHelper

  def login
  end

  def create
    form_data = params[:session]
    begin
      login_response = BackendClient.login(form_data, params[:admin])
      # If the response from the above HTTP call is OK,
      # then we can go ahead and set the customer_id in session
      p "login response: #{login_response}"
      session[:customer_id] = login_response['customer_id']
      begin
        response = BackendClient.get_cart_count session[:customer_id]
        session[:cart_count] = response['items_in_cart']
      rescue => e
        session[:cart_count] = 0
      end
      render json: {:Message =>'Successful Login'}
    rescue => e
      p 'Caught e here'
      if e.respond_to?(:response)
        render plain: e.response.net_http_res.body, status: e.response.code
      else
        render plain: 'Internal Server Error', status: 500
      end
    end
  end

  def destroy
    session[:customer_id] = nil
    session[:cart_count] = 0
    redirect_to root_path
  end
end
