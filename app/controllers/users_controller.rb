class UsersController < ApplicationController
  include ClientHelper
  before_filter :require_user, only: [:edit, :update]

  def new
    @user = User.new
  end

  def create
    # Call the backend for authentication
    p "#{params[:user].to_json}"
    begin
      customer_response = BackendClient.create_customer(params[:user])
      p "#{customer_response}"
      p "first_name: #{customer_response["first_name"]}"
      @user = User.new do |u|
        u.first_name = customer_response["first_name"]
        u.last_name = customer_response["last_name"]
        u.email_id = customer_response["email_id"]
        u.customer_id = customer_response["customer_id"]
      end
      p "#{@user.customer_id}"
      p "#{@user.first_name}"
      p "#{@user.last_name}"
      p "#{@user.email_id}"
      if @user.save
        # session[:customer_id] = @user.customer_id
        redirect_to '/login'
      else
        raise "Something went wrong"
      end

    rescue => e
      p "Caught e here"
      if e.respond_to?(:response)
        @error_message = "Message: #{e.response.net_http_res.message}\nStatus: #{e.response.code}"
      else
        @error_message = "Message: Internal Server Error\nStatus: 500"
      end
      redirect_to '/signup'
    end
  end

  def edit
    @user = current_user
  end

  def update
    p "details: #{params[:user]}"
    begin
      update_response = BackendClient.update_customer(params[:user], session[:customer_id])
      user = User.find_by_customer_id(session[:customer_id])
      user.first_name = update_response["first_name"]
      user.last_name = update_response["last_name"]
      user.email_id = update_response["email_id"]
      if user.save
        redirect_to root_path
      else
        raise "Something went wrong"
      end
    rescue => e
      p "Caught e here"
      p "exception #{e}"
      if e.respond_to?(:response)
        @error_message = "Message: #{e.response.net_http_res.message}\nStatus: #{e.response.code}"
      else
        @error_message = "Message: Internal Server Error\nStatus: 500"
      end
      redirect_to '/users/edit'
    end
  end
end
