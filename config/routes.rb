Rails.application.routes.draw do
  resources :points
  resources :stamps
  get '/stamps/add/:point_id', to: 'stamps#add'

  root 'home#index'
  get 'home/index'
  get 'home/show'
  devise_for :users
  namespace :admin do
    # Add dashboard for your models here
    resources :users
    resources :points
    resources :stamps
    
    root to: "users#index" # <--- Root route
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
