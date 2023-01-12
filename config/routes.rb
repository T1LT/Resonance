Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  namespace :api, defaults: { format: :json } do
    resources :users, only: [:create]
    resource :session, only: [:create, :show, :destroy]
    resources :servers, only: [:index, :show, :create, :update, :destroy] do
      resources :channels, only: [:index, :create] do
        resources :messages, only: [:index]
      end
    end
    resources :messages, only: [:create, :show, :update, :destroy]
    resources :channels, only: [:update, :show, :destroy] do
      resources :messages, only: :index
    end
    resources :server_memberships, only: [:create, :destroy]
    resources :friendships, only: [:index, :create, :update, :destroy]
  end

  get '*path', to: 'static_pages#frontend'
end
