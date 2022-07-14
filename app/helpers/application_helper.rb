module ApplicationHelper
  def master_icon_path(master_icon)
    #if master_icon.icon_file
      asset_path(master_icon)
    #else
    #  "/icon/show_icon?id=#{master_icon.id}"
    #end
  end

  def default_meta_tags
    {
      site: '',
      title: '',
      reverse: true,
      charset: 'utf-8',
      separator: '|',
      description: 'ディスクリプション',
      keywords: 'キーワード',
      twitter: {
        card: 'summary_large_image',
        site: 'account',
      },
      fb: {
        app_id: 'application ID'
      }
    }
  end

end
