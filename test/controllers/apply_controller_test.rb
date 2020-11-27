require 'test_helper'

class ApplyControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get apply_index_url
    assert_response :success
  end

end
