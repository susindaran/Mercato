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
  get '/users/card_detail' => 'users#new_card_detail'                                     # New Card Detail Form page
  post '/users/card_detail' => 'users#add_card_detail', format: 'json'                    # New Card Details Form submission

  get '/login' => 'sessions#login', as: :login                                            # Get login page
  post 'login' => 'sessions#create', format: 'json'                                       # Login form submission
  delete 'logout' => 'sessions#destroy', as: :logout                                      # Logout

  get '/admin' => 'admin#login', as: :admin_login                                         # Get admin login page
  get '/admin/home' => 'admin#home', as: :admin_home                                      # Get admin home page

  get '/admin/product/all' => 'admin#all_products', as: :all_products                     # Get admin all products page
  get '/admin/product/' => 'admin#product_table'                                          # Get product table [ajax]
  delete '/admin/product/:product_id' => 'admin#delete_product', format: 'json'           # Delete product [ajax]
  get '/admin/product/add' => 'admin#add_product', as: :add_product_form                  # Get admin add product page
  post '/admin/product/add' => 'admin#create_product', format: 'json'                     # Add product [ajax]
  get '/admin/product/edit' => 'admin#edit_product', as: :edit_product_form               # Get admin edit product page
  put '/admin/product/:product_id' => 'admin#update_product', format: 'json'              # Edit Product [ajax]

  get '/admin/shipment/all' => 'admin#all_shipments', as: :all_shipments                  # Get admin all shipments page
  get '/admin/shipment/:type' => 'admin#shipment_table'                                   # Get shipment table [ajax]
  post '/admin/shipment/:shipment_id' => 'admin#update_shipment_status', format: 'json'

  get '/admin/order_detail/all' => 'admin#all_order_details', as: :all_order_details      # Get admin all order details page
  get '/admin/order_detail/:type' => 'admin#order_detail_table'                           # Get order detail table [ajax]
  post '/admin/order_detail/:order_detail_id' => 'admin#update_order_detail_status', format: 'json'

  get '/cart/' => 'cart#get_cart', as: :cart_page                                         # Get cart page
  delete '/cart/:cart_id' => 'cart#delete_cart_item', format: 'json'                      # Delete item from cart [ajax]
  put '/cart/:cart_id' => 'cart#update_cart_item', format: 'json'                         # Update cart item (mainly quantity) [ajax]

  get '/cart/checkout' => 'cart#checkout', as: :checkout_page                             # Get checkout page
  get '/cart/tax_details/:state' => 'cart#tax_details', format: 'json'                    # Get tax details of state [ajax]
  post '/cart/checkout' => 'cart#place_order', format: 'json'                             # Place order from checkout page [ajax]

  get '/cart/subscribe' => 'cart#subscription', as: :subscription_page                    # Get subscription page
  post '/cart/subscribe' => 'cart#subscribe', format: 'json'                              # Create subscription [ajax]

  get '/users/orders' => 'users#orders', as: :orders                                      # Get orders page

  get '/product/:product_id' => 'product#get_product', as: :product_page                  # Display product details page
  post '/product/add_to_cart' => 'product#add_to_cart', format: 'json', as: :add_to_cart  # Add to cart

  get '/home/:category_selected_id' => 'home#get_all_products'                            # Get products [ajax]
  get '/category/all' => 'home#home'                                                      # get all categories page

  get '/users/subscriptions' => 'users#get_subscriptions', as: :subscriptions             # Get subscriptions of a user
  post '/users/subscriptions/skip/:subscription_id' => 'users#skip_due_date'              # Skip next delivery of subscription
  put '/users/subscriptions/edit/:subscription_id' => 'users#edit_subscription'           # Edit subscription

end
