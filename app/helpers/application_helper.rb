module ApplicationHelper
  def master_icon_path(master_icon)
    #if master_icon.icon_file
      asset_path(master_icon)
    #else
    #  "/icon/show_icon?id=#{master_icon.id}"
    #end
  end
end
