class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  helper_method :current_user, :cart_count, :categories

  def current_user
    @current_user ||= User.find_by_customer_id(session[:customer_id]) if session[:customer_id]
  end

  def require_user
    redirect_to '/login' unless current_user
  end

  def require_admin
    redirect_to '/admin' unless current_user&.is_admin
  end

  def cart_count
    session[:customer_id] ? session[:cart_count] : 0
  end

  def categories
    if session[:categories].nil?
      session[:categories] = BackendClient.get_all_categories['categories']
    end
    session[:categories]
  end
end
