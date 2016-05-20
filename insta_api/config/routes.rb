Rails.application.routes.draw do
  root 'users#index'
  get '/callback' => 'users#callback'
  resources :users
end
