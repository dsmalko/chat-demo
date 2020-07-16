# frozen_string_literal: true

require 'rails_helper'

RSpec.describe ApplicationCable::Connection, type: :channel do
  context 'when user is authenticated' do
    let(:user) { create(:user) }
    let(:token) { user.create_new_auth_token }
    let(:params) do
      {
        uid: token['uid'],
        token: token['access-token'],
        client_id: token['client']
      }
    end
    let(:path) { "/cable?#{params.to_query}" }

    describe '#connect' do
      it 'accepts connection' do
        expect { connect(path) }.to_not raise_error
      end
    end
  end

  context 'when user is not authenticated' do
    describe '#connect' do
      it 'rejects connection' do
        expect { connect }.to have_rejected_connection
      end
    end
  end
end
