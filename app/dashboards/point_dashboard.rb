require "administrate/base_dashboard"

class PointDashboard < Administrate::BaseDashboard
  # ATTRIBUTE_TYPES
  # a hash that describes the type of each of the model's fields.
  #
  # Each different type represents an Administrate::Field object,
  # which determines how the attribute is displayed
  # on pages throughout the dashboard.
  ATTRIBUTE_TYPES = {
    id: Field::Number,
    name: Field::String,
    desc: Field::String,
    lat: Field::Number.with_options(decimals: 6),
    lon: Field::Number.with_options(decimals: 6),
    path: Field::String,
    deleted_at: Field::DateTime,
    created_at: Field::DateTime,
    updated_at: Field::DateTime,
    area_group: Field::String,
    shop_type: Field::String,
    show_no: Field::Number,
    sp_flg: Field::Boolean,
    zipcode: Field::String,
    TEL: Field::String,
    holiday: Field::String,
    code: Field::String,
  }.freeze

  # COLLECTION_ATTRIBUTES
  # an array of attributes that will be displayed on the model's index page.
  #
  # By default, it's limited to four items to reduce clutter on index pages.
  # Feel free to add, remove, or rearrange items.
  COLLECTION_ATTRIBUTES = %i[
  id
  name
  desc
  lat
  lon
  path
  area_group
  shop_type
  sp_flg
  zipcode
  TEL
  holiday
  code
  ].freeze

  # SHOW_PAGE_ATTRIBUTES
  # an array of attributes that will be displayed on the model's show page.
  SHOW_PAGE_ATTRIBUTES = %i[
  id
  name
  desc
  lat
  lon
  path
  deleted_at
  created_at
  updated_at
  area_group
  shop_type
  sp_flg
  zipcode
  TEL
  holiday
  code
].freeze

  # FORM_ATTRIBUTES
  # an array of attributes that will be displayed
  # on the model's form (`new` and `edit`) pages.
  FORM_ATTRIBUTES = %i[
  name
  desc
  lat
  lon
  path
  deleted_at
  area_group
  shop_type
  sp_flg
  zipcode
  TEL
  holiday
  code
].freeze

  # COLLECTION_FILTERS
  # a hash that defines filters that can be used while searching via the search
  # field of the dashboard.
  #
  # For example to add an option to search for open resources by typing "open:"
  # in the search field:
  #
  #   COLLECTION_FILTERS = {
  #     open: ->(resources) { resources.where(open: true) }
  #   }.freeze
  COLLECTION_FILTERS = {}.freeze

  # Overwrite this method to customize how points are displayed
  # across all pages of the admin dashboard.
  #
  # def display_resource(point)
  #   "Point ##{point.id}"
  # end
end
