class UserAffiliation < ActiveRecord::Base
  acts_as_paranoid
  belongs_to :user
  belongs_to :affiliation

  attr_accessor :from_month, :to_month
  validate :from_to, on: :update

  private

  def from_to
    %w(from to).each do |month|
      date = self.send(month + '_month')
      if date && date.match(/-?\d{1,4}-\d{2}/)
        self[month] = Date.strptime(date, '%Y-%m')
      end
    end
    if to && from && to < from
      errors.add(:to, 'to-date should be later than from-date')
    end
  end
end
