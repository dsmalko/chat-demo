# frozen_string_literal: true

module Auth
  class SessionsController < DeviseTokenAuth::SessionsController
    def resource_data(_opts = {})
      response_data = UserSerializer.new(@resource).to_hash

      response_data['type'] = @resource.class.name.parameterize if json_api?
      response_data
    end
  end
end
