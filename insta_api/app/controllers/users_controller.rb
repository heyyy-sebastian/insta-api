require 'instagram'
class UsersController < ActionController::Base

CALLBACK_URL = "http://localhost:3000/callback"

Instagram.configure do |config|
  config.client_id = ENV['IG_CLIENT_ID']
  config.client_secret = ENV['IG_SECRET']
  # For secured endpoints only
  #config.client_ips = '<Comma separated list of IPs>'
end

  def index
    if session[:access_token]
      client = Instagram.client(:access_token => session[:access_token])
    else
      redirect_to (Instagram.authorize_url(:redirect_uri => CALLBACK_URL))
    end

    @user ||= client.user
    @access_token_js = session[:access_token]
    @map_api_key = ENV['GOOGLE_MAP_API']
    @client_id = ENV['IG_CLIENT_ID']
    #response = HTTParty.get("https://api.instagram.com/v1/media/search?lat=40.5&lng=-70.0&access_token=#{@access_token_js}")
    #response = HTTParty.get("https://api.instagram.com/v1/users/self/?access_token=#{@access_token_js}")
    # debugger
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
    #debugger
  end

end
