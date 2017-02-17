Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'home#home'

  # User actions
  get '/signup' => 'users#new'
  post '/users' => 'users#create'
  get '/users/edit' => 'users#edit'
  patch '/users/edit' => 'users#update', as: :edit_user, format: 'json'

  # Session actions
  get '/login' => 'sessions#new', as: :login
  post 'login' => 'sessions#create', format: 'json'
  delete 'logout' => 'sessions#destroy', as: :logout
end
