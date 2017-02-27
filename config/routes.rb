Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'home#home'


  get '/signup' => 'users#new'                                                            # Signup page
  post '/users' => 'users#create'                                                         # Signup form submission

  get '/users/edit' => 'users#edit'                                                       # Edit profile page
  patch '/users/edit' => 'users#update', as: :edit_user, format: 'json'                   # Edit profile form submission

  delete '/users/address/:address_id' => 'users#delete_address', format: 'json'           # Delete Address
  get '/users/address/' => 'users#new_address'                                            # New Address Form page
  post '/users/address' => 'users#add_address', format: 'json'                            # New Address Form submission

  delete '/users/card_detail/:card_number' => 'users#delete_card_detail', format: 'json'  # Delete Card Details

  post 'login' => 'sessions#create', format: 'json'                                       # Login form submission
  delete 'logout' => 'sessions#destroy', as: :logout                                      # Logout
end
