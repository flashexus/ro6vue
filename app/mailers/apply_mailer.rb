class ApplyMailer < ApplicationMailer
  def for_campaign(form,user)
    logger.debug("mail_test")
    @form = form
    @user = user
    mail(
      subject: "抽選の応募がありました。", #メールのタイトル
      to: @form['email'] #宛先
    ) do |format|
      format.text
    end
  end

end
