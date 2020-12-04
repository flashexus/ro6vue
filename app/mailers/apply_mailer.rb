class ApplyMailer < ApplicationMailer
  def for_campaign(form,status,user)
    logger.debug("mail_test")
    @form = form
    @status = status
    @user = user
    mail(
      subject: "抽選の応募がありました。", #メールのタイトル
      to: @user['email'] #宛先
    ) do |format|
      format.text
    end
  end

end
