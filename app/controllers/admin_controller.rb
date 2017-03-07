class AdminController < ApplicationController

  before_action :require_admin, except: [:login]

  def login
    if current_user&.is_admin
      redirect_to admin_home_path
    end
  end

  def home

  end

end
