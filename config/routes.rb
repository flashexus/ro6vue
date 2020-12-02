Rails.application.routes.draw do
  root 'stamps#new'
  get 'home/index'
  get 'home/policy'

  #resources :points
  get 'points', to:'points#index'
  get 'points/area_shop', to: 'points#ajax_area_shop'

  get 'stamps', to: 'stamps#index'
  post 'stamps',to: 'stamps#create'
  get '/stamps/add/:point_id', to: 'stamps#add'

  get 'stamps/new',to: 'stamps#new'
  get 'stamps/servey', to: 'stamps#servey'
  post 'stamps/servey', to: 'stamps#send_mail'

  devise_for :users, :controllers => {
    :registrations => 'users/registrations',
    :sessions => 'users/sessions'
  }
  devise_scope :user do
    # get 'sign_up', :to => "users/registrations#new"
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
