require_relative 'client_constant'

module ClientHelper

  def self.common_headers
    headers = {'Accept' => 'application/json', 'Content-Type' => 'application/json'}
  end

  def self.url(application_client)
    p application_client.to_sym
    uri = ClientConstant::URI[application_client.to_sym]
    slash_pos = uri[:url].index('/', 8) || 0
    prefix = (slash_pos == 0) ? uri[:url] : uri[:url][0..(slash_pos-1)]
    postfix = (slash_pos == 0) ? '' : uri[:url][slash_pos..uri[:url].length]
    "#{prefix}:#{uri[:port]}#{postfix}"
  end

  def self.uri_encode(params)
    return '' if params.blank?
    URI.encode(params.map{|k,v| "#{k}=#{v}"}.join('&'))
  end

end
