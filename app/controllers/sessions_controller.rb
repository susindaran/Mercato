class SessionsController < ApplicationController
  include ClientHelper

  def new
    @error_message = params[:error_message]
  end

  def create
    form_data = params[:session]
    p "Form data: #{form_data}"
    begin
      login_response = BackendClient.login(form_data)
      # If the response from the above HTTP call is OK,
      # then we can go ahead and set the customer_id in session
      p "login response: #{login_response}"
      session[:customer_id] = login_response["customer_id"]
      render json: {'Message'=>'Successful Login'}
    rescue => e
      p "Caught e here"
      if e.respond_to?(:response)
        render plain: e.response.net_http_res.message, status: e.response.code
      else
        render plain: 'Internal Server Error', status: 500
      end
    end
  end

  def destroy
    session[:customer_id] = nil
    redirect_to root_path
  end
end
