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
      site: 'いわみくるり～石見周遊スタンプラリー',
      title: 'いわみくるり～石見周遊スタンプラリー',
      reverse: true,
      charset: 'utf-8',
      separator: '|',
      description: 'ディスクリプション',
      keywords: 'キーワード',
      canonical: request.original_url,
      robots:"noodp, noydir, noindex, follow",
      icon: [
        { href:"https://www.all-iwami.com/favicon.ico" },
        { href: image_url('image_stamps/stmp.png'), rel: 'apple-touch-icon', sizes: '180x180', type: 'image/jpg' },
      ],
      og: {
        site_name: :site,
        title: :title,
        description: :description, 
        type: 'website',
        url: request.original_url,
        image: '',
        locale: 'ja_JP',
      },
      twitter: {
        card: 'summary_large_image',
        site: '@ツイッターのアカウント名',
      },
      fb: {
        app_id: '自身のfacebookのapplication ID'
      }
    }
  end

end
