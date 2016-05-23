require 'pry'
require 'HTTParty'


class UsersController < ActionController::Base


  def index

    @sec = ENV['IG_SECRET']
    @id = ENV['IG_CLIENT_ID']
    @red = 'http://localhost:3000/callback'
  end


  def callback
    @id = ENV['IG_CLIENT_ID']
    @sec = ENV['IG_SECRET']
    @map_api_key = ENV['GOOGLE_MAP_API']
    @red = 'http://localhost:3000/callback'
    @act = '1179584577.1677ed0.f2880bef2f384229a87fc3aafc2f868d'
    # binding.pry

    # @response = HTTParty.get("https://api.instagram.com/v1/media/search?lat=48.858844&lng=2.294351&access_token=#{@act}")
    render :callback
  end

  def show
  end

end
