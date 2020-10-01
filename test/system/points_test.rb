require "application_system_test_case"

class PointsTest < ApplicationSystemTestCase
  setup do
    @point = points(:one)
  end

  test "visiting the index" do
    visit points_url
    assert_selector "h1", text: "Points"
  end

  test "creating a Point" do
    visit points_url
    click_on "New Point"

    fill_in "Deleted at", with: @point.deleted_at
    fill_in "Desc", with: @point.desc
    fill_in "Lat", with: @point.lat
    fill_in "Lon", with: @point.lon
    fill_in "Name", with: @point.name
    fill_in "Path", with: @point.path
    click_on "Create Point"

    assert_text "Point was successfully created"
    click_on "Back"
  end

  test "updating a Point" do
    visit points_url
    click_on "Edit", match: :first

    fill_in "Deleted at", with: @point.deleted_at
    fill_in "Desc", with: @point.desc
    fill_in "Lat", with: @point.lat
    fill_in "Lon", with: @point.lon
    fill_in "Name", with: @point.name
    fill_in "Path", with: @point.path
    click_on "Update Point"

    assert_text "Point was successfully updated"
    click_on "Back"
  end

  test "destroying a Point" do
    visit points_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Point was successfully destroyed"
  end
end
