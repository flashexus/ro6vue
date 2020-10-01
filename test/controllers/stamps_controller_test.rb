require 'test_helper'

class stampControllerTest < ActionDispatch::IntegrationTest
  setup do
    @stamp = stamp(:one)
  end

  test "should get index" do
    get stamp_url
    assert_response :success
  end

  test "should get new" do
    get new_stamp_url
    assert_response :success
  end

  test "should create stamp" do
    assert_difference('Stamp.count') do
      post stamp_url, params: { stamp: { name: @stamp.name, point_id: @stamp.point_id, user_id: @stamp.user_id } }
    end

    assert_redirected_to stamp_url(Stamp.last)
  end

  test "should show stamp" do
    get stamp_url(@stamp)
    assert_response :success
  end

  test "should get edit" do
    get edit_stamp_url(@stamp)
    assert_response :success
  end

  test "should update stamp" do
    patch stamp_url(@stamp), params: { stamp: { name: @stamp.name, point_id: @stamp.point_id, user_id: @stamp.user_id } }
    assert_redirected_to stamp_url(@stamp)
  end

  test "should destroy stamp" do
    assert_difference('Stamp.count', -1) do
      delete stamp_url(@stamp)
    end

    assert_redirected_to stamp_url
  end
end
