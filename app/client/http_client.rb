require 'json'
require 'cgi'

module HttpClient
  
  def self.get(url, headers = {}, params ={})
    param_string = ''
    params.each{|k,v| param_string+="#{k}=#{v}&"}
    param_string = CGI::escape(param_string)
    url  = "#{url}?#{param_string}" if param_string.present?
    p "HTTP_CLIENT - GET: {:url => #{url}, :headers => #{headers}}"
    begin
      response = RestClient.get(url, headers)
    rescue Exception => e
      p "Error occurred in get call: #{e.inspect}"
      raise e
    end
    JSON.parse(response)
  end

  def self.post(url, payload = {}, headers={})
    p "HTTP_CLIENT - POST: {:url => #{url}, :headers => #{headers}, :payload => #{payload.to_json}}"
    begin
      response = RestClient.post(url, payload.to_json, headers)
      p "Response: #{response}"
    rescue Exception => e
      p "Error occurred in post call: #{e.inspect}"
      raise e
    end
    response.blank? || response.nil? ? nil : JSON.parse(response)
  end

  def self.put(url, payload = {}, headers={})
    p "HTTP_CLIENT - PUT: {:url => #{url}, :headers => #{headers}, :payload => #{payload.to_json}}"
    begin
      response = RestClient.put(url, payload.to_json, headers)
    rescue Exception => e
      p "Error occurred in put call: #{e.inspect}"
      raise e
    end
    response.nil? || response.blank? ? nil : JSON.parse(response)
  end

  def self.delete(url, headers={})
    p "HTTP_CLIENT - DELETE: {:url => #{url}, :headers => #{headers}}"
    begin
      response = RestClient.delete(url, headers)
    rescue Exception => e
      p "Error occurred in delete call: #{e.inspect}"
      raise e
    end
    response.nil? || response.blank? ? nil : JSON.parse(response)
  end

end
