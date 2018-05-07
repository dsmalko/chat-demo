module Auth
  class SessionsController < DeviseTokenAuth::SessionsController
    def resource_data(opts={})
      response_data = UserSerializer.new(@resource).to_hash

      if json_api?
        response_data['type'] = @resource.class.name.parameterize
      end
      response_data
    end
  end
end