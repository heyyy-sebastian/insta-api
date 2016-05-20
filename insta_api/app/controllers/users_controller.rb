class UsersController < ActionController::Base

CALLBACK_URL = "http://localhost:3000/callback"

Instagram.configure do |config|
  config.client_id =
  config.client_secret =
  # For secured endpoints only
  #config.client_ips = '<Comma separated list of IPs>'
end

  def index
    if session[:access_token]
      instagram_user = Instagram.client(:access_token => session[:access_token])
    else
      redirect_to (Instagram.authorize_url(:redirect_uri => CALLBACK_URL))
    end

    @user ||= instagram_user.user
    # "<h1>#{ @user }</h1>"
  end

  def callback
    # what you should really do is check if token is still valid
    # if the key isnt 'valid' get a new access token
    if !session[:access_token]
      response = Instagram.get_access_token( params[:code], :redirect_uri => CALLBACK_URL )
      session[:access_token] = response.access_token
    end

    redirect_to '/'
  end

  def show
    debugger
  end

end
