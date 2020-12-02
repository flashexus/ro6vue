class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  def after_sign_in_path_for(resource)
    if current_user.role == User::ROLE_TYPE[0]
      admin_root_path
    else
      stamps_new_path
    end
  end
end
