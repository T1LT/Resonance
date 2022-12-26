Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  namespace :api, defaults: { format: :json } do
    resources :users, only: [:create]
    resource :session, only: [:create, :show, :destroy]
    resources :servers, only: [:index, :show, :create, :update, :destroy]
    resources :server_memberships, only: [:create, :destroy]
  end
end
