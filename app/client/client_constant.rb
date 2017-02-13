module ClientConstant

  host_configuration = {
    :development => {
      :BackendClient => {
        :url => 'http://localhost',
        :port => '8888'
      }
    }
  }

  URI = host_configuration[RAILS_ENVIRONMENT.to_sym]

end
