require "application_system_test_case"

class stampTest < ApplicationSystemTestCase
  setup do
    @stamp = stamp(:one)
  end

  test "visiting the index" do
    visit stamp_url
    assert_selector "h1", text: "stamp"
  end

  test "creating a Stamp" do
    visit stamp_url
    click_on "New Stamp"

    fill_in "Name", with: @stamp.name
    fill_in "Point", with: @stamp.point_id
    fill_in "User", with: @stamp.user_id
    click_on "Create Stamp"

    assert_text "Stamp was successfully created"
    click_on "Back"
  end

  test "updating a Stamp" do
    visit stamp_url
    click_on "Edit", match: :first

    fill_in "Name", with: @stamp.name
    fill_in "Point", with: @stamp.point_id
    fill_in "User", with: @stamp.user_id
    click_on "Update Stamp"

    assert_text "Stamp was successfully updated"
    click_on "Back"
  end

  test "destroying a Stamp" do
    visit stamp_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Stamp was successfully destroyed"
  end
end
