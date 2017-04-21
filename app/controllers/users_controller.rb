class UsersController < ApplicationController
  include ClientHelper
  before_action :require_user, except: [:new, :create]

  def new
    @user = User.new
  end

  def create
    begin
      customer_response = BackendClient.create_customer(params[:user])
      @user = User.new do |u|
        u.first_name = customer_response['first_name']
        u.last_name = customer_response['last_name']
        u.email_id = customer_response['email_id']
        u.customer_id = customer_response['customer_id']
      end

      if @user.save
        render json: {Message: 'User successfully added'}
      else
        raise 'Something went wrong'
      end
    rescue => e
      if e.respond_to?(:response)
        render plain: e.response.net_http_res.body, status: e.response.code
      else
        render plain: 'Internal Server Error', status: 500
      end
    end
  end

  def edit
    @user = current_user
    p @user
    @user_data = BackendClient.get_customer(current_user[:customer_id])
  end

  def update
    begin
      update_response = BackendClient.update_customer(params[:user], session[:customer_id])
      user = User.find_by_customer_id(session[:customer_id])
      user.first_name = update_response['first_name']
      user.last_name = update_response['last_name']
      user.email_id = update_response['email_id']
      if user.save
        render json: {:Message => 'Successful Login'}
      else
        raise 'Something went wrong'
      end
    rescue => e
      if e.respond_to?(:response)
        render plain: e.response.net_http_res.body, status: e.response.code
      else
        render plain: 'Internal Server Error', status: 500
      end
    end
  end

  # Address Actions

  def new_address
    @states = BackendClient.get_all_states['states']
  end

  def add_address
    begin
      payload = {}
      payload[:phone] = ActionController::Base.helpers.number_to_phone(params[:phone][0], area_code: true)
      payload[:street] = params[:street]
      payload[:city] = params[:city]
      payload[:state] = params[:state]
      payload[:country] = params[:country]
      payload[:zipcode] = params[:zipcode]
      payload[:name] = params[:name]
      payload[:type] = params[:type]

      BackendClient.add_address(session[:customer_id], payload)

      render json: {:Message => 'Address added successfully'}
    rescue => e
      if e.respond_to?(:response)
        render plain: e.response.net_http_res.body, status: e.response.code
      else
        render plain: 'Internal Server Error', status: 500
      end
    end
  end

  def delete_address
    address_id = params[:address_id]
    begin
      BackendClient.delete_address(address_id)
      render json: {Message: 'Address deleted successfully'}
    rescue => e
      if e.respond_to?(:response)
        render plain: e.response.net_http_res.body, status: e.response.code
      else
        render plain: 'Internal Server Error', status: 500
      end
    end
  end

  # Card Detail Actions

  def new_card_detail

  end

  def add_card_detail
    begin
      payload = {}
      payload[:name_on_card] = params[:name_on_card]
      payload[:card_number] = params[:card_number]
      payload[:expiry_date] = params[:expiry_date]

      BackendClient.add_card_details(session[:customer_id], payload)

      render json: {:Message => 'Card Details added successfully'}
    rescue => e
      if e.respond_to?(:response)
        render plain: e.response.net_http_res.body, status: e.response.code
      else
        render plain: 'Internal Server Error', status: 500
      end
    end
  end

  def delete_card_detail
    card_number = params[:card_number]
    begin
      BackendClient.delete_card_detail(card_number)
      render json: {Message: 'Card Detail deleted successfully'}
    rescue => e
      if e.respond_to?(:response)
        render plain: e.response.net_http_res.body, status: e.response.code
      else
        render plain: 'Internal Server Error', status: 500
      end
    end
  end

  def orders
    @orders = BackendClient.get_orders session[:customer_id], 1, 50
  end

  def get_subscriptions
    @subscriptions = BackendClient.get_subscriptions session[:customer_id], 1, 50
  end

  def skip_due_date
    subscription_id = params[:subscription_id]
    begin
      response = BackendClient.skip_due_date(subscription_id)
      render json: response
    rescue => e
      if e.respond_to?(:response)
        render plain: e.response.net_http_res.body, status: e.response.code
      else
        render plain: 'Internal Server Error', status: 500
      end
    end
  end

  def return_order_detail
    begin
      BackendClient.return_order_detail params['payload']
      render json: {Message: 'Return Initiated successfully'}
    rescue => e
      if e.respond_to?(:response)
        render plain: e.response.net_http_res.body, status: e.response.code
      else
        render plain: 'Internal Server Error', status: 500
      end
    end
  end

  def delete_subscription
    subscription_id = params[:subscription_id]
    begin
      BackendClient.delete_subscription(subscription_id)
      render json: {Message: 'Product removed from subscription'}
    rescue => e
      if e.respond_to?(:response)
        render plain: e.response.net_http_res.body, status: e.response.code
      else
        render plain: 'Internal Server Error', status: 500
      end
    end
  end

  def edit_subscription
    subscription_id = params[:subscription_id]
    begin
      payload = params[:payload]
      BackendClient.edit_subscription(subscription_id,payload)
      render json: {Message: 'Subscription updated successfully!'}
    rescue => e
      if e.respond_to?(:response)
        render plain: e.response.net_http_res.body, status: e.response.code
      else
        render plain: 'Internal Server Error', status: 500
      end
    end
  end
end