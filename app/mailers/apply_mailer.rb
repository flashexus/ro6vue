class ApplyMailer < ApplicationMailer
  default from: Rails.application.credentials.from

  def for_campaign(form,status,user)
    @form = form
    @status = status
    @user = user
    mail(
      subject: "抽選の応募がありました。", #メールのタイトル
      to: "iwamikururi@vitallead.co.jp" #管理者用アドレス
    ) do |format|
      format.text
    end
  end
  def thanks_mail(form,status,user)
    @form = form
    @status = status
    @user = user
    mail(
      subject: "抽選の応募を受付ました", #メールのタイトル
      to: @user['email'] #応募したユーザーのアドレス
    ) do |format|
      format.text
    end
  end
end
