Rails.application.routes.draw do
  root 'home#index'
  get 'home/index'
  get 'home/show'

  resources :points
  get 'stamps', to: 'stamps#index'
  post 'stamps',to: 'stamps#create'
  get 'stamps/new',to: 'stamps#new'

  devise_for :users
  devise_scope :user do
    get '/users/sign_out' => 'devise/sessions#destroy'
  end
  namespace :admin do
    # Add dashboard for your models here
    resources :users
    resources :points
    resources :stamps
    
    root to: "users#index" # <--- Root route
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
