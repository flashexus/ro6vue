class HomeController < ApplicationController
  before_action :authenticate_user!
  def index
    # render layout: 'application_no_menu'
  end

  def show
    # render layout: 'application_no_menu'
  end

  def info
    blk_end = Date.new(2021,1,13)
    if Date.today >= blk_end
      redirect_to root_path
    end
  end
end
