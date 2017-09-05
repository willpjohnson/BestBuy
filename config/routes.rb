Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :search_results, only: [:create, :index, :show], defaults: {format: :json}
  root "static_pages#root"
end
