class Api::V1::LocationsController < ApiController

  rescue_from ActiveRecord::RecordNotFound do |exception|
    render json: { error: '404 not found' }, status: 404
  end

  def index
    locations = Location.select(:id,:address)
    render json: locations
  end

  def show

  end

  def create

  end

  def update

  end

  def destroy

  end
end