class User < ApplicationRecord
  has_many :stamps

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :confirmable

  #Role Const
  ROLE_TYPE = %w(管理者 一般ユーザ)
  #Gender Type
  GENDER_TYPE = %w(男性 女性 その他)
  #AGE Type
  AGE_TYPE = %w(10代未満 10代 20代 30代 40代 50代 60代 70代以上)
end
