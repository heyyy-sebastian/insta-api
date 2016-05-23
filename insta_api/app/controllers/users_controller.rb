require 'pry'
require 'HTTParty'


class UsersController < ActionController::Base


  def index
    @map_api_key = ENV['GOOGLE_MAP_API']
    @sec = ENV['IG_SECRET']
    @id = ENV['IG_CLIENT_ID']
    @red = 'http://localhost:3000/callback'
  end


  def callback
    @id = ENV['IG_CLIENT_ID']
    @sec = ENV['IG_SECRET']
    @red = 'http://localhost:3000/callback'
    @act = '40264134.1677ed0.df3ba771313644258e0d661b5841395c'
    @response = HTTParty.get("https://api.instagram.com/v1/media/search?lat=48.858844&lng=2.294351&access_token=#{@act}")
    binding.pry
    render :callback
  end

  def show
  end

end
