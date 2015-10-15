require 'rails_helper'

RSpec.describe AllElementSearch do
  subject { described_class }
  let(:user) { create(:user) }
  let(:collection) { create(:collection) }
  let(:s1) { create(:sample, name: "testtest") }
  let(:s2) { create(:sample, name: "t3st-1") }

  before do
    CollectionsSample.create!(collection: collection, sample: s1)
    CollectionsSample.create!(collection: collection, sample: s2)
  end

  describe 'search_by_substring' do
    it 'searches all elements for given substring' do
      expect(subject.new('st', user.id).search_by_substring.results.size).to eq 2
      expect(subject.new('-1', user.id).search_by_substring.results.size).to eq 1
    end
  end
end