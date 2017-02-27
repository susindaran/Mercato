require_relative 'client_helper'
require_relative 'http_client'

class BackendClient

  CLIENT_NAME = self.name

  def self.headers
    ClientHelper.common_headers
  end

  def self.create_customer(payload)
    url = "#{ClientHelper.url(CLIENT_NAME)}/customer"
    HttpClient.post(url, payload, headers)
  end

  def self.login(payload)
    url = "#{ClientHelper.url(CLIENT_NAME)}/customer/login"
    HttpClient.post(url, payload, headers)
  end

  def self.update_customer(payload, customer_id)
    url = "#{ClientHelper.url(CLIENT_NAME)}/customer/update/#{customer_id}"
    HttpClient.post(url, payload, headers)
  end

  def self.get_customer(customer_id)
    url = "#{ClientHelper.url(CLIENT_NAME)}/customer/#{customer_id}"
    HttpClient.get(url, headers)
  end

  def self.delete_address(address_id)
    url = "#{ClientHelper.url(CLIENT_NAME)}/customer/address/#{address_id}"
    HttpClient.delete(url, headers)
  end

  def self.delete_card_detail(card_number)
    url = "#{ClientHelper.url(CLIENT_NAME)}/customer/card/#{card_number}"
    HttpClient.delete(url, headers)
  end

  def self.get_all_states
    url = "#{ClientHelper.url(CLIENT_NAME)}/tax_details/state/all"
    HttpClient.get(url, headers)
  end

  def self.add_address(customer_id, payload)
    url = "#{ClientHelper.url(CLIENT_NAME)}/customer/address/#{customer_id}"
    HttpClient.post(url, payload, headers)
  end
end
