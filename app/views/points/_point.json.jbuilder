json.extract! point, :id, :name, :desc, :lon, :lat, :path, :deleted_at, :created_at, :updated_at
json.url point_url(point, format: :json)
