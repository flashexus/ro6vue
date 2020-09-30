class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :confirmable
  #Role Const
  ADMINISTRATOR = 1
  USER = 2
  #Gender Type
  MALE = 1
  FEMALE = 2
  OTHER = 3
  #AGE Type
end
