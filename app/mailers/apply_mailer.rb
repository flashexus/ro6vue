class ApplyMailer < ApplicationMailer
  default from: "hogehoge@example.com"

  def for_campaign
    logger.debug("mail_test")
    mail(
      subject: "メール送信が完了しました。", #メールのタイトル
      to: "flashexus@gmail.com" #宛先
    ) do |format|
      format.text
    end
  end

end
