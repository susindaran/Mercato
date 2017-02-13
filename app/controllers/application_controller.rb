class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  helper_method :current_user

  def current_user
    @current_user ||= User.find_by_customer_id(session[:customer_id]) if session[:customer_id]
  end

  def require_user
    redirect_to '/login' unless current_user
  end
end
